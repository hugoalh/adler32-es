import { invokeDenoNodeJSTransformer } from "DNT";
import jsrManifest from "./jsr.jsonc" with { type: "json" };
await invokeDenoNodeJSTransformer({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	entrypointsScript: jsrManifest.exports,
	generateDeclarationMap: true,
	metadata: {
		name: jsrManifest.name,
		version: jsrManifest.version,
		description: "A module to get the checksum of the data with algorithm Adler32.",
		keywords: [
			"adler32",
			"checksum"
		],
		homepage: "https://github.com/hugoalh/adler32-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/adler32-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/adler32-es.git"
		},
		scripts: {
		},
		engines: {
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm",
	outputDirectoryPreEmpty: true
});
