De første to tjek bliver til to `case`. Det tredje tjek er opdelt i to cases:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Bemærk: `break` nederst er ikke påkrævet. Men vi sætter det for at gøre koden fremtidssikret.

I fremtiden er der en chance for, at du vil tilføje en mere `case`, for eksempel `case 4`. Og hvis du glemmer at tilføje et break før det, i slutningen af `case 3`, vil der opstå en fejl. Så det er en form for sikkerhed mod fejl i fremtiden.
