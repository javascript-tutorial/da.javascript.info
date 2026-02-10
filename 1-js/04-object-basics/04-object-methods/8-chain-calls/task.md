importance: 2

---

# Kæder

Der er et `ladder` objekt, der tillader dig at gå op og ned:

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // viser det nuværende trin
    alert( this.step );
  }
};
```

Nu, hvis vi skal lave flere kald i rækkefølge, kan vi gøre det sådan her:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

Modificer `up`, `down` og `showStep` metoderne, så kald kan kædes sammen, som dette:

```js
ladder.up().up().down().showStep().down().showStep(); // viser 1 og derefter 0
```

Sådan en tilgang er bredt anvendt i JavaScript-biblioteker.
