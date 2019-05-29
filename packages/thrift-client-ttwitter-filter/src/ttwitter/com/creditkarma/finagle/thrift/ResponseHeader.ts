/* tslint:disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.6.2
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as __NAMESPACE__ from "./.";
export interface IResponseHeader {
    spans?: Array<__NAMESPACE__.ISpan>;
    contexts?: Array<__NAMESPACE__.IRequestContext>;
}
export interface IResponseHeaderArgs {
    spans?: Array<__NAMESPACE__.ISpanArgs>;
    contexts?: Array<__NAMESPACE__.IRequestContextArgs>;
}
export const ResponseHeaderCodec: thrift.IStructCodec<IResponseHeaderArgs, IResponseHeader> = {
    encode(args: IResponseHeaderArgs, output: thrift.TProtocol): void {
        const obj = {
            spans: args.spans,
            contexts: args.contexts
        };
        output.writeStructBegin("ResponseHeader");
        if (obj.spans != null) {
            output.writeFieldBegin("spans", thrift.TType.LIST, 1);
            output.writeListBegin(thrift.TType.STRUCT, obj.spans.length);
            obj.spans.forEach((value_1: __NAMESPACE__.ISpanArgs): void => {
                __NAMESPACE__.SpanCodec.encode(value_1, output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (obj.contexts != null) {
            output.writeFieldBegin("contexts", thrift.TType.LIST, 2);
            output.writeListBegin(thrift.TType.STRUCT, obj.contexts.length);
            obj.contexts.forEach((value_2: __NAMESPACE__.IRequestContextArgs): void => {
                __NAMESPACE__.RequestContextCodec.encode(value_2, output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IResponseHeader {
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
                    if (fieldType === thrift.TType.LIST) {
                        const value_3: Array<__NAMESPACE__.ISpan> = new Array<__NAMESPACE__.ISpan>();
                        const metadata_1: thrift.IThriftList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_4: __NAMESPACE__.ISpan = __NAMESPACE__.SpanCodec.decode(input);
                            value_3.push(value_4);
                        }
                        input.readListEnd();
                        _args.spans = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.LIST) {
                        const value_5: Array<__NAMESPACE__.IRequestContext> = new Array<__NAMESPACE__.IRequestContext>();
                        const metadata_2: thrift.IThriftList = input.readListBegin();
                        const size_2: number = metadata_2.size;
                        for (let i_2: number = 0; i_2 < size_2; i_2++) {
                            const value_6: __NAMESPACE__.IRequestContext = __NAMESPACE__.RequestContextCodec.decode(input);
                            value_5.push(value_6);
                        }
                        input.readListEnd();
                        _args.contexts = value_5;
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
            spans: _args.spans,
            contexts: _args.contexts
        };
    }
};
export class ResponseHeader extends thrift.StructLike implements IResponseHeader {
    public spans?: Array<__NAMESPACE__.ISpan>;
    public contexts?: Array<__NAMESPACE__.IRequestContext>;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IResponseHeaderArgs = {}) {
        super();
        if (args.spans != null) {
            const value_7: Array<__NAMESPACE__.ISpan> = new Array<__NAMESPACE__.ISpan>();
            args.spans.forEach((value_9: __NAMESPACE__.ISpanArgs): void => {
                const value_10: __NAMESPACE__.ISpan = new __NAMESPACE__.Span(value_9);
                value_7.push(value_10);
            });
            this.spans = value_7;
        }
        if (args.contexts != null) {
            const value_8: Array<__NAMESPACE__.IRequestContext> = new Array<__NAMESPACE__.IRequestContext>();
            args.contexts.forEach((value_11: __NAMESPACE__.IRequestContextArgs): void => {
                const value_12: __NAMESPACE__.IRequestContext = new __NAMESPACE__.RequestContext(value_11);
                value_8.push(value_12);
            });
            this.contexts = value_8;
        }
    }
    public static read(input: thrift.TProtocol): ResponseHeader {
        return new ResponseHeader(ResponseHeaderCodec.decode(input));
    }
    public static write(args: IResponseHeaderArgs, output: thrift.TProtocol): void {
        return ResponseHeaderCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return ResponseHeaderCodec.encode(this, output);
    }
}
