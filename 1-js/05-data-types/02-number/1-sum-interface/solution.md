

```js run demo
let a = +prompt("Det første tal?", "");
let b = +prompt("Det andet tal?", "");

alert( a + b );
```

Bemærk det unære plus `+` før `prompt`. Det konverterer straks værdien til et tal.

Ellers ville `a` og `b` være strenge, og deres sum ville være deres sammenkædning, det vil sige: `"1" + "2" = "12"`.