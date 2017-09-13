import { Buffer } from 'buffer'
import binary = require('thrift/lib/nodejs/lib/thrift/binary')
import InputBufferUnderrunError = require('thrift/lib/nodejs/lib/thrift/input_buffer_underrun_error')

import { ITransport } from './Transport'

export default class BufferedTransport implements ITransport {
  private readCursor: number = 0
  private writeCursor: number = 0 // for input buffer
  private inBuf: Buffer
  private defaultReadBufferSize: number = 1024
  private outBuffers: Buffer[] = []
  private outSize: number = 0

  constructor() {
    this.inBuf = Buffer.alloc(this.defaultReadBufferSize)
    // this.onFlush = callback;
  }

  // Set the seqid of the message in the client
  // So that callbacks can be found
  // setSeqId(seqid) {
  //   this._seqid = seqid;
  // }

  public commitPosition(): void {
    const unreadSize = this.writeCursor - this.readCursor
    const bufSize = (unreadSize * 2 > this.defaultReadBufferSize) ? unreadSize * 2 : this.defaultReadBufferSize
    const buf = Buffer.alloc(bufSize)
    if (unreadSize > 0) {
      // TODO: Does this actually need to be copied? If not, it could be sliced
      this.inBuf.copy(buf, 0, this.readCursor, this.writeCursor)
    }
    this.readCursor = 0
    this.writeCursor = unreadSize
    this.inBuf = buf
  }

  public rollbackPosition(): void {
    this.readCursor = 0
  }

  public read(size: number): Promise<Buffer> {
    return new Promise((resolve) => {
      this.ensureAvailable(size)

      const buf = Buffer.alloc(size)
      // TODO: Does this actually need to be copied? If not, it could be sliced
      this.inBuf.copy(buf, 0, this.readCursor, this.readCursor + size)
      this.readCursor += size
      resolve(buf)
    })
  }

  public readByte(): Promise<number> {
    return new Promise((resolve) => {
      this.ensureAvailable(1)

      const byte = binary.readByte(this.inBuf[this.readCursor])
      this.readCursor += 1
      resolve(byte)
    })
  }
  public readI16(): Promise<number> {
    return new Promise((resolve) => {
      this.ensureAvailable(2)

      const i16 = binary.readI16(this.inBuf, this.readCursor)
      this.readCursor += 2
      resolve(i16)
    })
  }
  public readI32(): Promise<number> {
    return new Promise((resolve) => {
      this.ensureAvailable(4)

      const i32 = binary.readI32(this.inBuf, this.readCursor)
      this.readCursor += 4
      resolve(i32)
    })
  }
  public readDouble(): Promise<number> {
    return new Promise((resolve) => {
      this.ensureAvailable(8)

      const d = binary.readDouble(this.inBuf, this.readCursor)
      this.readCursor += 8
      resolve(d)
    })
  }
  public readString(size: number): Promise<string> {
    return new Promise((resolve) => {
      this.ensureAvailable(size)

      const str = this.inBuf.toString('utf8', this.readCursor, this.readCursor + size)
      this.readCursor += size
      resolve(str)
    })
  }

  // TODO: Should we de-support string?
  public write(buf: Buffer | string): void {
    if (typeof buf === 'string') {
      buf = Buffer.from(buf, 'utf8')
    }
    this.outBuffers.push(buf)
    this.outSize += buf.length
  }

  // TODO: Maybe this should return a promise
  public flush(): void {
    // TODO: This doesn't seem used
    // If the seqid of the callback is available pass it to the onFlush
    // Then remove the current seqid
    // const seqid = this._seqid
    // this._seqid = null

    // TODO: If this returns a promise, should this resolve or reject?
    if (this.outSize < 1) {
      return
    }

    const msg = Buffer.alloc(this.outSize)
    let pos = 0
    this.outBuffers.forEach((buf) => {
      // TODO: Do these actually need to be copied? If not, it could be joined by Buffer.concat
      buf.copy(msg, pos, 0)
      pos += buf.length
    })

    // if (this.onFlush) {
    //   // Passing seqid through this call to get it to the connection
    //   this.onFlush(msg, seqid)
    // }

    this.outBuffers = []
    this.outSize = 0
  }

  public consume(bytesConsumed: number): void {
    this.readCursor += bytesConsumed
  }

  // TODO: This seems to only be used for json_protocol
  public borrow(): { buf: Buffer; readIndex: number; writeIndex: number; } {
    const obj = {buf: this.inBuf, readIndex: this.readCursor, writeIndex: this.writeCursor}
    return obj
  }

  // TODO: They don't implement these
  public isOpen(): boolean {
    return true
  }
  // tslint:disable-next-line:no-empty
  public open() {}
  // tslint:disable-next-line:no-empty
  public close() {}

  // By making this private and only using it inside promise constructors, it should be fine to throw
  private ensureAvailable(size: number): void {
    if (this.readCursor + size > this.writeCursor) {
      throw new InputBufferUnderrunError()
    }
  }
}