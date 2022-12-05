# Konvertering mellem datatyper

For det meste vil operatorer og funktioner automatisk konvertere værdier de modtager til den rigtige datatype.

For eksempel vil `alert` automatisk konvertere alle værdier til tekststrenge for at vise dem. Matematiske operationer vil konvertere værdier til tal.

Der er også situationer, hvor du behøver eksplicit at konvertere en værdi til en forventet type.

<<<<<<< HEAD
```smart header="Ikke et ord om objekter ... endnu"
I dette kapitel vil jeg ikke gennemgå objekter. For nu, vil jeg kun gennemgå primitiver.
=======
```smart header="Not talking about objects yet"
In this chapter, we won't cover objects. For now, we'll just be talking about primitives.
>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e

Senere, efter du har lært om objekter, i kapitlet <info:object-toprimitive> vil du lære, hvordan objekter passer ind.
```

## KOnvertering til string

Konvertering til tekststreng sker når du behøver at en værdi opfattes som en tekststreng.

For eksempel `alert(value)` gør det for at kunne vise værdien.

Du kan også kalde `String(value)` funktionen for at konvertere en værdi til en tekststreng:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // Er nu en tektstreng med værdien "true"
alert(typeof value); // string
*/!*
```

Konvertering til tekststreng er for det meste åbenlys. Booelan `false` bliver teksten `"false"`, `null` bliver `"null"`, etc.

## Konvertering til tal number

Konvertering til tal sker automatisk i matematiske funktioner og udtryk.

For eksempel, hvis division `/` udføres på ikke-tal:

```js run
alert( "6" / "2" ); // 3, tekststrengene konverteres til tal
```

Du kan bruge `Number(value)` funktionen til eksplicit at konvertere en værdi (`value`) til et tal.

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // bliver til tallet 123

alert(typeof num); // number
```

Eksplicit konvertering er normalt påkrævet når du læser værdier fra tekst-baserede kilder som tekstinput felter, men hvor du forventer at brugeren taster et tal.

Hvis strengen ikke er et gyldigt tal vil resultatet af en konvertering blive `NaN`. For eksempel:

```js run
let age = Number("en vilkårlig tekst i stedet for et tal");

alert(age); // NaN, konverteringen fejlede
```

Regler for konvertering af tal:

| Værdi |  bliver ... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
<<<<<<< HEAD
|<code>true&nbsp;og&nbsp;false</code> | `1` og `0` |
| `string` | mellemrum i starten og slutningen fjernes. Hvis det der er tilbage er tomt, bliver resultatet `0`. Ellers læses tallet fra tekststrengen. En fejl vil give `NaN`. |
=======
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043

Eksempler:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (fejler når der læses et tal med "z" i)
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Vær opmærksom på, at `null` og `undefined` opfører sig forskelligt her: `null` bliver til nul (0) og `undefined` bliver til `NaN`.

De fleste matematiske operatorer udfører denne konvertering - det vil du se i det næste kapitel.

## Konvertering af Boolean

Konvertering af Boolean er den mest simple.

Dette sker i logiske operationer (senere ser du det også i betingelser og andet) men du kan konvertere eksplicit ved et kald til `Boolean(value)`.

Regler for konvertering:

- Værdier der forstås som "tomme" som `0`, en tom tekststreng, `null`, `undefined`, og `NaN`, bliver `false`.
- Alt andet bliver `true`.

For eksempel:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hej!") ); // true
alert( Boolean("") ); // false
```

````warn header="Læg mærke til: en tekststreng med et nul `\"0\"` er `true`"
Nogle sprog (f.eks. PHP) behandler `"0"` som `false`. Men, i JavaScript er en ikke-tom tekststreng altid `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // Mellemrum, og true (alle ikke-tomme tekststrenge er true)
```
````

## Opsummering

De tre mest brugte konverteringer er til tekststreng, tal og boolean.

**`Konvertering til tekststreng`** -- sker når du skriver noget ud. Det kan også udføres med `String(value)`. Konverteringe er ret åbenlys for primitive værdier.

**`KOnvertering til tal`** -- Sker i matematiske operationer. Den kan også udføres med `Number(value)`.

Konverteringen følger disse regler:

| Værdi |  bliver ... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
<<<<<<< HEAD
|<code>true&nbsp;og&nbsp;false</code> | `1` og `0` |
| `string` | mellemrum i starten og slutningen fjernes. Hvis det der er tilbage er tomt, bliver resultatet `0`. Ellers læses tallet fra tekststrengen. En fejl vil give `NaN`. |
=======
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | The string is read "as is", whitespaces (includes spaces, tabs `\t`, newlines `\n` etc.) from both sides are ignored. An empty string becomes `0`. An error gives `NaN`. |
>>>>>>> 1ce5644a15ee141fbe78c0fb79c8f40d870d7043

**`Konvertering af Boolean`** -- Sker i logiske operationer. Kan også udføres med `Boolean(value)`.

Følger disse regler:

| Værdi |  bliver ... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|alle andre værdier| `true` |


De fleste af disse regler er nemme at huske. De bemærkelsesværdige, og der hvor folk normal laver fejl, er::

- `undefined` er `NaN` som tal , ikke `0`.
- `"0"` og en tekststreng med ene mellemrum, som `"   "` er true som boolean.

Objects er ikke dækket her. Jeg vender tilbage til dem senere i kapitlet <info:object-toprimitive> der er afsat eksklusivt til objerkter. Det er efter vi har været gennem det mere grundlæggende af JavaScript.
