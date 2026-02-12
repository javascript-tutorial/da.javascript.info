importance: 5

---

# Gem datoer for læsning

Der er et array af beskeder som i [forrige opgave](info:task/recipients-read). Situationen er lignende.

```js
let messages = [
  {text: "Hej", from: "John"},
  {text: "Hvordan går det?", from: "John"},
  {text: "Vi ses snart", from: "Alice"}
];
```

Spørgsmålet nu er: hvilken datastruktur vil du foreslå til at gemme informationen: "hvornår blev beskeden læst?".

I den forrige opgave skulle vi kun gemme "ja/nej"-faktumet. Nu skal vi gemme datoen, og den skal kun forblive i hukommelsen, indtil beskeden bliver garbage collected.

P.S. Datoer kan gemmes som objekter af den indbyggede `Date`-klasse, som vi dækker senere.
