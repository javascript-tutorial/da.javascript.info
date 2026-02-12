Resultatet er `4`:


```js run
let fruits = ["Æble", "Pære", "Appelsin"];

let shoppingCart = fruits;

shoppingCart.push("Banan");

*!*
alert( fruits.length ); // 4
*/!*
``` Det er fordi arrays er objekter. Så både `shoppingCart` og `fruits` er referencer til det samme array.