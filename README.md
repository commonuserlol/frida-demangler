# frida-demangler
As you (probably) know, in C++, symbols are mangled. This project will allow you to demangle back using the GCC ABI.

# OS support
* Linux - OK
* Android - OK
* Windows - Fail (no `__cxa_demangle` symbol, use LLVM demangler instead)
* iOS/MacOS - Wasn't tested

# Usage
Invoke `Demangler.demangle` with string or array of strings, example:
```typescript
console.log(Demangler.demangle("_ZNK3MapI10StringName3RefI8GDScriptE10ComparatorIS0_E16DefaultAllocatorE3hasERKS0_"));

console.log(Demangler.demangle(["_ZN9wikipedia7article6formatEv", "_ZN9wikipedia7article8print_toERSo", "_ZN9wikipedia7article8wikilinkC1ERKSs"]));
```
Second argument of `demangle` is `number` (int) and represents how many bytes needed for `int32`. Defaults to `4`.

# Acknowledgments
[Wikipedia article](https://en.wikipedia.org/wiki/Name_mangling) - example how to demangle symbols with GCC ABI (`__cxa_demangle`) and mangled symbols examples.