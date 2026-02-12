Bemærk den subtile, men vigtige detalje i løsningen. Vi konverterer ikke `value` til et tal med det samme efter `prompt`, fordi efter `value = +value` ville vi ikke kunne skelne en tom streng (stoptegn) fra nul (gyldigt tal). Vi gør det senere i stedet.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Indtast et tal?", 0);

    // skal vi afbryde?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

