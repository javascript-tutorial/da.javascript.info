# Ved brug af rekursion

Den recursive logik er en lille smule svær her.

Vi skal først udskrive resten af listen og *derefter* udskrive det nuværende element:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Ved brug af en løkke

Den løkkebaserede variant er også en lille smule mere kompliceret end direkte output.

Der er ingen måde at få den sidste værdi i vores `list`. Vi kan også ikke "gå tilbage".

Få det vi kan gøre er at gennemgå elementerne i den direkte rækkefølge og huske dem i et array, og derefter udskrive det vi huskede i omvendt rækkefølge:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Bemærk at den rekursive løsning gør præcis det samme: den følger listen, husker elementerne i kæden af indlejrede kald (i eksekveringsstakken), og udskriver dem derefter. 
