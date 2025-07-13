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

type HashAlgorithms = unknown;
type HmacAlgorithms = unknown;

export interface Crypto {
    hash(message: Uint8Array, algorithm?: HashAlgorithms): Uint8Array;
    hmac(key: Uint8Array, message: Uint8Array, length?: number, algorithm?: HmacAlgorithms): Uint8Array
    hkdf(key: Uint8Array, salt: Uint8Array, info?: Uint8Array | string, length?: number): Uint8Array;

    readonly box: Crypto.box;
    readonly ECDH: Crypto.ECDH;
    readonly EdDSA: Crypto.EdDSA;

    randomBytes(n: number): Uint8Array;
    scalarMult(n: Uint8Array, p: Uint8Array): Uint8Array;
}
export namespace Crypto {
    export type KeyPair = {
        publicKey: Uint8Array;
        secretKey: Uint8Array;
    }

    export interface box {
        readonly keyLength: number;
        readonly nonceLength: number;
        
        encrypt(msg: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array;
        decrypt(msg: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array | undefined;
    }

    export interface ECDH {
        readonly publicKeyLength: number;
        readonly secretKeyLength: number;

        keyPair(secretKey?: Uint8Array): KeyPair;
        sharedKey(publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array;
    }

    export interface EdDSA {
        readonly publicKeyLength: number;
        readonly secretKeyLength: number;
        readonly signatureLength: number;
        readonly seedLength: number;

        keyPair(secretKey?: Uint8Array): KeyPair;
        keyPairFromSeed(seed: Uint8Array): KeyPair;
        sign(msg: Uint8Array, secretKey: Uint8Array): Uint8Array;
        verify(msg: Uint8Array, sig: Uint8Array, publicKey: Uint8Array): boolean;
    }
}