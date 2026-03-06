importance: 5

---

# Forskellen mellem kald

Lad os oprette et nyt `rabbit` objekt:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Kanin");
```

Gør disse kald det samme eller gør de ikke?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
