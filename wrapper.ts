import {
	Adler32,
	type Adler32AcceptDataType
} from "./core.ts";
/**
 * Get the checksum of the file with algorithm Adler32, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * @param {string | URL} filePath Path of the file.
 * @returns {Promise<Adler32>}
 */
export async function adler32FromFile(filePath: string | URL): Promise<Adler32> {
	using file: Deno.FsFile = await Deno.open(filePath);
	return await adler32FromStream(file.readable);
}
/**
 * Get the checksum of the file with algorithm Adler32, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * @param {string | URL} filePath Path of the file.
 * @returns {Adler32}
 */
export function adler32FromFileSync(filePath: string | URL): Adler32 {
	return new Adler32(Deno.readFileSync(filePath));
}
/**
 * Get the checksum of the readable stream with algorithm Adler32, asynchronously.
 * @param {ReadableStream<Adler32AcceptDataType>} stream Readable stream.
 * @returns {Promise<Adler32>}
 */
export async function adler32FromStream(stream: ReadableStream<Adler32AcceptDataType>): Promise<Adler32> {
	const instance: Adler32 = new Adler32();
	for await (const chunk of stream) {
		instance.update(chunk);
	}
	return instance;
}
