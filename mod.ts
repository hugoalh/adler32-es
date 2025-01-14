export type Adler32AcceptDataType = string | BigUint64Array | Uint8Array | Uint16Array | Uint32Array;
/**
 * Get the checksum of the data with algorithm Adler32.
 */
export class Adler32 {
	#a: bigint = 1n;
	#b: bigint = 0n;
	#hash: bigint | null = null;
	/**
	 * Initialize.
	 * @param {Adler32AcceptDataType} [data] Data. Can append later via the method {@linkcode Adler32.update}.
	 */
	constructor(data?: Adler32AcceptDataType) {
		if (typeof data !== "undefined") {
			this.update(data);
		}
	}
	/**
	 * Get the checksum of the data, in big integer.
	 * @returns {bigint}
	 */
	hash(): bigint {
		if (this.#hash === null) {
			this.#hash = this.#b * 65536n + this.#a;
		}
		return this.#hash;
	}
	/**
	 * Get the checksum of the data, in Base16.
	 * @returns {string}
	 */
	hashBase16(): string {
		return this.hashNumber().toString(16).toUpperCase();
	}
	/**
	 * Get the checksum of the data, in Base32Hex ({@link https://datatracker.ietf.org/doc/html/rfc4648#section-7 RFC 4648 §7}).
	 * @returns {string}
	 */
	hashBase32Hex(): string {
		return this.hashNumber().toString(32).toUpperCase();
	}
	/**
	 * Get the checksum of the data, in Base36.
	 * @returns {string}
	 */
	hashBase36(): string {
		return this.hashNumber().toString(36).toUpperCase();
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
		this.#hash = null;
		for (const byte of ((typeof data === "string") ? new TextEncoder().encode(data) : data)) {
			this.#a = (this.#a + BigInt(byte)) % 65521n;
			this.#b = (this.#b + this.#a) % 65521n;
		}
		return this;
	}
	/**
	 * Initialize from file, asynchronously.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
	 * >   - *Resources*
	 * @param {string | URL} filePath Path of the file.
	 * @returns {Promise<Adler32>}
	 */
	static async fromFile(filePath: string | URL): Promise<Adler32> {
		using file: Deno.FsFile = await Deno.open(filePath);
		return await this.fromStream(file.readable);
	}
	/**
	 * Initialize from file, synchronously.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
	 * >   - *Resources*
	 * @param {string | URL} filePath Path of the file.
	 * @returns {Adler32}
	 */
	static fromFileSync(filePath: string | URL): Adler32 {
		return new this(Deno.readFileSync(filePath));
	}
	/**
	 * Initialize from readable stream, asynchronously.
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
