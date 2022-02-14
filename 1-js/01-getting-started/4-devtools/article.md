# Udvikler konsollen

Kode er næsten dømt til at indeholde fejl. Du vil næsten helt sikkert lave fejl jævnligt ... hvad snakker jeg om? Du vil *helt sikkert* lave fejl - i hvert fald, hvis du er menneske og ikke en [robot](https://en.wikipedia.org/wiki/Bender_(Futurama)).

Men, i en browser ser du ikke umiddelbart fejlene. Så, når noget går galt er det ikke altid muligt at se i browseren og derfor heller ikke muligt at fikse fejlen.

For at se fejlene og samtidig få en masse anden brugbar information om din kode, så findes der en række værktøjer i browseren kaldet "developer tools".

Mange udviklere hælder til at bruge Chrome eller Firefox fordi deres værktøjer er meget udviklede. Andre browsere tilbyder også udviklingsværktøjer, nogle gange med specielle features, men prøver normalt at samle op på mulighederne fra Chrome eller Firefox. De fleste udviklere har en favorit browser og skifter til de andre for at teste browserspecifikke problemer.

<<<<<<< HEAD
Udviklingsværktøjerne har mange praktiske features. Til at starte med, skal du lære at åbne dem, kigge efter fejl og afvikle JavaScript kommandoer.
=======
Developer tools are potent; they have many features. To start, we'll learn how to open them, look at errors, and run JavaScript commands.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

## Google Chrome

Åbn siden [bug.html](bug.html).

Der er en fejl i sidens JavaScript kode. Det er skjult for den besøgende, så åbn udviklingsværktøjerne (developer tools) for at se dem.

Tryk `key:F12` eller, hvis du er på Mac `key:Cmd+Opt+J`.

Udviklingsværktøjerne vil åbne med tabben KOnsol (Console) som standard.

Det ser ud i stil med dette:

![chrome](chrome.png)

Det præcise udseende vil afhænge af din version af Chrome. Det skifter fra tid til anden men burde minde om billedet.

- Her kan du se fejlmeddelelsen i en rød farve. I det her tilfælde indeholder scriptet en ukendt "lalala" kommando.
- Til højre er et klikbart link til kildekoden `bug.html:12` med den linje i koden, hvor fejlen er opstået.

Under fejlmeddelelsen er det et blåt `>` symbol. Det markerer en "kommandolinje" hvor du kan skrive JavaScript kommandoer. Tryk `key:Enter` for at afvikle dem.

Nu har du lært, hvor du kan se fejl, og det er nok til en begyndelse. Du kommer tilbage til udviklingsværktøjerne senere og lærer om at finde fejl (debugge) i kapitlet <info:debuggingD-chrome>.

```smart header="Multi-line input"
Normalt, når du skriver en linje kode og trykker `key:Enter`, bliver kommandoen afviklet.

For at afvikle flere linjer på én gang skal du trykke `key:Shift+Enter` mellem hver kommando. På den måde kan du skrive længere stykker JavaScript kode der skal afvikles samtidig
```

## Firefox, Edge og andre

De fleste browsere bruger `key:F12` for at åbne udviklingsværktøjerne

Udseendet og måden de virker på er ret ens. Så snart du kender til én af browsernes værktøjer, kan du nemt skifte til de andre.

## Safari

Safari (Mac browser, ikke understøttet af Windows/Linux) er lidt speciel her. Du er nød til først at aktivere "Udviklermenu" (Develop menu) først.

Åbn indstillingerne og gå til "Avanceret" (Advanced) pane. Her er der en checkbox nederst:

![safari](safari.png)

Nu kan `key:Cmd+Opt+C` åbne konsollen. Derudover har du en menu i toppen kaldet "Udvikler" (Develop) med en række muligheder.

## Opsummering

- Udviklingsværktøjer gør det muligt at se fejl, afvikle kommandoer, undersøge variable og meget mere.
- De kan åbnes med `key:F12` i de fleste browsere på Windows. Chrome for Mac bruger `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (Husk, at åbne for muligheden i indstillinger).

Nu er udviklingsmiljøet sat op. I den næste sektion, skal du dykke ned i JavaScript sproget.
