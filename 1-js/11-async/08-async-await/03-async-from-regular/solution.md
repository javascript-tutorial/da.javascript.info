
Det er her hvor det er godt at vide hvordan det virker inde i motorrummet.

Du kan bare behandle `async` kald som et promise og tilføje `.then` til det:

```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // viser 10 efter 1 sekund
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
