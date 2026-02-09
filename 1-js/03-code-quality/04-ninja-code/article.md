# Ninja code


```quote author="Confucius (Analects)"
Learning without thought is labor lost; thought without learning is perilous.
```

Fortidens ninjaprogrammører brugte disse tricks til at skærpe sindet hos kodevedligeholdere.

Guruer af kodegennemgang leder efter dem i testopgaver.

Begyndere i programmering bruger dem nogle gange endda bedre end programmørninjaer.

Læs dem omhyggeligt og find ud af, hvem du er -- en ninja, en begynder eller måske en kodegennemgangsekspert?


```warn header="Ironi vil forekomme"
Mange prøver at følge ninjavejen. Få lykkes.
```


## Kortfattethed er visdommens sjæl

Gør koden så kort som muligt. Vis hvor smart du er.

Lad subtile sproglige funktioner guide dig.

For eksempel, se på denne ternære operator `'?'`:

```js
// taget fra et velkendt javascript-bibliotek
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Sejt, ikke? Hvis du skriver sådan, vil en udvikler, der støder på denne linje og prøver at forstå, hvad værdien af `i` er, få en festlig tid. Så kommer de til dig og søger svar.
Fortæl dem, at kortere altid er bedre. Indviede dem i ninjavejen.

## Enkeltbogstavsvariabler

```quote author="Laozi (Tao Te Ching)"
The Dao hides in wordlessness. Only the Dao is well begun and well
completed.
```

En anden måde at kode kortere på er at bruge enkeltbogstavsvariabler overalt. Som `a`, `b` eller `c`.

En kort variabel forsvinder i koden som en ægte ninja i skoven. Ingen vil kunne finde den ved hjælp af "søgning" i editoren. Og selv hvis nogen gør, vil de ikke kunne "afkode", hvad navnet `a` eller `b` betyder.

...men, der er en undtagelse. En ægte ninja vil aldrig bruge `i` som tæller i en `"for"`-løkke. Ikke her. Kig dig omkring, der findes mange mere eksotiske bogstaver. For eksempel `x` eller `y`.

En eksotisk variabel som løkketæller er især sej, hvis løkkens krop fylder 1-2 sider (gør den længere, hvis du kan). Så hvis nogen kigger dybt inde i løkken, vil de ikke hurtigt kunne finde ud af, at variablen med navnet `x` er løkketælleren.

## Brug forkortelser

Hvis teamets regler forbyder brugen af enkeltbogstaver og vage navne -- forkort dem, lav forkortelser.

Som dette:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Kun den med sand intuition vil være i stand til at forstå sådanne navne. Prøv at forkorte alt. Kun en værdig person bør være i stand til at opretholde udviklingen af din kode.

## Svæv højt. Vær abstrakt.

```quote author="Laozi (Tao Te Ching)"
The great square is cornerless<br>
The great vessel is last complete,<br>
The great note is rarified sound,<br>
The great image has no form.
```

Når du vælger et navn, så prøv at bruge det mest abstrakte ord. Som `obj`, `data`, `value`, `item`, `elem` og så videre.

- **Det ideelle navn for en variabel er `data`.** Brug det overalt, hvor du kan. Hver variabel indeholder jo *data*, ikke?

    ...Men hvad gør man, hvis `data` allerede er taget? Prøv `value`, det er også universelt. En variabel får trods alt til sidst en *værdi*.

- **Navngiv en variabel efter dens type: `str`, `num`...**

    Prøv dem. En ung initiativtager kan undre sig -- er sådanne navne virkelig nyttige for en ninja? Det er de!

    Selvfølgelig betyder variabelnavnet stadig noget. Det fortæller, hvad der er inde i variablen: en streng, et tal eller noget andet. Men når en udenforstående prøver at forstå koden, vil de blive overrasket over at se, at der faktisk ikke er nogen information overhovedet! Og vil i sidste ende mislykkes med at ændre din velovervejede kode.

    Tupen af værdi er nem at finde ud af ved debugging. Men hvad betyder variablen? Hvilken streng/tal gemmer den?

    Der er simpelthen ingen måde at finde ud af det uden en god meditation!

- **...Men hvad gør man, hvis der ikke er flere sådanne navne?** Bare tilføj et nummer: `data1, item2, elem5`...

## Opmærksomhedstest

Kun en virkelig opmærksom programmør bør være i stand til at forstå din kode. Men hvordan tjekker man det?

**En af måderne -- brug lignende variabelnavne, som `date` og `data`.**

Mix dem, hvor du kan.

En hurtig læsning af sådan kode bliver umulig. Og når der er en slåfejl... Ummm... Vi sidder fast længe, tid til at drikke te.


## Smarte synonymer

```quote author="Laozi (Tao Te Ching)"
The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.
```

Brug *lignende* navne for *samme* ting gør livet mere interessant og viser din kreativitet for offentligheden.

Tænk for eksempel på funktionspræfikser. Hvis en funktion viser en besked på skærmen -- start den med `display…`, som `displayMessage`. Og hvis en anden funktion viser noget andet på skærmen, som et brugernavn, start den med `show…` (som `showName`).

Insinuer, at der er en subtil forskel mellem sådanne funktioner, selvom der ikke er nogen.

Lav en pagt med teamets ninjaer: hvis John begynder at "vise" funktioner med `display...` i sin kode, kan Peter bruge `render..`, og Ann -- `paint...`. Bemærk, hvor meget mere interessant og forskelligartet koden blev.

...Og nu hattricket!

For to funktioner med vigtige forskelle -- brug samme præfiks!

For eksempel vil funktionen `printPage(page)` bruge en printer. Og funktionen `printText(text)` vil vise teksten på skærmen. Lad en uerfaren læser tænke grundigt over den lignende navngivne funktion `printMessage`: "Hvor placerer den beskeden? På en printer eller på skærmen?". For at få det til virkelig at skinne, bør `printMessage(message)` vise den i et nyt vindue!

## Genbrug navne

```quote author="Laozi (Tao Te Ching)"
Once the whole is divided, the parts<br>
need names.<br>
There are already enough names.<br>
One must know when to stop.
```

Tilføj en ny variabel kun når det er absolut nødvendigt.

Brug i stedet eksisterende navne igen. Skriv bare nye værdier ind i dem.

I en funktion prøv så kun at bruge variabler, der er sendt som parametre.

Dette ville gøre det virkelig svært at identificere, hvad der præcist er i variablen *nu*. Og også hvor det kommer fra. Formålet er at udvikle intuitionen og hukommelsen hos en person, der læser koden. En person med svag intuition ville være nødt til at analysere koden linje for linje og spore ændringerne gennem hver kodegren.

**En avanceret variant af tilgangen er hemmeligt (!) at erstatte værdien med noget lignende midt i en løkke eller en funktion.**

For eksempel:

```js
function ninjaFunction(elem) {
  // 20 linjer kode, der arbejder med elem...

  elem = clone(elem);

  // 20 linjer mere, nu arbejder vi med klonen af elem!
}
```

En medprogrammer, der ønsker at arbejde med `elem` i den anden halvdel af funktionen, vil blive overrasket... Først under fejlfindingen, efter at have undersøgt koden, vil de finde ud af, at de arbejder med en klon!

Set regelmæssigt i kode. Dødeligt effektivt selv mod en erfaren ninja.

## Understregning for sjov

Put understregninger `_` og `__` før variabelnavne. Som `_name` eller `__value`. Det ville være fantastisk, hvis kun du kendte deres betydning. Eller endnu bedre, tilføj dem bare for sjov, uden nogen særlig betydning overhovedet. Eller forskellige betydninger forskellige steder.

Du slår to fluer med ét smæk. For det første bliver koden længere og mindre læsbar, og for det andet kan en medudvikler bruge lang tid på at finde ud af, hvad understregningerne betyder.

En smart ninja sætter understregninger ét sted i koden og undgår dem andre steder. Det gør koden endnu mere skrøbelig og øger sandsynligheden for fremtidige fejl.

## Vis din kærlighed

Lad alle se, hvor storslåede dine enheder er! Navne som `superElement`, `megaFrame` og `niceItem` vil helt sikkert oplyse en læser.

På den ene side er der skrevet noget: `super..`, `mega..`, `nice..` Men på den anden side bringer det ingen detaljer. En læser kan beslutte sig for at lede efter en skjult betydning og meditere i en time eller to af deres betalte arbejdstid.


## Overlap ydre ydre variable

```quote author="Guan Yin Zi"
When in the light, can't see anything in the darkness.<br>
When in the darkness, can see everything in the light.
```

Brug samme navne til variabler inde i og uden for en funktion. Så simpelt. Ingen anstrengelser for at opfinde nye navne.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...mange linjer...
  ...
  ... // <-- en programmør ønsker at arbejde med user her og...
  ...
}
```

En programmør, der hopper ind i `render`, vil sandsynligvis ikke bemærke, at der er en lokal `user`, der skygger for den ydre.

Så vil de prøve at arbejde med `user` i den tro, at det er den eksterne variabel, resultatet af `authenticateUser()`... Fælden er sat! Hej, debugger...


## Sideeffekter alle steder!

Der findes funktioner, der ser ud til ikke at ændre noget. Som `isReady()`, `checkPermission()`, `findTags()`... De antages at udføre beregninger, finde og returnere data uden at ændre noget uden for dem. Med andre ord uden "sideeffekter".

**Et virkelig smukt trick er at tilføje en "nyttig" handling til dem, ud over hovedopgaven.**

Et udtryk af forvirret overraskelse i ansigtet på din kollega, når de ser en funktion med navnet `is..`, `check..` eller `find...` ændre noget -- vil helt sikkert udvide dine grænser for fornuft.

**En anden måde at overraske på er at returnere et ikke-standard resultat.**

Vis din originale tænkning! Lad kaldet af `checkPermission` returnere ikke `true/false`, men et komplekst objekt med resultaterne af kontrollen.

De udviklere, der prøver at skrive `if (checkPermission(..))`, vil undre sig over, hvorfor det ikke virker. Fortæl dem: "Læs dokumentationen!". Og giv denne artikel.


## Kraftfulde funktioner!

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Lad ikke en funktion være begrænset af, hvad der står i dens navn. Vær bredere.

For eksempel kunne en funktion `validateEmail(email)` (udover at kontrollere emailens korrekthed) vise en fejlmeddelelse og bede om at indtaste emailen igen.

Yderligere handlinger bør ikke være åbenlyse ud fra funktionsnavnet. En ægte ninja-koder vil gøre dem ikke åbenlyse ud fra koden også.

**Kæd flere handlinger sammen i én for at beskytte din kode mod genbrug.**

Forestil dig, at en anden udvikler kun ønsker at kontrollere emailen og ikke vise nogen besked. Din funktion `validateEmail(email)`, der gør begge dele, vil ikke passe til dem. Så de vil ikke bryde din meditation ved at spørge om noget.

## Opsummering

Alle "gode råd" ovenfor er fra den virkelige kode... Nogle gange skrevet af erfarne udviklere. Måske endda mere erfarne end dig ;)

- Følg nogle af dem, og din kode vil blive fuld af overraskelser.
- Følg mange af dem, og din kode vil blive helt din egen, som ingen vil ændre.
- Følg alle, og din kode vil blive en værdifuld lektion for unge udviklere, der søger oplysning.
