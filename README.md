# Adler32 (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[DistBoard @hugoalh](https://hugoalh.github.io/distboard/adler32_ecmascript)
● [GitHub](https://github.com/hugoalh/adler32-es)
● [JSR](https://jsr.io/@hugoalh/adler32)
● [NPM](https://www.npmjs.com/package/@hugoalh/adler32)

An ECMAScript module to get the checksum of the data with algorithm Adler32.

## 🎯 Runtime Targets

Any runtime which support ECMAScript should able to use this; These runtimes are officially supported:

- **[Bun](https://bun.sh/)** >= v1.1.0
- **[Deno](https://deno.land/)** >= v2.1.0
- **[NodeJS](https://nodejs.org/)** >= v20.9.0

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources & Entrypoints

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

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |
| `./cli` | `./cli.ts` | CLI. |

> [!NOTE]
> - Different runtimes have vary support for the sources and entrypoints, visit the runtime documentation for more information.
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

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

## 🧩 CLIs

- ```powershell
  adler32 $Context
  ```
- ```powershell
  adler32 --file $FilePath
  <# 🔀 Unordered Positions: `--file`, `$FilePath` #>
  ```
- ```powershell
  adler32 --stdin
  ```

## ✍️ Examples

- ```ts
  new Adler32("Wikipedia").hashHex();
  //=> "11E60398"
  ```
- ```powershell
  adler32 'Wikipedia'
  ```
