
Det første kald har `this == rabbit`, de andre har `this` lig med `Rabbit.prototype`, fordi det faktisk er objektet før punktummet.

Så kun det første kald viser `Rabbit`, andre viser `undefined`:

```js run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

let rabbit = new Rabbit("Kanin");

rabbit.sayHi();                        // Kanin
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
```
