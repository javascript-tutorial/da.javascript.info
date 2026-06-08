Forskelle:

1. `clientWidth` er et tal, mens `getComputedStyle(elem).width` returnerer en streng med `px` til sidst.
2. `getComputedStyle` kan returnere ikke-numerisk bredde som `"auto"` for et inline-element.
3. `clientWidth` er det indre område for elementet plus padding, mens CSS-bredden (med standard `box-sizing`) er det indre område *uden* padding.
4. Hvis der er en scrollbjælke, og browseren reserverer plads til den, trækker nogle browsere den plads fra CSS-bredden (da den ikke længere er tilgængelig for indhold), og andre gør ikke. Egenskaben `clientWidth` er altid den samme: scrollbjælkens størrelse trækkes fra, hvis den er reserveret.
