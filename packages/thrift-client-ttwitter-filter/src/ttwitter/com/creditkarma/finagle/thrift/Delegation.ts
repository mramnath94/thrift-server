/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.4
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
export interface IDelegation {
    src?: string;
    dst?: string;
}
export interface IDelegationArgs {
    src?: string;
    dst?: string;
}
export const DelegationCodec: thrift.IStructCodec<IDelegationArgs, IDelegation> = {
    encode(args: IDelegationArgs, output: thrift.TProtocol): void {
        const obj: any = {
            src: args.src,
            dst: args.dst
        };
        output.writeStructBegin("Delegation");
        if (obj.src != null) {
            output.writeFieldBegin("src", thrift.TType.STRING, 1);
            output.writeString(obj.src);
            output.writeFieldEnd();
        }
        if (obj.dst != null) {
            output.writeFieldBegin("dst", thrift.TType.STRING, 2);
            output.writeString(obj.dst);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IDelegation {
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
                        const value_1: string = input.readString();
                        _args.src = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.dst = value_2;
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
            src: _args.src,
            dst: _args.dst
        };
    }
};
export class Delegation extends thrift.StructLike implements IDelegation {
    public src?: string;
    public dst?: string;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IDelegationArgs = {}) {
        super();
        if (args.src != null) {
            const value_3: string = args.src;
            this.src = value_3;
        }
        if (args.dst != null) {
            const value_4: string = args.dst;
            this.dst = value_4;
        }
    }
    public static read(input: thrift.TProtocol): Delegation {
        return new Delegation(DelegationCodec.decode(input));
    }
    public static write(args: IDelegationArgs, output: thrift.TProtocol): void {
        return DelegationCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return DelegationCodec.encode(this, output);
    }
}
