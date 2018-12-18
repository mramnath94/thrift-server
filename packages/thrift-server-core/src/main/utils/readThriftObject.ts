import {
    IProtocolConstructor,
    IStructCodec,
    ITransportConstructor,
    ProtocolType,
    TransportType,
} from '../types'

import { getProtocol, TProtocol } from '../protocols'

import { getTransport, TTransport } from '../transports'

export function readThriftObject<StrictType>(
    data: Buffer,
    ThriftCodec: IStructCodec<any, StrictType>,
    transportType: TransportType = 'buffered',
    protocolType: ProtocolType = 'binary',
): Promise<[StrictType, Buffer]> {
    return new Promise((resolve, reject) => {
        const Transport: ITransportConstructor = getTransport(transportType)
        const Protocol: IProtocolConstructor = getProtocol(protocolType)
        const receiver: TTransport = new Transport(data)
        const input: TProtocol = new Protocol(receiver)
        const decoded = ThriftCodec.decode(input)

        resolve([decoded, receiver.remaining()])
    })
}
