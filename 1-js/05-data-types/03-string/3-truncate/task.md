importance: 5

---

# Afkort teksten

Opret en funktion `truncate(str, maxlength)`, der tjekker længden af `str` og, hvis den overskrider `maxlength` -- erstatter slutningen af `str` med ellipsis-tegnet `"…"`, så dens længde bliver lig med `maxlength`.

Resultatet af funktionen skal være den afkortede (hvis nødvendigt) streng.

For eksempel:

```js
truncate("Det jeg vil fortælle om emnet er følgende:", 20) == "Det jeg vil fortæll…"

truncate("Hej alle sammen!", 20) == "Hej alle sammen!"
```
