import { deepStrictEqual } from "node:assert";
import { Adler32 } from "./mod.ts";
Deno.test("Text 1", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("").hashHexPadding(), "00000001");
});
Deno.test("Text 2", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("GitHub").hashHexPadding(), "07B10244");
});
Deno.test("Text 3", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("Wikipedia").hashHexPadding(), "11E60398");
});
Deno.test("Text 4", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32("✔️❌").hashHexPadding(), "20C10654");
});
Deno.test("Text 5", { permissions: "none" }, () => {
	const sample = "foo bar baz٪☃🍣";
	const instance = new Adler32();
	deepStrictEqual(instance.update(sample).hash(), 1543572022n);
	deepStrictEqual(instance.update(sample).hash(), 2218071147n);
	deepStrictEqual(instance.update(sample).hash(), 2023497376n);
});
Deno.test("Text 6", { permissions: "none" }, () => {
	deepStrictEqual(new Adler32(`Aliquam et at at invidunt in. Dolore labore justo ea diam. Labore kasd labore et justo vulputate suscipit soluta eum lorem vel magna gubergren ut qui magna. Diam tempor luptatum et takimata consetetur sit aliquam dolor lorem exerci aliquyam duis. Et sed delenit sea et magna eirmod takimata sit euismod sit. Et dolor consetetur dolor aliquyam duo erat. Dolor et clita takimata sadipscing dolores volutpat ut voluptua. Sit et justo laoreet sed sed sit et vel sit kasd et accumsan tempor te dolor sed. Eu ut diam diam amet elitr labore et sed accusam ea dolores ipsum lorem magna. Nonummy diam liber takimata invidunt diam stet rebum dolores erat. Consetetur luptatum at congue at eirmod aliquyam tempor diam sadipscing dolor eos. At gubergren stet euismod dolores dolores dolor hendrerit eirmod et erat aliquip nonummy dolor dolores elitr. Voluptua eos dolor nobis takimata blandit lorem in nonumy erat sanctus ex elitr te. Dolores erat labore voluptua tincidunt vero.

Eirmod et sanctus imperdiet veniam sadipscing rebum tempor consetetur amet. Dolores iusto est in justo quis feugait duis sit esse. Ut sit nulla nulla sit dolore justo sea consequat amet dolor dolor vulputate feugiat amet eos. Ipsum iriure elitr clita accumsan ullamcorper feugait diam feugiat vel et ut. Tation dolores sed no ut gubergren. Ut sed voluptua duo lobortis tempor lobortis in amet dolores stet qui in stet sit amet iriure stet. Exerci illum cum sanctus eleifend ex vero et te stet nostrud erat duis laoreet ipsum eos hendrerit ut.

Et ipsum nonumy kasd facilisis et rebum dolor diam liber dolor et nulla. Ut duo ex ut consetetur dolore illum suscipit sadipscing voluptua odio tation dolor consetetur sit dolor sed et justo. Quis ullamcorper ad.

Sadipscing est voluptua rebum sanctus doming nulla duis et sanctus tempor eos tation takimata. Sit kasd no stet at sed eos justo dolore nulla. Et dolor in erat stet lorem nulla takimata nobis nibh est elitr eirmod aliquyam sed. Stet eirmod aliquyam at et. Sadipscing sed blandit ipsum consequat. Accusam aliquip invidunt at ad vero voluptua dolores accusam.`).hashHexPadding(), "75F000A9");
});
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	const sampleFilePath = "./README.md";
	const sampleText = await Deno.readTextFile(sampleFilePath);
	const hashFromText = new Adler32(sampleText).hash();
	await using sampleFile = await Deno.open(sampleFilePath);
	const hashFromStream = (await new Adler32().updateFromStream(sampleFile.readable)).hash();
	deepStrictEqual(hashFromText, hashFromStream);
});
