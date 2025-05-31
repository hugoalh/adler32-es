import { Buffer } from "node:buffer";
export type Adler32AcceptDataType = string | BigUint64Array | Uint8Array | Uint16Array | Uint32Array;
/**
 * Get the checksum of the data with algorithm Adler32.
 */
export class Adler32 {
	get [Symbol.toStringTag](): string {
		return "Adler32";
	}
	#freezed: boolean = false;
	#hash: bigint | null = null;
	#hashBase16: string | null = null;
	#hashBase32Hex: string | null = null;
	#hashBase36: string | null = null;
	#hashBase64: string | null = null;
	#hashBase64URL: string | null = null;
	#a: bigint = 1n;
	#b: bigint = 0n;
	/**
	 * Initialize.
	 * @param {Adler32AcceptDataType} [data] Data. Can append later via the method {@linkcode Adler32.update}.
	 */
	constructor(data?: Adler32AcceptDataType) {
		if (typeof data !== "undefined") {
			this.update(data);
		}
	}
	#clearStorage(): void {
		if (this.#freezed) {
			throw new Error(`Instance is freezed!`);
		}
		this.#hash = null;
		this.#hashBase16 = null;
		this.#hashBase32Hex = null;
		this.#hashBase36 = null;
		this.#hashBase64 = null;
		this.#hashBase64URL = null;
	}
	/**
	 * Whether the instance is freezed.
	 * @returns {boolean}
	 */
	get freezed(): boolean {
		return this.#freezed;
	}
	/**
	 * Freeze the instance to prevent any further update.
	 * @returns {this}
	 */
	freeze(): this {
		this.#freezed = true;
		return this;
	}
	/**
	 * Get the checksum of the data, in original format.
	 * @returns {bigint}
	 */
	hash(): bigint {
		this.#hash ??= this.#b * 65536n + this.#a;
		return this.#hash;
	}
	/**
	 * Get the checksum of the data, in Base16.
	 * @returns {string}
	 */
	hashBase16(): string {
		this.#hashBase16 ??= this.hashBigInt().toString(16).toUpperCase();
		return this.#hashBase16;
	}
	/**
	 * Get the checksum of the data, in Base32Hex ({@link https://datatracker.ietf.org/doc/html/rfc4648#section-7 RFC 4648 §7}).
	 * @returns {string}
	 */
	hashBase32Hex(): string {
		this.#hashBase32Hex ??= this.hashBigInt().toString(32).toUpperCase();
		return this.#hashBase32Hex;
	}
	/**
	 * Get the checksum of the data, in Base36.
	 * @returns {string}
	 */
	hashBase36(): string {
		this.#hashBase36 ??= this.hashBigInt().toString(36).toUpperCase();
		return this.#hashBase36;
	}
	/**
	 * Get the checksum of the data, in Base64.
	 * @returns {string}
	 */
	hashBase64(): string {
		this.#hashBase64 ??= Buffer.from(this.hashBase16(), "hex").toString("base64");
		return this.#hashBase64;
	}
	/**
	 * Get the checksum of the data, in Base64URL.
	 * @returns {string}
	 */
	hashBase64URL(): string {
		this.#hashBase64URL ??= Buffer.from(this.hashBase16(), "hex").toString("base64url");
		return this.#hashBase64URL;
	}
	/**
	 * Get the checksum of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInt(): bigint {
		return this.hash();
	}
	/**
	 * Get the checksum of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInteger: () => bigint = this.hashBigInt;
	/**
	 * Get the checksum of the data, in hex/hexadecimal without padding.
	 * @returns {string}
	 */
	hashHex(): string {
		return this.hashBase16();
	}
	/**
	 * Get the checksum of the data, in hex/hexadecimal with padding.
	 * @returns {string}
	 */
	hashHexPadding(): string {
		return this.hashHex().padStart(8, "0");
	}
	/**
	 * Get the checksum of the data, in number.
	 * @returns {number}
	 */
	hashNumber(): number {
		return Number(this.hash());
	}
	/**
	 * Append data.
	 * @param {Adler32AcceptDataType} data Data.
	 * @returns {this}
	 */
	update(data: Adler32AcceptDataType): this {
		this.#clearStorage();
		for (const byte of ((typeof data === "string") ? new TextEncoder().encode(data) : data)) {
			this.#a = (this.#a + BigInt(byte)) % 65521n;
			this.#b = (this.#b + this.#a) % 65521n;
		}
		return this;
	}
	/**
	 * Initialize from the readable stream.
	 * @param {ReadableStream<Adler32AcceptDataType>} stream Readable stream.
	 * @returns {Promise<Adler32>}
	 */
	static async fromStream(stream: ReadableStream<Adler32AcceptDataType>): Promise<Adler32> {
		const instance: Adler32 = new this();
		for await (const chunk of stream) {
			instance.update(chunk);
		}
		return instance;
	}
}
export default Adler32;
