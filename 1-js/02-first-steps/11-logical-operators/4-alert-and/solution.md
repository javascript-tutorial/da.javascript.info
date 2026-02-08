Svaret er: `1`, og derefter `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Kaldet til `alert` returnerer `undefined` (det viser bare en besked, så der er ingen meningsfuld returværdi).

På grund af det evaluerer `&&` venstre operand (viser `1`), og stopper straks, fordi `undefined` er en falsy værdi. Og `&&` leder efter en falsy værdi og returnerer den, så det er færdigt.

