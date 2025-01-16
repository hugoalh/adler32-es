import { Adler32 } from "./core.ts";
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
	return await Adler32.fromStream(file.readable);
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
