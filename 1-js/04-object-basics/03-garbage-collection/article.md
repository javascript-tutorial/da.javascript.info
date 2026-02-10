# Oprydning af affald (Garbage collection)

Håndtering af hukommelse i JavaScript udføres automatisk og usynligt for os. Vi opretter primitive værdier, objekter, funktioner... Alt det optager hukommelse.

Hvad sker der, når noget ikke længere er nødvendigt? Hvordan opdager JavaScript-motoren det og rydder op?

## Tilgængelighed (Reachability)

Hovedkonceptet i hukommelsesstyring i JavaScript er *tilgængelighed*.

Kort sagt er "tilgængelige" værdier dem, der på en eller anden måde er tilgængelige eller brugbare. De er garanteret at blive gemt i hukommelsen.

1. Der findes et grundlæggende sæt af iboende tilgængelige værdier, som ikke kan slettes af åbenlyse grunde.

    For eksempel:

    - Den aktuelt kørende funktion, dens lokale variable og parametre.
    - Andre funktioner i den nuværende kæde af indlejrede kald, deres lokale variabler og parametre.
    - Globale variabler.
    - (der er også nogle andre, interne)

    Disse værdier kaldes *roots*.

2. Alle andre værdier betragtes som tilgængelige, hvis de kan nås fra en root direkte via en reference eller en kæde af referencer.

    For eksempel, hvis der er et objekt i en global variabel, og det objekt har en egenskab, der refererer til et andet objekt, betragtes *det* objekt som tilgængeligt. Og dem, det refererer til, er også tilgængelige. Detaljerede eksempler følger.

Der kører en proces i baggrunden i JavaScript-motoren, der kaldes [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)). Den overvåger alle objekter og fjerner dem, der er blevet utilgængelige.

## Et simpelt eksempel

Her er det simpleste eksempel:

```js
// user har en reference til objektet
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Her viser pilen en objektreference. Den globale variabel `"user"` refererer til objektet `{name: "John"}` (vi kalder det John for korthedens skyld). `"name"`-egenskaben af John indeholder en primitiv, så den er "malet inde i objektet".

Hvis værdien af `user` overskrives, mistes referencen:

```js
user = null;
```

![](memory-user-john-lost.svg)

Nu bliver John utilgængelig. Der er ingen måde at få adgang til det på, ingen referencer til det. Garbage collector vil rydde op i dataene og frigøre hukommelsen.

## To referencer

Lad os nu forestille os, at vi kopierede referencen fra `user` til `admin`:

```js
// user har en reference til objektet
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Nu, hvis vi gør det samme:
```js
user = null;
```

... så er objektet stadig tilgængeligt via den globale variabel `admin`, så det skal blive i hukommelsen. Hvis vi også overskriver `admin`, kan det fjernes.

## Sammenkædede objekter

Nu et mere komplekst eksempel - familien:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

Funktionen `marry` "gifter" to objekter ved at give dem referencer til hinanden og returnerer et nyt objekt, der indeholder dem begge.

Den resulterende hukommelsesstruktur:

![](family.svg)

Som det er nu, er alle objekter tilgængelige.

Lad os nu fjerne to referencer:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

Det er ikke nok kun at slette en af disse to referencer, fordi alle objekter stadig ville være tilgængelige.

Men hvis vi sletter begge, kan vi se, at John ikke længere har nogen indkommende referencer:

![](family-no-father.svg)

Udgående referencer betyder ikke noget. Kun indkommende kan gøre et objekt tilgængeligt. Så John er nu utilgængelig og vil blive fjernet fra hukommelsen sammen med alle dets data, der også blev utilgængelige.

Efter garbage collection:

![](family-no-father-2.svg)

## Utilgængelig ø

Det er muligt, at hele øen af sammenkædede objekter bliver utilgængelig og fjernet fra hukommelsen.

Selve kildeobjektet er det samme som ovenfor. Derefter sletter vi referencen til det:

```js
family = null;
```

Billedet af den indre hukommelse bliver nu:

![](family-no-family.svg)

Dette eksempel demonstrerer, hvor vigtigt begrebet tilgængelighed er.

Det er indlysende, at John og Ann stadig er forbundet, begge har indkommende referencer. Men det er ikke nok.

Det tidligere `"family"`-objekt er blevet afkoblet fra roden, der er ikke længere nogen reference til det, så hele øen bliver utilgængelig og vil blive fjernet.

## Interne algoritmer

Den grundlæggende garbage collection-algoritme kaldes "mark-and-sweep".

Følgende "garbage collection"-trin udføres regelmæssigt:

- Garbage collectoren tager rødderne (roots) og "markerer" (husker) dem.
- Derefter besøger den og "markerer" alle referencer fra dem.
- Derefter besøger den markerede objekter og markerer *deres* referencer. Alle besøgte objekter huskes, så de ikke besøges to gange i fremtiden.
- ...Og så videre, indtil alle tilgængelige (fra rødderne) referencer er besøgt.
- Alle objekter undtagen de markerede fjernes.

For eksempel, lad vores objektstruktur se sådan ud:

![](garbage-collection-1.svg)

Vi kan tydeligt se en "utilgængelig ø" til højre. Lad os nu se, hvordan "mark-and-sweep" garbage collectoren håndterer det.

Det første trin markerer rødderne:

![](garbage-collection-2.svg)

Derefter følger vi deres referencer og markerer de refererede objekter:

![](garbage-collection-3.svg)

...Og fortsætter med at følge yderligere referencer, så længe det er muligt:

![](garbage-collection-4.svg)

Nu betragtes de objekter, der ikke kunne besøges i processen, som utilgængelige og vil blive fjernet:

![](garbage-collection-5.svg)

Vi kan også forestille os processen som at spilde en stor spand maling fra rødderne, der flyder gennem alle referencer og markerer alle tilgængelige objekter. De umarkerede fjernes derefter.

Dette er konceptet for, hvordan garbage collection fungerer. JavaScript-motorer anvender mange optimeringer for at få det til at køre hurtigere og undgå at introducere forsinkelser i kodeudførelsen.

Nogle af optimeringerne:

- **Generational collection** -- objekter opdeles i to sæt: "nye" og "gamle". I typisk kode har mange objekter en kort levetid: de optræder, udfører deres opgave og dør hurtigt, så det giver mening at spore nye objekter og rydde hukommelsen for dem, hvis det er tilfældet. De, der overlever længe nok, bliver "gamle" og undersøges sjældnere.
- **Incremental collection** -- hvis der er mange objekter, og vi prøver at gennemgå og markere hele objektmængden på én gang, kan det tage noget tid og introducere synlige forsinkelser i udførelsen. Så motoren opdeler hele mængden af eksisterende objekter i flere dele. Og rydder derefter disse dele én efter én. Der er mange små garbage collections i stedet for én total. Det kræver noget ekstra bogføring imellem dem for at spore ændringer, men vi får mange små forsinkelser i stedet for én stor.
- **Idle-time collection** -- garbage collectoren prøver kun at køre, mens CPU'en er inaktiv, for at reducere den mulige effekt på udførelsen.

Der findes andre optimeringer og varianter af garbage collection-algoritmer. Vi kunne bruge mere tid på at beskrive dem, men stopper for nu. Forskellige motorer implementerer også forskellige justeringer og teknikker. Og, hvad der er endnu vigtigere, ting ændrer sig, efterhånden som motorer udvikler sig, så at studere dybere "på forhånd", uden et reelt behov, er sandsynligvis ikke det værd. Medmindre det selvfølgelig er et spørgsmål om ren interesse, så vil der være nogle links til dig nedenfor.

## Opsummering

De vigtigste ting at vide:

- Garbage collection udføres automatisk. Vi kan ikke tvinge eller forhindre det.
- Objekter bevares i hukommelsen, så længe de er tilgængelige.
- At blive refereret er ikke det samme som at være tilgængelig (fra en rod): en gruppe af indbyrdes forbundne objekter kan blive utilgængelige som helhed, som vi har set i eksemplet ovenfor.

Moderne motorer implementerer avancerede algoritmer for garbage collection.

En generel bog "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al) dækker nogle af dem.

Hvis du en dag bliver fortrolig med lavniveauprogrammering, findes mere detaljerede oplysninger om V8's garbage collector i artiklen [A tour of V8: Garbage Collection](https://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

[V8-bloggen](https://v8.dev/) offentliggør også artikler om ændringer i hukommelsesstyring fra tid til anden. Naturligvis, for at lære mere om garbage collection, bør du forberede dig ved at lære om V8-internals generelt og læse bloggen af [Vyacheslav Egorov](https://mrale.ph), som arbejdede som en af V8-ingeniørerne. Jeg siger: "V8", fordi det er bedst dækket af artikler på internettet. For andre motorer er mange tilgange lignende, men garbage collection adskiller sig på mange måder.

Dyb kendskab til motorer er godt, når du har brug for lavniveauoptimeringer. Det kan være klogt at planlægge det som det næste skridt, efter du er fortrolig med selve sproget.
