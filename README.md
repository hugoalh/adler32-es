# Adler32 (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/adler32-es](https://img.shields.io/github/v/release/hugoalh/adler32-es?label=hugoalh/adler32-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/adler32-es")](https://github.com/hugoalh/adler32-es)
[![JSR: @hugoalh/adler32](https://img.shields.io/jsr/v/@hugoalh/adler32?label=@hugoalh/adler32&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/adler32")](https://jsr.io/@hugoalh/adler32)
[![NPM: @hugoalh/adler32](https://img.shields.io/npm/v/@hugoalh/adler32?label=@hugoalh/adler32&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/adler32")](https://www.npmjs.com/package/@hugoalh/adler32)

An ECMAScript (JavaScript & TypeScript) module to get the checksum of the data with algorithm Adler32.

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

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

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  class Adler32 {
    constructor(data?: Adler32AcceptDataType);
    get freezed(): boolean;
    freeze(): this;
    hash(): Uint8Array;
    hashHex(): string;
    hashUint8Array(): Uint8Array;
    update(data: Adler32AcceptDataType): this;
    updateFromStream(stream: ReadableStream<Adler32AcceptDataType>): Promise<this>;
  }
  ```
- ```ts
  type Adler32AcceptDataType =
    | string
    | BigUint64Array
    | Uint8Array
    | Uint16Array
    | Uint32Array;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/adler32)

## ✍️ Examples

- ```ts
  new Adler32("Wikipedia").hashHex();
  //=> "11E60398"
  ```
