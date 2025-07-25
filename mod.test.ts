import {
	deepStrictEqual,
	throws
} from "node:assert";
import { Adler32 } from "./mod.ts";
Deno.test("Lock", { permissions: "none" }, () => {
	throws(() => {
		new Adler32().freeze().update("");
	});
});
Deno.test("Direct 1", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("").hashHex(), "00000001");
});
Deno.test("Direct 2", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("GitHub").hashHex(), "07B10244");
});
Deno.test("Direct 3", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("Wikipedia").hashHex(), "11E60398");
});
Deno.test("Direct 4", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("✔️❌").hashHex(), "20C10654");
});
Deno.test("Direct 5", { permissions: "none" }, () => {
	const sample = "foo bar baz٪☃🍣";
	const instance = new Adler32();
	deepStrictEqual(instance.update(sample).hashHex(), "5C010A36");
	deepStrictEqual(instance.update(sample).hashHex(), "8435146B");
	deepStrictEqual(instance.update(sample).hashHex(), "789C1EA0");
});
Deno.test("Direct 6", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32(`Aliquam et at at invidunt in. Dolore labore justo ea diam. Labore kasd labore et justo vulputate suscipit soluta eum lorem vel magna gubergren ut qui magna. Diam tempor luptatum et takimata consetetur sit aliquam dolor lorem exerci aliquyam duis. Et sed delenit sea et magna eirmod takimata sit euismod sit. Et dolor consetetur dolor aliquyam duo erat. Dolor et clita takimata sadipscing dolores volutpat ut voluptua. Sit et justo laoreet sed sed sit et vel sit kasd et accumsan tempor te dolor sed. Eu ut diam diam amet elitr labore et sed accusam ea dolores ipsum lorem magna. Nonummy diam liber takimata invidunt diam stet rebum dolores erat. Consetetur luptatum at congue at eirmod aliquyam tempor diam sadipscing dolor eos. At gubergren stet euismod dolores dolores dolor hendrerit eirmod et erat aliquip nonummy dolor dolores elitr. Voluptua eos dolor nobis takimata blandit lorem in nonumy erat sanctus ex elitr te. Dolores erat labore voluptua tincidunt vero.

Eirmod et sanctus imperdiet veniam sadipscing rebum tempor consetetur amet. Dolores iusto est in justo quis feugait duis sit esse. Ut sit nulla nulla sit dolore justo sea consequat amet dolor dolor vulputate feugiat amet eos. Ipsum iriure elitr clita accumsan ullamcorper feugait diam feugiat vel et ut. Tation dolores sed no ut gubergren. Ut sed voluptua duo lobortis tempor lobortis in amet dolores stet qui in stet sit amet iriure stet. Exerci illum cum sanctus eleifend ex vero et te stet nostrud erat duis laoreet ipsum eos hendrerit ut.

Et ipsum nonumy kasd facilisis et rebum dolor diam liber dolor et nulla. Ut duo ex ut consetetur dolore illum suscipit sadipscing voluptua odio tation dolor consetetur sit dolor sed et justo. Quis ullamcorper ad.

Sadipscing est voluptua rebum sanctus doming nulla duis et sanctus tempor eos tation takimata. Sit kasd no stet at sed eos justo dolore nulla. Et dolor in erat stet lorem nulla takimata nobis nibh est elitr eirmod aliquyam sed. Stet eirmod aliquyam at et. Sadipscing sed blandit ipsum consequat. Accusam aliquip invidunt at ad vero voluptua dolores accusam.`).hashHex(), "75F000A9");
});
Deno.test("Direct 7", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("SheetJS").hashHex(), "0A8C0297");
});
Deno.test("Direct 8", { permissions: "none" }, () => {
	const instance = new Adler32();
	deepStrictEqual(instance.update("Sh").hashHex(), "011000BC");
	deepStrictEqual(instance.update("eet").hashHex(), "05B101FA");
	deepStrictEqual(instance.update("JS").hashHex(), "0A8C0297");
});
Deno.test("Direct 9", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("\u2603").hashHex(), "045C01FE");
});
Deno.test("Direct 10", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("\u0003").hashHex(), "00040004");
});
Deno.test("Direct 11", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("\u0000").hashHex(), "00010001");
});
Deno.test("Direct 12", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("あいうえお").hashHex(), "4E340993");
});
Deno.test("Direct 13", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("abc").hashHex(), "024D0127");
});
async function testerStream(filePath: string): Promise<void> {
	const sampleText = await Deno.readTextFile(filePath);
	const hashFromText = new Adler32(sampleText).hash();
	await using sampleFile = await Deno.open(filePath);
	const hashFromStream = (await new Adler32().updateFromStream(sampleFile.readable)).hash();
	deepStrictEqual(hashFromText, hashFromStream);
}
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./LICENSE.md");
});
Deno.test("Stream 2", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./README.md");
});
Deno.test("Stream 3", {
	permissions: {
		read: true
	}
}, async () => {
	await testerStream("./deno.jsonc");
});
