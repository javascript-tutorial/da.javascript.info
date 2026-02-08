Svaret er: først `1`, så `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Kaldet `alert` returnerer ikke en værdi. Med andre ord returnerer det `undefined`.

1. Den første OR `||` evaluerer sin venstre operand `alert(1)`. Det viser den første besked med `1`.
2. `alert` returnerer `undefined`, så OR går videre til den anden operand for at lede efter en sandfærdig værdi.
3. Den anden operand `2` er sandfærdig, så udførelsen stoppes, `2` returneres og vises derefter af den ydre alert.

Der vil ikke være nogen `3`, fordi evalueringen ikke når `alert(3)`.