importance: 4

---

# Uppercase const?

Undersøg følgende kode:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Her har du en konstant `birthday` dato og `age` bliver beregnet fra `birthday` ved hjælp af noget kode (den kode er ikke vist for klarhedens skyld - og fordi det ikke er vigtigt i eksemplet).

Vil det være rigtigt at bruge store bogstaver til `birthday`? Til `age`? Eller måske til begge?

```js
const BIRTHDAY = '18.04.1982'; // lav til uppercase?

const AGE = someCode(BIRTHDAY); // lav til uppercase?
```

