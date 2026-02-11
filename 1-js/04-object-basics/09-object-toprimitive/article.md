
# Konvertering fra objekt til primitiv

Hvad sker der når objekter lægges sammen `obj1 + obj2`, trækkes fra hinanden `obj1 - obj2` eller udskrives med `alert(obj)`?

JavaScript tillader ikke, at man tilpasser, hvordan operatorer fungerer på objekter. I modsætning til nogle andre programmeringssprog, såsom Ruby eller C++, kan vi ikke implementere en særlig objektmetode til at håndtere addition (eller andre operatorer).

I tilfælde af sådanne operationer konverteres objekter automatisk til primitivtyper, og derefter udføres operationen på disse primitive værdier, hvilket resulterer i en primitiv værdi.

Dette er en vigtig begrænsning: resultatet af `obj1 + obj2` (eller en anden matematisk operation) kan ikke være et andet objekt!

For eksempel kan vi ikke lave objekter, der repræsenterer vektorer eller matricer (eller præstationer eller hvad som helst), lægge dem sammen og forvente et "summeret" objekt som resultat. Sådanne arkitektoniske bedrifter er automatisk "smidt af bordet".

Så, fordi vi teknisk set ikke kan gøre meget her, er der ingen matematik med objekter i udviklede projekter. Hvis det sker, med sjældne undtagelser, er det på grund af en kodningsfejl.

I dette kapitel vil vi dække, hvordan et objekt konverteres til en primitiv værdi, og hvordan man kan tilpasse det.

Vi har to formål:

1. Det vil give os mulighed for at forstå, hvad der sker i tilfælde af kodningsfejl, når en sådan operation sker ved et uheld.
2. Der er undtagelser, hvor sådanne operationer er mulige og ser godt ud. F.eks. subtraktion eller sammenligning af datoer (`Date` objekter). Vi vil støde på dem senere.

## Regler for konvertering

I kapitlet <info:type-conversions> har vi set reglerne for numeriske, string- og boolean-konverteringer af primitive værdier. Men vi efterlod et hul for objekter. Nu, hvor vi kender til metoder og symboler, bliver det muligt at udfylde det.

1. Der er ingen konvertering til boolean. Alle objekter er `true` i en boolean-kontekst, så enkelt er det. Der findes kun numeriske og string-konverteringer.
2. Den numeriske konvertering sker, når vi trækker objekter fra hinanden eller anvender matematiske funktioner. For eksempel kan `Date`-objekter (som vil blive dækket i kapitlet <info:date>) trækkes fra hinanden, og resultatet af `date1 - date2` er tidsforskellen mellem to datoer.
3. Hvad angår string-konvertering -- det sker normalt, når vi udskriver et objekt med `alert(obj)` og i lignende kontekster.

Vi kan implementere string- og numerisk konvertering selv ved hjælp af specielle objektmetoder.

Lad os gå ind i de tekniske detaljer, fordi det er den eneste måde at dække emnet grundigt på.

## Hints

Hvordan beslutter JavaScript, hvilken konvertering der skal anvendes?

Der er tre variationer af typekonvertering, der sker i forskellige situationer. De kaldes "hints", som beskrevet i [specifikationen](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: For en objekt-til-string konvertering, når vi udfører en operation på et objekt, der forventer en string, som `alert`:

    ```js
    // output
    alert(obj);

    // bruger objekt som en egenskabsnøgle
    anotherObj[obj] = 123;
    ```

`"number"`
: For en objekt-til-number konvertering, når vi udfører matematiske operationer:

    ```js
    // eksplicit konvertering
    let num = Number(obj);

    // matematik (undtagen binær plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // mindre/større sammenligning
    let greater = user1 > user2;
    ```

    De fleste indbyggede matematiske funktioner inkluderer også sådan en konvertering.

`"default"`
: Opstår i sjældne tilfælde, når operatoren "ikke er sikker" på, hvilken type der forventes.

    For eksempel kan binær plus `+` både arbejde med strenge (sammenkæder dem) og tal (adderer dem). Så hvis en binær plus får et objekt som argument, bruger den `"default"` hintet til at konvertere det.

    Altså, hvis et objekt sammenlignes med `==` med en streng, et tal eller et symbol, er det også uklart, hvilken konvertering der skal udføres, så `"default"` hintet bruges.

    ```js
    // binær plus bruger "default" hintet
    let total = obj1 + obj2;

    // obj == number bruger "default" hintet
    if (user == 1) { ... };
    ```

    Større og mindre sammenligningsoperatorer, såsom `<` `>`, kan også arbejde med både strenge og tal. Alligevel bruger de `"number"` hintet, ikke `"default"`. Det er af historiske årsager.

I praksis er tingene dog lidt enklere.

Alle indbyggede objekter undtagen én sag (`Date` objektet, vi vil lære det senere) implementerer `"default"` konvertering på samme måde som `"number"`. Og det bør vi sandsynligvis også gøre.

Det er dog stadig vigtigt at kende til alle 3 hints, snart vil vi se hvorfor.

**For at udføre konverteringen prøver JavaScript at finde og kalde tre objektmetoder:**

1. Kald `obj[Symbol.toPrimitive](hint)` - metoden med det symbolske nøgle `Symbol.toPrimitive` (systemsymbol), hvis en sådan metode findes,
2. Ellers, hvis hint er `"string"`
    - prøv at kalde `obj.toString()` eller `obj.valueOf()`, alt efter hvad der findes.
3. Ellers, hvis hint er `"number"` eller `"default"`
    - prøv at kalde `obj.valueOf()` eller `obj.toString()`, alt efter hvad der findes.

## Symbol.toPrimitive

Lad os starte med den første metode. Der er et indbygget symbol kaldet `Symbol.toPrimitive`, som skal bruges til at navngive konverteringsmetoden, som dette:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // her går koden til at konvertere dette objekt til en primitiv værdi
  // det skal returnere en primitiv værdi
  // hint = en af "string", "number", "default"
};
```

Hvis metoden `Symbol.toPrimitive` findes, bruges den til alle hints, og ingen flere metoder er nødvendige.

For eksempel, her implementerer `user` objektet det:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// Konverteringsdemo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

Som vi kan se fra koden, bliver `user` til en selvbeskrivende streng eller et pengebeløb, afhængigt af konverteringen. Den enkelte metode `user[Symbol.toPrimitive]` håndterer alle konverteringstilfælde.

## toString/valueOf

Hvis der ikke findes `Symbol.toPrimitive`, forsøger JavaScript at finde metoderne `toString` og `valueOf`:

- For et `"string"` hint: kald `toString` metoden, og hvis den ikke findes eller hvis den returnerer et objekt i stedet for en primitiv værdi, så kald `valueOf` (så `toString` har prioritet for strengkonverteringer).
- For andre hints: kald `valueOf`, og hvis den ikke findes eller hvis den returnerer et objekt i stedet for en primitiv værdi, så kald `toString` (så `valueOf` har prioritet for matematik).

Metoderne `toString` og `valueOf` stammer fra gamle dage. De er ikke symboler (symboler eksisterede ikke for så længe siden), men snarere "almindelige" metoder med strengnavne. De giver en alternativ "gammeldags" måde at implementere konverteringen på.

Disse metoder skal returnere en primitiv værdi. Hvis `toString` eller `valueOf` returnerer et objekt, ignoreres det (som om metoden ikke fandtes).

Som standard har et almindeligt objekt følgende `toString` og `valueOf` metoder:

- `toString` metoden returnerer en streng `"[object Object]"`.
- `valueOf` metoden returnerer objektet selv.

Her er en demo:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

Så hvis vi prøver at bruge et objekt som en streng, som i en `alert` eller lignende, så ser vi som standard `[object Object]`.

Standard `valueOf` er nævnt her kun for fuldstændighedens skyld, for at undgå forvirring. Som du kan se, returnerer den objektet selv, og derfor ignoreres det. Spørg mig ikke hvorfor - det er af historiske årsager. Så vi kan antage, at det ikke eksisterer.

Lad os implementere disse metoder for at tilpasse konverteringen.

For eksempel gør `user` det samme som ovenfor ved hjælp af en kombination af `toString` og `valueOf` i stedet for `Symbol.toPrimitive`:

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" eller "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Som vi kan se er adfærden den samme som i det tidligere eksempel med `Symbol.toPrimitive`.

Ofte ønsker vi et enkelt "catch-all" sted at håndtere alle primitive konverteringer. I dette tilfælde kan vi implementere kun `toString`, sådan her:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

Ved fraværet af `Symbol.toPrimitive` og `valueOf` vil `toString` håndtere alle primitive konverteringer.

### En konvertering kan returnere enhver primitiv type

Det vigtige at vide om alle primitive-konverteringsmetoder er, at de ikke nødvendigvis returnerer den "angivne" primitive.

Der er ingen kontrol over, om `toString` returnerer præcis en streng, eller om `Symbol.toPrimitive`-metoden returnerer et tal for hintet `"number"`.

Det eneste obligatoriske: disse metoder skal returnere en primitiv, ikke et objekt.

```smart header="Historiske noter"
Af historiske årsager, hvis `toString` eller `valueOf` returnerer et objekt, opstår der ingen fejl, men en sådan værdi ignoreres (som om metoden ikke eksisterede). Det skyldes, at der i gamle dage ikke fandtes et godt "fejl"-begreb i JavaScript.

Til sammenligning er `Symbol.toPrimitive` strengere, den *skal* returnere en primitiv, ellers opstår der en fejl.
```

## Yderligere konverteringer

Som vi allerede ved, udfører mange operatorer og funktioner typekonverteringer, f.eks. konverterer multiplikation `*` operander til tal.

Hvis vi sender et objekt som argument, er der to trin i beregningerne:
1. Objektet konverteres til en primitiv (ved hjælp af reglerne beskrevet ovenfor).
2. Hvis det er nødvendigt for yderligere beregninger, konverteres den resulterende primitiv også.

For eksempel:

```js run
let obj = {
  // toString håndterer alle konverteringer i fraværet af andre metoder
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, objekt konverteret til primitiv "2", derefter multiplikation gjorde det til et tal
```

1. Multiplikationen `obj * 2` konverterer først objektet til en primitiv (det er en streng `"2"`).
2. Derefter bliver `"2" * 2` til `2 * 2` (strengen konverteres til et tal).

Binær plus vil sammenkæde strenge i samme situation, da den gerne accepterer en streng:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // "22" ("2" + 2), konvertering til primitiv returnerede en streng => sammenkædning
```

## Opsummering

Objekt-til-primitiv konvertering kaldes automatisk af mange indbyggede funktioner og operatorer, der forventer en primitiv som værdi.

Der er 3 typer (hints) af den:
- `"string"` (for `alert` og andre operationer, der har brug for en streng)
- `"number"` (for matematiske operationer)
- `"default"` (få operatorer, normalt implementerer objekter det på samme måde som `"number"`)

Specifikationen beskriver eksplicit, hvilken operator der bruger hvilket hint.

Konverteringsalgoritmen er:

1. Kald `obj[Symbol.toPrimitive](hint)`, hvis metoden findes,
2. Ellers, hvis hint er `"string"`
    - prøv at kalde `obj.toString()` eller `obj.valueOf()`, hvad der end findes.
3. Ellers, hvis hint er `"number"` eller `"default"`
    - prøv at kalde `obj.valueOf()` eller `obj.toString()`, hvad der end findes.

Alle disse metoder skal returnere en primitiv for at fungere (hvis defineret).

I praksis er det ofte nok kun at implementere `obj.toString()` som en "catch-all" metode for strengkonverteringer, der skal returnere en "menneskeligt læsbar" repræsentation af et objekt, til logging eller debugging formål.
