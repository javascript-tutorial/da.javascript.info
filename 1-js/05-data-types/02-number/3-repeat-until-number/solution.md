
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Indtast et tal, tak", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Indtastet: ${readNumber()}`);
```

Løsningen er lidt mere indviklet, end den kunne være, fordi vi skal håndtere `null`/tomme linjer.

Så vi bliver ved med at acceptere input, indtil det er et "almindeligt tal". Både `null` (annuller) og tomme linjer passer også til den betingelse, fordi de i numerisk form er `0`.

Efter vi er stoppet, skal vi behandle `null` og tomme linjer specielt (returnere `null`), fordi konvertering til et tal ville returnere `0`.

