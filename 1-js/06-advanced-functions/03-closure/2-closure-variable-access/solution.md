Svaret er: **Pete**.

Funktionen `work()` i koden nedenfor får `name` fra stedet hvor den blev oprettet gennem referencen til det ydre leksikale miljø:

![](lexenv-nested-work.svg)

Så resultatet er `"Pete"` her.

Men, hvis der ikke var `let name` i `makeWorker()`, så ville søgningen gå udenfor og tage den globale variabel som vi kan se fra kæden ovenfor. I det tilfælde ville resultatet være `"John"`.
