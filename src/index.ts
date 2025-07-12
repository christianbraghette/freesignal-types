export interface Encodable {
    readonly length: number;

    encode(): Uint8Array;
    decode(): object;
    toString(): string;
    toJSON(): string;
}
export namespace Encodable {
    const properties = ['length', 'encode', 'decode', 'toString', 'toJSON'];

    export function isEncodable(obj: any): boolean {
        return !properties.some(prop => !obj[prop]);
    }
}

export declare type HashAlgorithms = unknown;
export declare type HmacAlgorithms = unknown;
export declare namespace Crypto {
    function hash(message: Uint8Array, algorithm?: HashAlgorithms): Uint8Array;
    function hmac(key: Uint8Array, message: Uint8Array, length?: number, algorithm?: HmacAlgorithms): Uint8Array
    function hkdf(key: Uint8Array, salt: Uint8Array, info?: Uint8Array | string, length?: number): Uint8Array;

    namespace box {
        const keyLength: number;
        const nonceLength: number;
        function encrypt(msg: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array;
        function decrypt(msg: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array | undefined;
    }

    namespace ECDH {
        const publicKeyLength: number;
        const secretKeyLength: number;
        function keyPair(secretKey?: Uint8Array): KeyPair;
        function sharedKey(publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array;

        type KeyPair = {
            publicKey: Uint8Array;
            secretKey: Uint8Array;
        };
    }

    namespace EdDSA {
        const publicKeyLength: number;
        const secretKeyLength: number;
        const signatureLength: number;
        const seedLength: number;

        function keyPair(secretKey?: Uint8Array): KeyPair;
        function keyPairFromSeed(seed: Uint8Array): KeyPair;
        function sign(msg: Uint8Array, secretKey: Uint8Array): Uint8Array;
        function verify(msg: Uint8Array, sig: Uint8Array, publicKey: Uint8Array): boolean;

        type KeyPair = {
            publicKey: Uint8Array;
            secretKey: Uint8Array;
        };
    }

    function randomBytes(): (n: number) => Uint8Array;
    function scalarMult(n: Uint8Array, p: Uint8Array): Uint8Array;
}
