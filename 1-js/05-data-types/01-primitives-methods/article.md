# Metoder hos primitive typer

JavaScript tillader os at arbejde med primitive typer (strenge, tal osv.) som om de var objekter. De giver også metoder, der kan kaldes som sådanne. Vi vil studere dem om lidt, men først vil vi se, hvordan det fungerer, fordi primitive typer selvfølgelig ikke er objekter (og i det følgende vil vi gøre det endnu tydeligere).

Lad os se på de vigtigste forskelle mellem primitive typer og objekter.

En primitiv

- Er en værdi af en primitiv type.
- Der findes 7 primitive typer: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` og `undefined`.

Et objekt

- Kan gemme flere værdier som egenskaber.
- Kan oprettes med `{}`, for eksempel: `{name: "John", age: 30}`. Der findes andre slags objekter i JavaScript: funktioner er for eksempel objekter.

En af de bedste ting ved objekter er, at vi kan gemme en funktion som en af deres egenskaber.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hej med dig!");
  }
};

john.sayHi(); // Hej med dig!
```

Så her har vi lavet et objekt `john` med metoden `sayHi`.

Mange indbyggede objekter findes allerede, såsom dem der arbejder med datoer, fejl, HTML-elementer osv. De har forskellige egenskaber og metoder.

Men disse funktioner kommer med en pris!

Objekter er "tungere" end primitive værdier. De kræver flere ressourcer for at understøtte den interne mekanik.

## En primitiv som et objekt

Her er paradokset, som skaberen af JavaScript stod overfor:

- Der er mange ting, man gerne vil gøre med en primitiv, som en streng eller et tal. Det ville være fantastisk at kunne tilgå dem via metoder.
- Primitive værdier skal være så hurtige og lette som muligt.

Løsningen ser lidt akavet ud, men her er den:

1. Primitiver er stadig primitive. En enkelt værdi, som ønsket.
2. Sproget tillader adgang til metoder og egenskaber for strenge, tal, booleans og symboler.
3. For at det kan fungere, oprettes der et særligt "objekt-wrapper", der giver den ekstra funktionalitet, og som derefter ødelægges.

"Objekt-wrapperne" er forskellige for hver primitiv type og kaldes: `String`, `Number`, `Boolean`, `Symbol` og `BigInt`. Dermed giver de forskellige sæt af metoder.

For eksempel findes der en strengmetode [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), der returnerer en kapitaliseret `str`.

Sådan fungerer det:

```js run
let str = "Hej";

alert( str.toUpperCase() ); // HEJ
```

Simpelt, ikke? Her er hvad der faktisk sker i `str.toUpperCase()`:

1. Strengen `str` er en primitiv. Så i det øjeblik, hvor dens egenskab tilgås, oprettes der et særligt objekt, der kender værdien af strengen og har nyttige metoder, som `toUpperCase()`.
2. Den metode kører og returnerer en ny streng (vist af `alert`).
3. Det særlige objekt ødelægges, og den primitive `str` forbliver uændret.

Så primitive typer kan give metoder, men de forbliver stadig lette.

JavaScript-motoren optimerer denne proces kraftigt. Den kan endda helt springe oprettelsen af det ekstra objekt over. Men den skal stadig overholde specifikationen og opføre sig, som om den opretter et.

Et tal har sine egne metoder, for eksempel runder [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) tallet til den givne præcision:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Vi vil se flere specifikke metoder i kapitlerne <info:number> og <info:string>.


````warn header="Konstruktører `String/Number/Boolean` er kun til intern brug"
Nogle sprog som Java tillader os eksplicit at oprette "wrapper-objekter" for primitive værdier ved at bruge en syntaks som `new Number(1)` eller `new Boolean(false)`.

I JavaScript er det også muligt af historiske årsager, men det er stærkt **ikke anbefalet**. Tingene kan gå galt flere steder.

For eksempel:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

Objekter er altid "truthy" i `if`, så her vil alerten blive vist:

```js run
let zero = new Number(0);

if (zero) { // zero er true, fordi det er et objekt
  alert( "zero er truthy!?!" );
}
```

På den anden side er det helt fint og nyttigt at bruge de samme funktioner `String/Number/Boolean` uden `new`. De konverterer en værdi til den tilsvarende type: til en streng, et tal eller en boolean (primitiv).

For eksempel er dette helt gyldigt:

```js
let num = Number("123"); // convert a string to number
```
````


````warn header="null/undefined har ingen metoder"
De specielle primitive værdier `null` og `undefined` er undtagelser. De har ingen tilsvarende "wrapper-objekter" og giver ingen metoder. På en måde er de "de mest primitive".

Et forsøg på at tilgå en egenskab af en sådan værdi vil give en fejl:

```js run
alert(null.test); // fejl
````

## Opsummering

- Primitiver undtagen `null` og `undefined` giver mange nyttige metoder. Vi vil studere dem i de kommende kapitler.
- Formelt set fungerer disse metoder via midlertidige objekter, men JavaScript-motorer er godt optimerede til at håndtere det internt, så de er ikke dyre at kalde.
