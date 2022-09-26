importance: 4

---

# Uppercase const?

Undersøg følgende kode:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Her har du en konstant `birthday` dato og `age` bliver beregnet fra `birthday` ved hjælp af noget kode (den kode er ikke vist for klarhedens skyld - og fordi det ikke er vigtigt i eksemplet).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

Vil det være rigtigt at bruge store bogstaver til `birthday`? Til `age`? Eller måske til begge?

```js
<<<<<<< HEAD
const BIRTHDAY = '18.04.1982'; // lav til uppercase?

const AGE = someCode(BIRTHDAY); // lav til uppercase?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4
```
