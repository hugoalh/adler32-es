# Adler32 (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/adler32-es](https://img.shields.io/github/v/release/hugoalh/adler32-es?label=hugoalh/adler32-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/adler32-es")](https://github.com/hugoalh/adler32-es)
[![JSR: @hugoalh/adler32](https://img.shields.io/jsr/v/@hugoalh/adler32?label=@hugoalh/adler32&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/adler32")](https://jsr.io/@hugoalh/adler32)
[![NPM: @hugoalh/adler32](https://img.shields.io/npm/v/@hugoalh/adler32?label=@hugoalh/adler32&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/adler32")](https://www.npmjs.com/package/@hugoalh/adler32)

An ECMAScript module to get the checksum of the data with algorithm Adler32.

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/adler32-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/adler32[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/adler32[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  class Adler32 {
    constructor(data?: Adler32AcceptDataType);
    get freezed(): boolean;
    freeze(): this;
    hash(): Uint8Array;
    hashHex(): string;
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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/adler32)

## ✍️ Examples

- ```ts
  new Adler32("Wikipedia").hashHex();
  //=> "11E60398"
  ```
