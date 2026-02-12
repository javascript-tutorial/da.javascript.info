importance: 5

---

# Opret en lommeregner, der kan udvides

Opret en konstruktørfunktion `Calculator`, der skaber "udvidelige" lommeregner-objekter.

Opgaven består af to dele.

1. Først skal du implementere metoden `calculate(str)`, der tager en streng som `"1 + 2"` i formatet "NUMMER operator NUMMER" (adskilt af mellemrum) og returnerer resultatet. Den skal forstå plus `+` og minus `-`.

    Brugseksempel:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Så skal du tilføje metoden `addMethod(name, func)`, der lærer lommeregneren en ny operation. Den tager operatorens `name` og den to-argument funktion `func(a,b)`, der implementerer den.

    For eksempel, lad os tilføje multiplikation `*`, division `/` og potens `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- Ingen parenteser eller komplekse udtryk i denne opgave.
- Tallene og operatoren er adskilt med præcis ét mellemrum.
- Der kan tilføjes fejlhåndtering, hvis du ønsker det.
