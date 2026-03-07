Det er fordi at konstruktøren skal kalde `super()`.

Her er den tilrettede kode:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("Hvid kanin"); // ok nu
*/!*
alert(rabbit.name); // Hvid kanin
```
