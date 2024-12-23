import { parseArgs } from "jsr:@std/cli@^1.0.8/parse-args";
import { Adler32 } from "./mod.ts";
if (!import.meta.main) {
	throw new Error(`This script is for command line usage only!`);
}
const args = parseArgs(Deno.args, {
	boolean: [
		"file",
		"stdin"
	]
});
const fromFile: boolean = args.file;
const fromStdin: boolean = args.stdin;
const argsValues: string[] = args._.map((value: string | number): string => {
	return String(value);
});
if (fromFile && fromStdin) {
	throw new SyntaxError(`Unable to use the sources of file and stdin together!`);
}
if (fromFile) {
	if (argsValues.length === 0) {
		throw new SyntaxError(`File path is not defined!`);
	}
	if (argsValues.length !== 1) {
		throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${argsValues.length}.`);
	}
	console.log((await Adler32.fromFile(argsValues[0])).hashHexPadding());
} else if (fromStdin) {
	if (argsValues.length !== 0) {
		throw new SyntaxError(`Too many arguments! Expect: 0; Current: ${argsValues.length}.`);
	}
	const stdinReader: ReadableStreamDefaultReader<Uint8Array> = Deno.stdin.readable.getReader();
	let data: Uint8Array = Uint8Array.from([]);
	while (true) {
		const {
			done,
			value
		}: ReadableStreamReadResult<Uint8Array> = await stdinReader.read();
		if (done) {
			break;
		}
		data = Uint8Array.from([...data, ...value]);
	}
	console.log(new Adler32(new TextDecoder().decode(data).replace(/\r?\n$/, "")).hashHexPadding());
} else {
	if (argsValues.length === 0) {
		throw new SyntaxError(`Data is not defined!`);
	}
	if (argsValues.length !== 1) {
		throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${argsValues.length}.`);
	}
	console.log(new Adler32(argsValues[0]).hashHexPadding());
}
