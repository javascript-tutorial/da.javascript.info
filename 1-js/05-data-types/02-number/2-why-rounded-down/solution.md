Internt er decimalbrøken `6.35` en uendelig binær. Som altid i sådanne tilfælde gemmes den med et præcisionstab.

Lad os se:

```js run
alert( 6.35.toFixed(20) ); // 6.34999999999999964473
```

Præcisionstab kan forårsage både stigning og fald i et tal. I dette særlige tilfælde bliver tallet en smule mindre, derfor blev det afrundet nedad.

Og hvad med `1.35`?

```js run
alert( 1.35.toFixed(20) ); // 1.35000000000000008882
```

Her gjorde præcisionstabet tallet en smule større, så det blev afrundet opad.

**Hvordan kan vi løse problemet med `6.35`, hvis vi vil have det afrundet korrekt?**

Vi bør bringe det tættere på et helt tal før afrunding:

```js run
alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
```

Bemærk at `63.5` slet ikke har noget præcisionstab. Det skyldes, at decimaldelen `0.5` faktisk er `1/2`. Brøker divideret med potenser af `2` er nøjagtigt repræsenteret i det binære system, nu kan vi runde det korrekt:


```js run
alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(afrundet) -> 6.4
```

