/// <reference types="node" />
import { HexBase64Latin1Encoding } from 'crypto';
export declare class Encoder {
    private shaType;
    private baseEncoding;
    constructor(shaType?: string, baseEncoding?: HexBase64Latin1Encoding);
    encode(secretKey: string, salt?: string): string;
}
