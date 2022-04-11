# Hello, world!

Denne del af tutorialen er om ren JavaScript, selve komponenterne i sproget.

Men, du behøver et miljø til at afvikle dine scripts og siden denne bog er en online bog, så er browseren et godt bud. Jeg vil holde browser-specifikke kommandoer (som `alert`) til et minimum. Det gør jeg, hvis du f.eks. læser dette for at arbejde i andre miljøer (som f.eks. Node.js). Jeg vil fokusere på JavaScript i browseren i den [næste del](/ui) af tutorialen.

Først, lad os se, hvordan du kobler et script til en webside. For server-side miljøer som Node.js, kan du afvikle scripts med kommandoen`"node my.js"`.

## "script" tagget
JavaScript programmer kan blive sat ind i alle dele af et HTML-dokument ved hjælp af et `<script>` tag.

For eksempel:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
Du kan køre eksemplet ved at klikke på "Play" i øverste højre hjørne.
```

`<script>` tagget indeholder JavaScript kode, der automatisk bliver afviklet når browseren processerer det.


## Moderne markup

`<script>` tagget har et par egenskaber (kaldet attributes) der sjældent bruges mere, men du kan stadig finde dem i ældre kode:

`type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: Den gamle HTML-standard, HTML4, krævede at et script beskrev sin `type`. Normalt var den sat til `type="text/javascript"`. Det er ikke påkrævet mere. Samtidig har den moderne HTML-standard helt ændret meningen med den attribut. Nu, kan den bruges til f.eks. JavaScript moduler, men det er et sværere emne, og jeg dækker moduler i et andet afsnit senere.

`language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
: Denne attribut var ment til at vise sproget koden blev skrevet i. Denne attribut giver ikke længere mening fordi JavaScript er standardsproget i browseren.

Kommentarer før og efter scripts.
: I virkelig gamle bøger og guides kan du finde kommentarer inde i `<script>` tags, i stil med dette:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Dette trick bruges ikke i moderne JavaScript. Disse kommentar tegn (<!-- og -->) skjulte JavaScript fra ældre browsere, der endnu ikke vidste hvodan man afviklede `<script>` tag. Siden browsere i de seneste 15 år ikke har haft problemer med dette, kan det hjælpe dig med at identificere virkelig gamle eksempler.


## Eksterne scripts

HVis du har meget JavaScript kode, kan du placere det i en ekstern fil.

Script-filer bliver knuttet til HTML gennem en `src` attribut:

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
Her er `/path/to/script.js` en absolut sti til scriptet fra sitets rod. Du kan også give en relativ sti fra det aktuelle HTML-dokument. F.eks. betyder `src="script.js"` at filen `"script.js"` findes i samme folder som HTML-dokumetet.
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"`, just like `src="./script.js"`, would mean a file `"script.js"` in the current folder.
>>>>>>> ac7daa516fa8e687427eac51186af97154748afa

Endelig, kan du give en fuld URL som f.eks:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

Hvis du vil koble flere eksterne scripts til dokumentet skal du bruge flere tags:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
Som regel er det kun meget simple scripts der skrives direkte i HTML. Mere komplekse scripts placeres i eksterne filer.

En fordel ved eksterne filer er, at browseren vil downloade dem og gemme dem i sin [cache](https://en.wikipedia.org/wiki/Web_cache).

Andre dokumenter der referer til den samme fil vil så læse den fra chachen i stedet for at downloade det igen.

Det sparer trafik og gør siden hurtigere.
```

````warn header="Hvis `src` er sat vil indholdet af `<script>` tagget blive ignoreret."
Et enkelt `<script>` tag kan ikke både have en `src` attribut og egen kode i sig.

Dette vil ikke virke:

```html
<script *!*src*/!*="file.js">
  alert(1); // Indholdet ignoreres fordi src er sat
</script>
```

Du må vælge enten eksternt med `<script src="…">` eller internt `<script>` med kode i.

Eksemplet ovenfor kan blive delt op i to scripts for at virke:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Opsummering

- Du bruger et `<script>` tag til at tilføje JavaScript til et HTML-dokument.
- `type` og `language` attributter er ikke længere påkrævet.
- Et eksternt script kan blive knyttet til dokumentet med `<script src="path/to/script.js"></script>`.


Der er meget mere at lære om browser scripts og deres interaktion med selve websiden. Men husk, at denne del af tutorialen har fokus på JavaScript sproget, så jeg vil ikke forvirre med for mange browser-specifikke emner. Du vil bruge en browser som en måde at afvikle JavaScript, som passer godt med denne online bog. Men, det er kun en af mange måder JavaScript kan afvikles.
