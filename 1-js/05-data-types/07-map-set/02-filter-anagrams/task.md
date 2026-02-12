importance: 4

---

# Filtrer anagrammer

[Anagrams](https://en.wikipedia.org/wiki/Anagram) er ord der har det samme antal individuelle tegn men i en anden rækkefølge.

For eksempel:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Skriv en funktion `aclean(arr)` der returnerer et array renset for anagrammer.

For eksempel:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" eller "PAN,cheaters,era"
```

Fra hvert anagramgruppe skal der kun være ét ord tilbage, uanset hvilket.

