Svaret er: den første og den tredje vil blive udført.

Detaljer:

```js run
// Kører.
// The result of -1 || 0 = -1, truthy
if (-1 || 0) alert( 'first' );

// Kører ikke
// -1 && 0 = 0, falsy
if (-1 && 0) alert( 'second' );

// Kører
// Operator && har en højere præcedens end ||
// så -1 && 1 udføres først, hvilket giver os kæden:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'third' );
```

