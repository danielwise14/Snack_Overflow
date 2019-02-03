"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const encoder_1 = require("./encoder");
const BASE_URI = 'https://gateway-web.beta.interac.ca/publicapi/api/v1/access-tokens';
const encoder = new encoder_1.Encoder();
async function getAccessToken(options) {
    const { unencryptedSecretKey, salt, thirdPartyAccessId } = options;
    const result = await axios_1.default.get(BASE_URI, {
        headers: {
            secretKey: encoder.encode(unencryptedSecretKey, salt),
            salt,
            thirdPartyAccessId,
        },
    });
    return result.data;
}
exports.getAccessToken = getAccessToken;
