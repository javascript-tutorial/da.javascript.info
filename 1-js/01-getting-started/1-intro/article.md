# En introduktion til JavaScript

Lad os se, hvad der er så specielt ved JavaScript, hvad vi kan opnå med det, og hvilke andre teknologier der spiller godt sammen med det.

## Hvad er JavaScript?

*JavaScript* blev oprindeligt skabt for at "gøre websider levende".

Programmerne i dette sprog kaldes *scripts*. De kan skrives direkte i en websides HTML og køres automatisk, når siden indlæses.

Scripts leveres og udføres som almindelig tekst. De behøver ikke nogen særlig forberedelse eller kompilering for at kunne køre.

På dette punkt adskiller JavaScript sig meget fra et andet sprog kaldet [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Hvorfor hedder det <u>Java</u>Script?"
Da JavaScript blev skabt, havde det oprindeligt et andet navn: "LiveScript". Men Java var meget populært på det tidspunkt, så det blev besluttet, at det ville hjælpe at positionere et nyt sprog som en "lillebror" til Java at placere det som en "lillebror" til Java.

Men efterhånden som det udviklede sig, blev JavaScript et helt selvstændigt sprog med sin egen specifikation kaldet [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), og nu har det slet ingen relation til Java.
```

I dag kan JavaScript ikke kun afvikles i browseren, men også på serveren eller faktisk på enhver enhed, der har et særligt program kaldet [JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Browseren har en indlejret motor, der nogle gange kaldes en "JavaScript virtual machine".

Forskellige motorer har forskellige "kodenavne". F.eks:

- V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- i Chrome, Opera og Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- i Firefox.
- ...Der er andre kodenavne som "Chakra" i IE, "JavaScriptCore", "Nitro" og "SquirrelFish" i Safari osv.

Ovenstående betegnelser er gode at huske, fordi de bruges i udviklerartikler på internettet. Vi vil også bruge dem. Hvis f.eks. "en funktion X understøttes af V8", så virker den sandsynligvis i Chrome, Opera og Edge.

```smart header="Hvordan fungerer en motor?"

Motorer er komplicerede. Men det grundlæggende er ret nemt.

1. Motoren (indlejret, hvis det er en browser) læser ("parser") et script.
2. Derefter konverterer ("kompilerer") den scriptet til maskinkode.
3. Og så kører maskinkoden, ret hurtigt.

Motoren anvender optimeringer på hvert trin i processen. Den holder endda øje med det kompilerede script, mens det kører, analyserer de data, der strømmer gennem det, og optimerer maskinkoden yderligere på baggrund af denne viden.
```

## Hvad kan JavaScript der afvikles i browseren gøre?

Moderne JavaScript er et "sikkert" programmeringssprog. Det giver ikke adgang til hukommelse eller CPU på lavt niveau, fordi det oprindeligt blev skabt til browsere, som ikke kræver det.

JavaScript's muligheder afhænger i høj grad af det miljø, det kører i. F.eks. understøtter [Node.js](https://wikipedia.org/wiki/Node.js) funktioner, der gør det muligt for JavaScript at læse/skrive vilkårlige filer, udføre netværksforespørgsler osv.

I browseren kan JavaScript udføre alt, hvad der har med webside-manipulation, interaktion med brugeren og webserveren at gøre.

JavaScript i en browser er f.eks. i stand til at:

- Tilføje ny HTML til siden, ændre det eksisterende indhold, ændre stilarter.
- Reagere på brugerhandlinger, køre på museklik, pointerbevægelser, tastetryk.
- sende forespørgsler over nettet til fjernservere, downloade og uploade filer (de såkaldte [AJAX](https://en.wikipedia.org/wiki/Ajax_(programmering)) og [COMET](https://en.wikipedia.org/wiki/Comet_(programmering))-teknologier).
- Get and set cookies, ask questions to the visitor, show messages.
- Remember the data on the client-side ("local storage").

## Hvad kan JavaScript i browseren ikke gøre?

JavaScript's muligheder i browseren er begrænset for at beskytte brugerens sikkerhed. Formålet er at forhindre en ond webside i at få adgang til private oplysninger eller skade brugerens data.

Eksempler på sådanne begrænsninger er bl.a:

- JavaScript på en webside må ikke læse/skrive vilkårlige filer på harddisken, kopiere dem eller eksekvere programmer. Det har heller ikke direkte adgang til funktioner i styresystemet.

  Moderne browsere tillader det dog at arbejde med filer, med adgangen er begrænset og tillades kun, hvis brugeren udfører specifikke handlinger såsom at "droppe" en fil hen over browservinduet eller vælge en fil via et `<input>`tag.

  Der er måder hvor JavaScript kan interagere med kamera, microfon eller andre enheder, men det kræver en specifik tilladelse fra brugeren. På denne måde kan en side med JavaScript ikke snyde sig til at tænde for kameraet, observere omgivelserne og sende informationer videre til [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Forskellige tabs eller vinduer kender generelt ikke noget til hinanden. Nogle gange gør de det, f.eks. når det ene vindue bruger JavaScript til at åbne det andet. Men selv i dette tilfælde kan JavaScript fra den ene side ikke få adgang til den anden side, hvis de kommer fra forskellige websteder (fra et andet domæne, en anden protokol eller port).

    Dette kaldes "Same Origin Policy" (politik om samme oprindelse). For at omgå dette skal *begge sider* være enige om dataudveksling og skal indeholde særlig JavaScript-kode, der håndterer det. Vi vil dække det i tutorialen.

    Denne begrænsning er, igen, for brugerens sikkerhed. En side fra `http://anysite.com`, som en bruger har åbnet, må ikke kunne få adgang til en anden browserfane med URL-adressen `http://gmail.com`, f.eks. og stjæle oplysninger derfra.
- JavaScript kan nemt kommunikere over nettet til den server, hvor den aktuelle side kom fra. Men dets evne til at modtage data fra andre websteder/domæner er begrænset. Selv om det er muligt, kræver det en udtrykkelig tilladelse (udtrykt i HTTP-headers) fra den eksterne side. Endnu en gang er det en sikkerhedsbegrænsning.

![](limitations.svg)

Sådanne begrænsninger findes ikke, hvis JavaScript anvendes uden for browseren, f.eks. på en server. Moderne browsere tillader også plugins/udvidelser, som kan bede om udvidede tilladelser.

## Hvad gør JavaScript unikt?

Der er mindst *tre* gode ting ved JavaScript:

```compare
+ Fuld integration med HTML/CSS.
+ Simple ting gøres enkelt.
+ Understøttes af alle større browsere og er aktiveret som standard.
```
JavaScript er den eneste browserteknologi, der kombinerer disse tre ting.

Det er det, der gør JavaScript unikt. Det er derfor, det er det mest udbredte værktøj til at skabe browsergrænseflader.

Når det er sagt, kan JavaScript også bruges til at skabe servere, mobilapplikationer osv.

## Sprog "over" JavaScript

Syntaksen i JavaScript passer ikke til alles behov. Forskellige mennesker ønsker forskellige funktioner.

Det er forventeligt, fordi projekter og krav er forskellige for alle.

Derfor er der for nylig dukket et væld af nye sprog op, som *transpileres* (konverteres) til JavaScript, inden de kører i browseren.

Moderne værktøjer gør transpileringen meget hurtig og gennemsigtig, idet de faktisk giver udviklerne mulighed for at kode på et andet sprog og automatisk konvertere det "under motorhjelmen".

Eksempler på sådanne sprog:

- [CoffeeScript] (https://coffeescript.org/) er "syntaktisk sukker" til JavaScript. Det introducerer en kortere syntaks, så du kan skrive klarere og mere præcis kode. Normalt kan Ruby-udviklere lide det.
- [TypeScript](https://www.typescriptlang.org/) er koncentreret om at tilføje "strict data typing" for at forenkle udviklingen og understøttelsen af komplekse systemer. Det er udviklet af Microsoft.
- [Flow](https://flow.org/) tilføjer også datatyper, men på en anden måde. Udviklet af Facebook.
- [Dart](https://www.dartlang.org/) er et selvstændigt sprog, der har sin egen motor, som kører i miljøer uden for browsere (f.eks. mobilapps), men som også kan transpileres til JavaScript. Udviklet af Google.
- [Brython](https://brython.info/) er en Python-transpiler til JavaScript, som gør det muligt at skrive programmer i ren Python uden JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) er et moderne, kortfattet og sikkert programmeringssprog, der kan målrettes mod browseren eller Node.

Der er flere. Selv om vi bruger et af disse transpilerede sprog, bør vi naturligvis også kunne JavaScript for virkelig at forstå, hvad vi laver.

## Resumé

- JavaScript blev oprindeligt skabt som et sprog kun til browsere, men det bruges nu også i mange andre miljøer.
- I dag har JavaScript en enestående position som det mest udbredte browsersprog, der er fuldt integreret med HTML/CSS.
- Der er mange sprog, som bliver "transpileret" til JavaScript og giver visse funktioner. Det anbefales at tage et kig på dem, i det mindste kortvarigt, efter at man har mestret JavaScript.
