export type Adler32AcceptDataType =
	| string
	| BigUint64Array
	| Uint8Array
	| Uint16Array
	| Uint32Array;
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
	#hashUint8Array: Uint8Array | null = null;
	#a: bigint = 1n;
	#b: bigint = 0n;
	/**
	 * Initialize.
	 * @param {Adler32AcceptDataType} [data] Data. Can append later via the method {@linkcode Adler32.update} and {@linkcode Adler32.updateFromStream}.
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
		this.#hashUint8Array = null;
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
	 * Get the checksum of the data, in big integer.
	 * @returns {bigint}
	 */
	hashBigInt(): bigint {
		return this.hash();
	}
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
	 * Get the checksum of the data, in Uint8Array.
	 * @returns {Uint8Array}
	 */
	hashUint8Array(): Uint8Array {
		if (this.#hashUint8Array === null) {
			const hex: string = this.hashHex();
			const hexFmt: string = (hex.length % 2 === 0) ? hex : `0${hex}`;
			const bytes: string[] = [];
			for (let index: number = 0; index < hexFmt.length; index += 2) {
				bytes.push(hexFmt.slice(index, index + 2));
			}
			this.#hashUint8Array = Uint8Array.from(bytes.map((byte: string): number => {
				return Number.parseInt(byte, 16);
			}));
		}
		return Uint8Array.from(this.#hashUint8Array);
	}
	/**
	 * Append data.
	 * @param {Adler32AcceptDataType} data Data.
	 * @returns {this}
	 */
	update(data: Adler32AcceptDataType): this {
		this.#clearStorage();
		const dataFmt: Exclude<Adler32AcceptDataType, string> = (typeof data === "string") ? new TextEncoder().encode(data) : data;
		for (const byte of dataFmt) {
			this.#a = (this.#a + BigInt(byte)) % 65521n;
			this.#b = (this.#b + this.#a) % 65521n;
		}
		return this;
	}
	/**
	 * Append data from the readable stream.
	 * @param {ReadableStream<Adler32AcceptDataType>} stream Readable stream.
	 * @returns {Promise<this>}
	 */
	async updateFromStream(stream: ReadableStream<Adler32AcceptDataType>): Promise<this> {
		for await (const chunk of stream) {
			this.update(chunk);
		}
		return this;
	}
}
export default Adler32;
