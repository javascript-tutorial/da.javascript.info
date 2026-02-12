Kaldet `arr[2]()` er syntaktisk den gode gamle `obj[method]()`, hvor `arr` spiller rollen som `obj`, og `2` spiller rollen som `method`.

Så vi har et kald af funktionen `arr[2]` som en objektmetode. Naturligvis modtager den `this`, der refererer til objektet `arr` og udskriver arrayet:

```js run
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
``` 

Arrayet har 3 værdier: oprindeligt havde det to, plus funktionen. Når vi kalder `arr[2]()`, så er `this` i funktionen lig med `arr`, og det udskrives som "a,b,function(){...}".