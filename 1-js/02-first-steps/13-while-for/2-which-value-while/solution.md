Denne opgave demonstrerer, hvordan postfix/prefix-former kan føre til forskellige resultater, når de bruges i sammenligninger.

1. **Fra 1 til 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    Den første værdi er `i = 1`, fordi `++i` først øger `i` og derefter returnerer den nye værdi. Så den første sammenligning er `1 < 5`, og `alert` viser `1`.

    Derefter følger `2, 3, 4…` -- værdierne vises én efter én. Sammenligningen bruger altid den inkrementerede værdi, fordi `++` er før variablen.

    Til sidste følger `i = 4`, som bliver forøget til `5`, sammenligningen `while(5 < 5)` fejler, og løkken stopper. Så `5` vises ikke.

2. **Fra 1 til 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    Den første værdi er igen `i = 1`. Postfix-formen af `i++` øger `i` og returnerer derefter den *gamle* værdi, så sammenligningen `i++ < 5` vil bruge `i = 0` (modsat `++i < 5`).

    Men `alert`-kaldet er separat. Det er en anden sætning, som udføres efter inkrementeringen og sammenligningen. Så den får den aktuelle `i = 1`.

    Derefter følger `2, 3, 4…`

    Lad os stoppe ved `i = 4`. Prefix-formen `++i` ville øge den og bruge `5` i sammenligningen. Men her har vi postfix-formen `i++`. Så den øger `i` til `5`, men returnerer den gamle værdi. Derfor er sammenligningen faktisk `while(4 < 5)` -- sand, og kontrollen går videre til `alert`.

    Værdien `i = 5` er den sidste, fordi næste trin `while(5 < 5)` er falsk.
