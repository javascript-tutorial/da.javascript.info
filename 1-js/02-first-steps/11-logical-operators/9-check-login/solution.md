

```js run demo
let userName = prompt("Hvem er du?", '');

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    alert( 'Velkommen!' );
  } else if (pass === '' || pass === null) {
    alert( 'Annulleret' );
  } else {
    alert( 'Forkert password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Annulleret' );
} else {
  alert( "Kender dig ikke" );
}
```

Note the vertical indents inside the `if` blocks. They are technically not required, but make the code more readable.
