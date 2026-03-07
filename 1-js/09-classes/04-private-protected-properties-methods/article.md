
# Private og beskyttede egenskaber og metoder

En af de vigtigste principper i objektorienteret programmering -- adskil det interne interface fra det eksterne.

Det er en "skal opgave" når du udvikler noget mere komplekst end en "hello world" app.

For at forstå dette, lad os tage en pause fra programmering og rette vores blik mod det virkelige liv.

Ofte er de enheder, vi bruger, ganske komplekse. Men ved at adskille det interne interface fra det eksterne interface er det muligt at bruge dem uden problemer.

## Et eksempel fra det virkelige liv

Tag for eksempel en kaffemaskine. Simpel udenpå: en knap, et display, lidt huller ... og selvfølgelig -- en god kop kaffe! :)

![](coffee.jpg)

Men inden i ... (tag et billede fra reparation manualen for en kaffemaskine, og du vil se, hvor meget der skal samarbejde for at fungere korrekt).

![](coffee-inside.jpg)

En masse detaljer. Men vi kan bruge den uden at vide noget om det.

Kaffemaskiner er ret pålidelige, ikke? Vi kan bruge en i årevis, og kun hvis noget går galt -- så bringer vi den til reparation.

Hemmeligheden bag denne pålidelighed og enkelhed i en kaffemaskine er, at alle detaljer er veljusteret og *skjult* inde.

Hvis vi fjerner den beskyttende kappe fra kaffemaskinen, så vil det at bruge den være meget mere komplekst (hvor skal man trykke?), og farligt (den kan give stød).

Som vi vil se, er det at programmere objekter lidt ligesom kaffemaskiner.

Men for at skjule interne detaljer, vil vi bruge ikke en beskyttende kappe, men snarere speciel syntaks i sproget og konventioner.

## Internt og eksternt interface

I objektorienteret programmering er egenskaber og metoder opdelt i to grupper:

- *Internt interface* -- metoder og egenskaber, tilgængelige fra andre metoder i klassen, men ikke fra uden for klassen.
- *Eksternt interface* -- metoder og egenskaber, også tilgængelige fra uden for klassen.

Hvis vi fortsætter analogien med kaffemaskinen -- det, der er skjult inde: en varmepumpe, varmelegeme, og så videre -- er dens interne interface.

Det interne interface er nødvendigt for, at objektet kan fungere, og dets dele er forbundet til hinanden. For eksempel er en varmepumpe forbundet til varmelegemet.

Men udefra er en kaffemaskine lukket af den beskyttende kappe, så brugeren ikke kan nå "indmaden". Detaljerne er skjulte og utilgængelige. Vi kan bruge dens funktioner via det eksterne interface.

Så, alt hvad vi har brug for at bruge et objekt er at kende dets eksterne interface. Vi behøver ikke at vide, hvordan det fungerer inde, og det er godt.

Det var det overordnede billede.

I JavaScript er der to typer af egenskaber og metoder:

- Public: tilgængelige fra hvor som helst. De udgør det eksterne interface. Indtil nu har vi kun brugt offentlige egenskaber og metoder.
- Private: tilgængelige kun inde i klassen. Disse er det interne interface.

I mange andre sprog findes der også "beskyttede" (protected) felter : tilgængelige kun fra inde i klassen og de klasser, der udvider den (ligesom private, men med tilgang fra arvende klasser). De er også nyttige for det interne interface. De er i en vis forstand mere udbredt end private felter, fordi vi ofte vil have arvende klasser til at få adgang til dem.

Beskyttede felter er ikke implementeret i JavaScript på sprog-niveau, men i praksis er de meget praktiske, så de emuleres.

Nu vil vi lave en kaffemaskine i JavaScript med alle disse typer af egenskaber. En kaffemaskine har mange detaljer, vi vil ikke modellere dem for at blive simpel (selvom vi kunne).

## Beskytter "waterAmount"

Lad os først lave en simpel kaffemaskineklasse med to egenskaber: `power` og `waterAmount`:

```js run
class CoffeeMachine {
  waterAmount = 0; // mængden af vand inde i kaffemaskinen

  constructor(power) {
    this.power = power;
    alert( `Oprettet en kaffemaskine, effekt: ${power}` );
  }

}

// opret kaffemaskinen
let coffeeMachine = new CoffeeMachine(100);

// fyld vand på
coffeeMachine.waterAmount = 200;
```

Lige nu er egenskaberne `waterAmount` og `power` offentlige (public). Vi kan nemt hente og sætte dem udefra og med alle værdier.

Lad os ændre `waterAmount` egenskaben til beskyttet for at have mere kontrol over den. For eksempel vil vi ikke vil have, at nogen kan sætte den under nul.

**Beskyttede egenskaber er normalt præfikseret med en understregning `_`.**

Det er ikke tvunget på sprog-niveau, men der er en velkendt konvention mellem programmører, at sådanne egenskaber og metoder ikke bør tilgås fra uden for klassen.

Så vores egenskab vil blive kaldt `_waterAmount`:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// opret kaffemaskinen
let coffeeMachine = new CoffeeMachine(100);

// fyld vand på
coffeeMachine.waterAmount = -10; // _waterAmount vil blive 0, ikke -10
```

Nu er tilgangen under kontrol, så det ikke er muligt at hælde mindre end 0 vand på.

## Kun læsbar "power"

Vi kan sørge for at de kun er muligt at læse egenskaben `power`. Det sker nogle gange, at en egenskab kun skal sættes ved oprettelse og derefter aldrig modificeres.

Det er præcis tilfældet for en kaffemaskine: effekten ændres aldrig.

For at gøre det, behøver vi kun at lave en getter, men ikke en setter:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// opret kaffemaskinen
let coffeeMachine = new CoffeeMachine(100);

alert(`Effekten er: ${coffeeMachine.power}W`); // Effekten er: 100W

coffeeMachine.power = 25; // Fejl (ingen setter)
```

````smart header="Getter/setter funktioner eller get/set syntaks?"
Her har vi brugt getter/setter syntaks.

En del udviklere foretrækker `get.../set...` funktioner, som dette:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Det ser ud til at være lidt længere, men funktioner er mere fleksible. De kan acceptere flere argumenter (selvom vi ikke har brug for dem lige nu) - get/set syntaksen kan kun arbejde med en enkelt værdi.

På den anden side er get/set syntaks kortere, så i sidste ende er der ingen streng regel, det er op til dig at bestemme.
```

```smart header="Beskyttede felter nedarves"
Hvis vi opretter `class MegaMachine extends CoffeeMachine` er der ikke noget der forhindrer os i at tilgå `this._waterAmount` eller `this._power` fra metoderne i den nye klasse.

Så beskyttede felter er naturligt nedarvede. Til forskel fra private felter, som vi vil se nedenfor.
```

## Privat "#waterLimit"

[recent browser=none]

JavaScript har fra og med ES2022 (ES13) sprogniveau støtte for private egenskaber og metoder.

Private egenskaber og metoder skal starte med `#`. De er kun tilgængelige inde i klassen.

For eksempel, her er en privat `#waterLimit` egenskab og den private metode `#fixWaterAmount`:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(123); // Fejl
coffeeMachine.#waterLimit = 1000; // Fejl
*/!*
```

På sprogniveau er `#` en speciel markering, der indikerer, at feltet er privat. Vi kan ikke tilgå det uden for klassen eller klasser der arver fra den.

Private felter kolliderer ikke med offentlige felter. Vi kan have både private `#waterAmount` og offentlige `waterAmount` felter samtidigt.

For eksempel, lad os gøre `waterAmount` til en accessor for `#waterAmount`:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Fejl
```

I modsætning til beskyttede felter, er private felter tvunget af sproget selv. Det er en god ting.

Men hvis vi arver fra `CoffeeMachine`, så har vi ingen direkte adgang til `#waterAmount`. Vi vil skulle stole på `waterAmount` getter/setter:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Fejl: kan kun tilgås fra CoffeeMachine
*/!*
  }
}
```

I mange scenarier er denne begrænsning for streng. Hvis vi udvider en `CoffeeMachine`, kan vi have legitime grunde til at tilgå dens interne struktur. Det er derfor, beskyttede felter oftere bruges, selvom de ikke er understøttet af sproget.

````warn header="Private felter er ikke tilgængelige som this[name]"
Private felter er specielle.

Som vi ved kan vi normalt tilgå felter ved hjælp af `this[name]`:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hej, ${*!*this[fieldName]*/!*}`);
  }
}
```

Med private felter er det umuligt: `this['#name']` virker ikke. Det er en syntaxbegrænsning for at sikre privatliv.
````

## Opsummering

I OOP sprog kaldes afgrænsningen af det interne interface fra det eksterne interface [encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)) (på dansk "indkapsling").

Det giver følgende fordele:

Beskyttelse for brugere, så de ikke skyder sig selv i foden
: Forestil dig et team af udviklere der bruger en kaffemaskine. Den er lavet af firmaet "Best CoffeeMachine" og virker fint, men med beskyttelsescoveret fjernet så du kan se al indmaden.

    Alle udviklere er civiliserede -- de bruger kaffemaskinen som beregnet. Men en af dem, John, besluttede at han var den smarteste af alle og lavede nogle justeringer i kaffemaskinens interne struktur. Så kaffemaskinen fejlede to dage senere.

    Det er jo egentlig ikke Johns skyld, men snarere den person der fjernede det beskyttende cover og lod John gøre rode rundt i noget han ikke skulle have rørt ved.

    Det samme gælder i programmering. Hvis en bruger af en klasse ændrer ting der ikke er beregnet til at blive ændret udefra er konsekvenserne uforudsigelige. Det skal vi prøve at undgå.

Understøttelse for udvikling
: Situationen i programmering er mere kompleks end med en virkelig kaffemaskine, fordi vi ikke bare køber den en gang. Koden undergår konstant udvikling og forbedring.

    **Hvis vi strengt afgrænser det interne interface, kan udvikleren af klassen frit ændre dens interne egenskaber og metoder, selv uden at informere brugerne.**

    Hvis du er en udvikler af sådan en klasse, er det godt at vide, at private metoder kan ændres sikkert, deres parametre kan ændres, og de kan tilsidesættes, fordi ingen ekstern kode afhænger af dem.

    Når en ny version udkommer kan den have undergået en total gennemrenovering internt, men stadig være simpel at opgradere fordi det eksterne inteface stadig er det samme.

Skjult kompleksitet
: Folk elsker simple ting. I det mindste udefra. Det der er indeni er en helt anden sag. Det kan være meget komplekst, og det er helt fint, så længe det ikke forstyrrer brugeren.

    Programmører er ingen undtagelse.

    **Det er altid praktisk, når implementeringsdetaljer er skjulte, og et simpelt, godt dokumenteret eksternt interface er tilgængeligt.**

For at skjule et internt interface bruger vi enten beskyttede eller private egenskaber:

- Beskyttede felter starter med `_`. Det er en velkendt konvention, ikke pålagt på sprog niveau. Programmører bør kun tilgå et felt, der starter med `_` fra sin klasse og klasser, der nedarver fra den.
- Private felter starter med `#`. JavaScript sikrer, at vi kun kan tilgå dem fra inde i klassen.
