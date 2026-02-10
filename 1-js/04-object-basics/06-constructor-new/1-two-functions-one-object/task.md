importance: 2

---

# To funktioner – ét objekt

Er det muligt at skabe funktionerne `A` og `B`, så `new A() == new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

Hvis det er tilfældet, så giv et eksempel på deres kode.
