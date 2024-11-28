import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: [
		...configJSR.getExports(),
		{
			executable: true,
			name: "adler32",
			path: "./cli.ts"
		}
	],
	fixInjectedImports: true,
	generateDeclarationMap: true,
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
		description: "A CLI and module to get the checksum of the data with algorithm Adler32.",
		keywords: [
			"adler32"
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
			node: ">=16.13.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "npm",
	outputDirectoryPreEmpty: true
});
