import { adler32FromFile } from "./wrapper.ts";
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	console.log((await adler32FromFile("./README.md")).hashHexPadding());
});
