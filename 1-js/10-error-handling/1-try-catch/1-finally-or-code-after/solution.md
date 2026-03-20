Forskellen bliver tydelig, når vi kigger på koden inde i en funktion.

Det er forskelligt, hvis der er et "spring ud" af `try...catch`.

For eksempel, når der er en `return` inde i `try...catch`. `finally`-klausulen virker i tilfældet af *hvilken som helst* afslutning fra `try...catch`, selv via `return`-sætningen: lige efter `try...catch` er færdig, men før den kaldende kode får kontrollen.

```js run
function f() {
  try {
    alert('start');
*!*
    return "resultat";
*/!*
  } catch (err) {
    /// ...
  } finally {
    alert('oprydning!');
  }
}

f(); // oprydning!
```

...eller hvis der er en `throw`, som her:

```js run
function f() {
  try {
    alert('start');
    throw new Error("en fejl");
  } catch (err) {
    // ...
    if("kan ikke håndtere fejlen") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('oprydning!')
  }
}

f(); // oprydning!
```

Det er `finally` der garanterer oprydningen her. Hvis vi bare sætter koden ved slutningen af `f`, ville den ikke køre i disse situationer.
