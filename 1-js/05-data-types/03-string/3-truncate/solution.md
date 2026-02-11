Den maksimale længde skal være `maxlength`, så vi er nødt til at skære den lidt kortere for at give plads til ellipsen (…).

Bemærk, at der faktisk er et enkelt Unicode-tegn for en ellipsis. Det er ikke tre prikker.

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
