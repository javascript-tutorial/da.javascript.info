importance: 5

---

# Finally or just the code?

Sammenlign disse to kodefragmenter.

1. Den første bruger `finally` til at køre koden efter `try...catch`:

    ```js
    try {
      arbejd' arbejd'
    } catch (err) {
      håndter fejl
    } finally {
    *!*
      ryd op på arbejdspladsen
    */!*
    }
    ```
2. Den anden placerer oprydningen lige efter `try...catch`:

    ```js
    try {
      arbejd' arbejd'
    } catch (err) {
      håndter fejl
    }

    *!*
    ryd op på arbejdspladsen
    */!*
    ```

Vi skal selvfølgelig have oprydningen efter arbejdet, uanset om der var en fejl eller ej.

Er der en fordel i at bruge `finally` eller er de to kodefragmenter ens? Hvis der er en sådan fordel, så giv et eksempel på, når det betyder noget.
