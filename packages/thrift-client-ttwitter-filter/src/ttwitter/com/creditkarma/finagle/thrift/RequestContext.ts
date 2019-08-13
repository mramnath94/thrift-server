/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.4
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
export interface IRequestContext {
    key?: Buffer;
    value?: Buffer;
}
export interface IRequestContextArgs {
    key?: string | Buffer;
    value?: string | Buffer;
}
export const RequestContextCodec: thrift.IStructCodec<IRequestContextArgs, IRequestContext> = {
    encode(args: IRequestContextArgs, output: thrift.TProtocol): void {
        const obj: any = {
            key: (typeof args.key === "string" ? Buffer.from(args.key) : args.key),
            value: (typeof args.value === "string" ? Buffer.from(args.value) : args.value)
        };
        output.writeStructBegin("RequestContext");
        if (obj.key != null) {
            output.writeFieldBegin("key", thrift.TType.STRING, 1);
            output.writeBinary(obj.key);
            output.writeFieldEnd();
        }
        if (obj.value != null) {
            output.writeFieldBegin("value", thrift.TType.STRING, 2);
            output.writeBinary(obj.value);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IRequestContext {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.STRING) {
                        const value_1: Buffer = input.readBinary();
                        _args.key = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: Buffer = input.readBinary();
                        _args.value = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return {
            key: _args.key,
            value: _args.value
        };
    }
};
export class RequestContext extends thrift.StructLike implements IRequestContext {
    public key?: Buffer;
    public value?: Buffer;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IRequestContextArgs = {}) {
        super();
        if (args.key != null) {
            const value_3: Buffer = (typeof args.key === "string" ? Buffer.from(args.key) : args.key);
            this.key = value_3;
        }
        if (args.value != null) {
            const value_4: Buffer = (typeof args.value === "string" ? Buffer.from(args.value) : args.value);
            this.value = value_4;
        }
    }
    public static read(input: thrift.TProtocol): RequestContext {
        return new RequestContext(RequestContextCodec.decode(input));
    }
    public static write(args: IRequestContextArgs, output: thrift.TProtocol): void {
        return RequestContextCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return RequestContextCodec.encode(this, output);
    }
}
