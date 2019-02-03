export interface AccessTokenRequestOptions {
    readonly unencryptedSecretKey: string;
    readonly salt: string;
    readonly thirdPartyAccessId: string;
}
