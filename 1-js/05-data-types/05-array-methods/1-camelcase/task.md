importance: 5

---

# Oversæt border-left-width til borderLeftWidth

Skriv funktionen `camelize(str)`, der ændrer ord adskilt af bindestreger som "min-korte-streng" til camelCase "minKorteStreng".

Det vil sige: fjern alle bindestreger, og hvert ord efter en bindestreg bliver skrevet med stort begyndelsesbogstav.

Eksempler:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

Hint: brug `split` til at opdele strengen i et array, transformér det og brug `join` til at sætte det sammen igen.
