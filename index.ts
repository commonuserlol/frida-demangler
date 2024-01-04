namespace Demangler {
    type StringOrStringArray = string | string[];
    const _demangle = new NativeFunction(Module.getExportByName(null, "__cxa_demangle"), "pointer", ["pointer", "pointer", "pointer", "pointer"]);

    /** Demangle single symbol */
    export function demangle(mangled: string, intSize?: number): string;
    /** Demangle array of symbols */
    export function demangle(mangled: string[], intSize?: number): string[];
    /** @internal */
    export function demangle(mangled: StringOrStringArray, intSize: number = 4): StringOrStringArray {
        const isSingle = typeof mangled == "string";
        
        const status = Memory.alloc(intSize);
        status.writeInt(0);

        if (isSingle) {
            const result = _demangle(Memory.allocUtf8String(mangled), NULL, NULL, status);
            if (status.readInt() != 0)
                throw new Error(`Failed to demangle the symbol ${mangled}`);

            return result.readCString()!;
        }
        else {
            return mangled.map(element => {
                const result = _demangle(Memory.allocUtf8String(element), NULL, NULL, status);
                if (status.readInt() != 0)
                    throw new Error(`Failed to demangle the symbol ${element}`);

                return result.readCString()!;
            });
        }
    }
}

globalThis.Demangler = Demangler;