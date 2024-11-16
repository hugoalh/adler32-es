import { assertEquals } from "STD/assert/equals";
import { Adler32 } from "./mod.ts";
Deno.test("1", { permissions: "none" }, () => {
	assertEquals(new Adler32().hashHexPadding(), "00000001");
});
Deno.test("2", { permissions: "none" }, () => {
	assertEquals(new Adler32("Wikipedia").hashHexPadding(), "11E60398");
});
Deno.test("3", { permissions: "none" }, () => {
	assertEquals(new Adler32("GitHub").hashHexPadding(), "07B10244");
});
Deno.test("4", { permissions: "none" }, () => {
	assertEquals(new Adler32("✔️❌").hashHexPadding(), "20C10654");
});
Deno.test("5", { permissions: "none" }, () => {
	const sample4 = "foo bar baz٪☃🍣";
	const instance = new Adler32();
	assertEquals(instance.update(sample4).hash(), 1543572022n);
	assertEquals(instance.update(sample4).hash(), 2218071147n);
	assertEquals(instance.update(sample4).hash(), 2023497376n);
});
