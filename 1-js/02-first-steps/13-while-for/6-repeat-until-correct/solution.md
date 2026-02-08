
```js run demo
let num;

do {
  num = prompt("Indtast et tal større end 100?", 0);
} while (num <= 100 && num);
```

Løkken `do..while` gentages, mens begge betingelser er sande:

1. Tjekker om `num <= 100` -- det vil sige, den indtastede værdi er stadig ikke større end `100`.
2. Tjekker om `&& num` er falsk, når `num` er `null` eller en tom streng. Så stopper `while`-løkken også.

P.S. Hvis `num` er `null`, så er `num <= 100` `true`, så uden det 2. tjek ville løkken ikke stoppe, hvis brugeren klikker på ANNULLER. Begge tjek er nødvendige.
