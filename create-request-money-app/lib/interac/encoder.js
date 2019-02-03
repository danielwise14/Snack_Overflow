"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
const characterEncoding = 'utf8';
class Encoder {
    constructor(shaType = 'sha256', baseEncoding = 'base64') {
        this.shaType = shaType;
        this.baseEncoding = baseEncoding;
    }
    encode(secretKey, salt) {
        const usableSalt = salt !== undefined ? salt : uuid_1.v4().toString();
        return crypto_1.createHash(this.shaType)
            .update(`${usableSalt}:${secretKey}`, characterEncoding)
            .digest(this.baseEncoding);
    }
}
exports.Encoder = Encoder;
