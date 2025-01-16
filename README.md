# Adler32 (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/adler32-es](https://img.shields.io/github/v/release/hugoalh/adler32-es?label=hugoalh/adler32-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/adler32-es")](https://github.com/hugoalh/adler32-es)
[![JSR: @hugoalh/adler32](https://img.shields.io/jsr/v/@hugoalh/adler32?label=@hugoalh/adler32&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/adler32")](https://jsr.io/@hugoalh/adler32)
[![NPM: @hugoalh/adler32](https://img.shields.io/npm/v/@hugoalh/adler32?label=@hugoalh/adler32&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/adler32")](https://www.npmjs.com/package/@hugoalh/adler32)

An ES (JavaScript & TypeScript) CLI and module to get the checksum of the data with algorithm Adler32.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/adler32-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/adler32[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/adler32[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

- File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
  - *Resources* (Optional)

## 🧩 APIs

- ```ts
  class Adler32 {
    constructor(data?: Adler32AcceptDataType);
    freeze(): this;
    get freezed(): boolean;
    hash(): bigint;
    hashBase16(): string;
    hashBase32Hex(): string;
    hashBase36(): string;
    hashBigInt(): bigint;
    hashHex(): string;
    hashHexPadding(): string;
    hashNumber(): number;
    update(data: Adler32AcceptDataType): this;
    static fromStream(stream: ReadableStream<Adler32AcceptDataType>): Promise<Adler32>;
  }
  ```
- ```ts
  type Adler32AcceptDataType = string | BigUint64Array | Uint8Array | Uint16Array | Uint32Array;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/adler32)

## 🧩 CLIs

**Entrypoint:** `cli.js`/`cli.ts`

- From argument; Output hex padding
  ```ps1
  adler32 {Data}
  ```
- From file; Output hex padding
  ```ps1
  adler32 --file {FilePath}
  ```
- From stdin; Output hex padding
  ```ps1
  adler32 --stdin
  ```

## ✍️ Examples

- ```ts
  new Adler32("Wikipedia").hashHexPadding();
  //=> "11E60398"
  ```
