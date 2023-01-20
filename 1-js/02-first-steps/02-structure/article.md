# Kodens struktur

Den første ting du skal lære er byggestenene for kode.

## Udsagn (statements)

Et udsagn er en syntakskonstruktion eller kommando der udfører en handling.

Du har allerede set et udsagn, `alert('Hello, world!')`, der viste meddelelsen "Hello, world!".

Du kan have så mange udsagn du vil i din kode. Udsagn adskilles af et semikolon (;)

Dette eksempel splitter "Hello World" op i to advarsler:

```js run no-beautify
alert('Hello'); alert('World');
```

Normal skrives udsagn på hver sin linje for at gøre koden mere læsbar:

```js run no-beautify
alert('Hello');
alert('World');
```

## Semikolon

Et semikolon kan i de fleste tilfælde udelades, hvis der er et linjeskift.

Dette vil også virke:

```js run no-beautify
alert('Hello')
alert('World')
```

Her fortolker JavaScript linjeskiftet som et implicit semikolon. Dette kaldes en [automatisk semikolon indsættelse](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**I de fleste tilfælde vil et linjeskift forstås som et semikolon. Men "i de fleste tilfælde" betyder ikke "altid!"**

Der er tilfælde, hvor et linjeskift ikke betyder semikolon. For eksempel:

```js run no-beautify
alert(3 +
1
+ 2);
```

Koden viser `6` fordi JavaScript ikke indsætter et semikolon her. Det er intuitivt åbenlyst at, hvis en linje ender med et plus `"+"`, så er det et "ufuldstændigt udtryk", så et semikolon er ikke påkrævet. I dette tilfælde virker det som forventet.

**Men, der er situationer hvor JavaScript "fejler" med at regne ud om der virkelig er behov for et semikolon.**

Fejl der opstår på denne måde kan være svære at finde og rette.

````smart header="Et ekempel på en fejl"
Hvis du er nysgerrig efter et konkret eksempel på sådan en fejl, så prøv denne kode:

```js run
alert("Hello");

[1, 2].forEach(alert);
```
````
Tænk ikke for meget på de hårde paranteser `[]` og `forEach` endnu. Dem lærer du om senere. For nu, så tænk bare, at denne kode vil vise en dialogboks med tallet `1` efterfulgt af tallet `2`.

Prøv nu, at tilføje en `alert` før den anden kode og lad være med at afslutte med semikolon:

```js run no-beautify
alert("Nu vil der ske en fejl")
```

Nu vil den første popup vise sig og bagefter vil konsollen melde fejl.

Men, alt vil virke fint, hvis du sætter et semikolon efter `alert`:
```js run
alert("Alt er fint nu");
```
Nu vil du se teksten "Alt er fint nu" efterfulgt af `1` and `2`.

Forskellen på de to koder ligger altså kun i det den ene karakter (semikolon) i slutningen af den første linje

Hvis du afvikler denne kode vil den første `Hello` popup vise sig for derefter at melde en fejl i konsollen (Du kan være nødt til at åbne konsollen for at se det). Der er ingen popup med tallene mere.

Fejlen her opstår fordi JavaScript ikke forventer et semikolon før hårde paranteser `[...]`.

Så, fordi semikolon ikke sættes ind automatisk vil det blive opfattet som ét langt udsagn. Her er hvordan motoren ser det:

```js run no-beautify
alert("Nu vil der ske en fejl")[1, 2].forEach(alert)
```

Men det burde være to seperate udsagn og ikke ét. Sådan en sammentrækning er forkert og derfor melder JavaScript fejl. Denne type fejl kan også ske i andre sammenhænge.

Jeg anbefaler at du sætter semikolon mellem udsagn - også selvom de bliver adskilt af linjeskift. Så, opsummeret -- *det er muligt* at udelade semikolon i de fleste tilfælde. Men det er sikre -- specielt for en begynder -- at bruge dem.

## Kommentarer

Som tiden går og programmer bliver mere og mere komplekse, er det nødvendigt at tilføje *kommentarer* der beskriver hvad koden gør og hvorfor.

Kommentarer kan puttes ind alle steder i et script. De påvirker ikke afviklingen af koden fordi JavaScript-motoren ganske enkelt ignorerer dem.

**Enkeltlinjeskommentar starter med for skråstreger `//`.**

Resten af linjen vil være en kommentar. Den kan stå på en linje for sig selv eller stå efter et udsagn.

Som her:
```js run
// Denne kommentar står på sin egen linje
alert('Hello');

alert('World'); // Denne kommentar står efter et udsagn
```

**Flerlinjeskommenter starter med en skråstreg og en stjerne <code>/&#42;</code> og slutter med en stjerne og en skråstreg <code>&#42;/</code>.**

Som her:

```js run
/* Et eksempel med to beskeder.
Dette er en kommenatar over flere linjer.
*/
alert('Hello');
alert('World');
```

Indholdet af kommentarer ignoreres, så hvis du putter kode ind <code>/&#42; ... &#42;/</code> vil det ikke blive afviklet.

Nogle gange kan det være praktisk, hvis du vil deaktivere dele af din kode:

```js run
/* Kommenterer noget kode ud
alert('Hello');
*/
alert('World');
```

```smart header="Brug genvejstaster!"
I de fleste editorer kan du kommentere kode ud ved at trykke genvejstasten `key:Ctrl+/` for en enkelt linje og noget i stil med `key:Ctrl+Shift+/` -- for flere linjer (marker linjer med kode og tryk genvejskombinationen). For Mac, prøv `key:Cmd` i stedet for `key:Ctrl` og `key:Option` i stedet for `key:Shift`. Det danske tastaturlayout har ikke nem tilgang til skråstreg som genvej. Derfor har editorer som f.eks. VSCode genvejen `key:Ctrl+'`
```

````warn header="Indlejrede kommentarer er ikke understøttet!"
Du kan ikke have `/*...*/` inde i et andet sæt `/*...*/`.

Sådan en kode vil resultere i en fejl:

```js run no-beautify
/*
  /* Indlejret kommentar ?!? */
*/
alert( 'World' );
```
````

Husk, at kommenter din kode.

Kommentarer øger størrelsen på koden, men det er ikke et problem. Der findes mange værktøjer til at minimere din kode før den endeligt sendes til en produktionsserver. Det vil fjerne alle kommentarer, så de ikke er med i det endelige script. Derfor har kommentarer ikke nogen negativ effekt på den endelige kode.

Senere i tutorialen vil du læse et kapitel <info:code-quality> der forklarer, hvordan du skriver bedre kommentarer.
