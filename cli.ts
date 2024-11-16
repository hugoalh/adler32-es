#!/usr/bin/env -S deno run --allow-read
import { parseArgs } from "jsr:@std/cli@^1.0.6/parse-args";
import { Adler32 } from "./mod.ts";
if (!import.meta.main) {
	throw new Error(`This script is for command line usage only!`);
}
const args = parseArgs(Deno.args, {
	boolean: ["file", "stdin"],
});
const fromFile: boolean = args.file;
const fromStdin: boolean = args.stdin;
const values: string[] = args._.map((value: string | number): string => {
	return String(value);
});
if (fromFile && fromStdin) {
	throw new SyntaxError(`Unable to use the sources of file and stdin together!`);
}
if (fromFile) {
	if (values.length === 0) {
		throw new SyntaxError(`File path is not defined!`);
	}
	if (values.length !== 1) {
		throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${values.length}.`);
	}
	console.log((await Adler32.fromFile(values[0])).hashHexPadding());
} else if (fromStdin) {
	if (values.length !== 0) {
		throw new SyntaxError(`Too many arguments! Expect: 0; Current: ${values.length}.`);
	}
	const stdinReader: ReadableStreamDefaultReader<Uint8Array> = Deno.stdin.readable.getReader();
	const instance: Adler32 = new Adler32();
	while (true) {
		const {
			done,
			value
		}: ReadableStreamReadResult<Uint8Array> = await stdinReader.read();
		if (done) {
			break;
		}
		instance.update(value);
	}
	console.log(instance.hashHexPadding());
} else {
	if (values.length === 0) {
		throw new SyntaxError(`Data is not defined!`);
	}
	if (values.length !== 1) {
		throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${values.length}.`);
	}
	console.log(new Adler32(values[0]).hashHexPadding());
}
