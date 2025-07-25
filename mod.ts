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
	#hashHex: string | null = null;
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
	 * Get the checksum of the data, in Uint8Array.
	 * @returns {Uint8Array}
	 */
	hash(): Uint8Array {
		if (this.#hashUint8Array === null) {
			const hex: string = this.hashHex();
			const bytes: string[] = [];
			for (let index: number = 0; index < hex.length; index += 2) {
				bytes.push(hex.slice(index, index + 2));
			}
			this.#hashUint8Array = Uint8Array.from(bytes.map((byte: string): number => {
				return Number.parseInt(byte, 16);
			}));
		}
		return Uint8Array.from(this.#hashUint8Array);
	}
	/**
	 * Get the checksum of the data, in hexadecimal with padding.
	 * @returns {string}
	 */
	hashHex(): string {
		this.#hashHex ??= (this.#b * 65536n + this.#a).toString(16).toUpperCase().padStart(8, "0");
		if (this.#hashHex.length !== 8) {
			throw new Error(`Unexpected hash hex result \`${this.#hashHex}\`! Please submit a bug report.`);
		}
		return this.#hashHex;
	}
	/**
	 * Append data.
	 * @param {Adler32AcceptDataType} data Data.
	 * @returns {this}
	 */
	update(data: Adler32AcceptDataType): this {
		if (this.#freezed) {
			throw new Error(`Instance is freezed!`);
		}
		this.#hashHex = null;
		this.#hashUint8Array = null;
		const dataFmt: Exclude<Adler32AcceptDataType, string> = (typeof data === "string") ? new TextEncoder().encode(data) : data;
		for (const byte of dataFmt) {
			this.#a = (this.#a + BigInt(byte)) % 65521n;
			this.#b = (this.#b + this.#a) % 65521n;
		}
		return this;
	}
	/**
	 * Append data from the readable stream.
	 * @param {ReadableStream<Adler32AcceptDataType>} stream Data from the readable stream.
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
