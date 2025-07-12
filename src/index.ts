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

declare type HashAlgorithms = unknown;
declare type HmacAlgorithms = unknown;
export namespace Crypto {
    export declare function hash(message: Uint8Array, algorithm?: HashAlgorithms): Uint8Array;
    export declare function hmac(key: Uint8Array, message: Uint8Array, length?: number, algorithm?: HmacAlgorithms): Uint8Array
    export declare function hkdf(key: Uint8Array, salt: Uint8Array, info?: Uint8Array | string, length?: number): Uint8Array;

    export namespace box {
        export declare const keyLength: number;
        export declare const nonceLength: number;
        export declare function encrypt(msg: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array;
        export declare function decrypt(msg: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array | undefined;
    }

    export namespace ECDH {
        export declare const publicKeyLength: number;
        export declare const secretKeyLength: number;
        export declare function keyPair(secretKey?: Uint8Array): KeyPair;
        export declare function sharedKey(publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array;

        export type KeyPair = {
            publicKey: Uint8Array;
            secretKey: Uint8Array;
        };
    }

    export namespace EdDSA {
        export declare const publicKeyLength: number;
        export declare const secretKeyLength: number;
        export declare const signatureLength: number;
        export declare const seedLength: number;

        export declare function keyPair(secretKey?: Uint8Array): KeyPair;
        export declare function keyPairFromSeed(seed: Uint8Array): KeyPair;
        export declare function sign(msg: Uint8Array, secretKey: Uint8Array): Uint8Array;
        export declare function verify(msg: Uint8Array, sig: Uint8Array, publicKey: Uint8Array): boolean;

        export type KeyPair = {
            publicKey: Uint8Array;
            secretKey: Uint8Array;
        };
    }

    export declare function randomBytes(): (n: number) => Uint8Array;
    export declare function scalarMult(n: Uint8Array, p: Uint8Array): Uint8Array;
}
