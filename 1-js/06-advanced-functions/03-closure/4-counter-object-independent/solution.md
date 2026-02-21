
Det vil fungere helt fint.

Begge indlejrede funktioner er oprettet i det samme ydre leksikale miljø, så de deler adgang til den samme `count` variabel:

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
