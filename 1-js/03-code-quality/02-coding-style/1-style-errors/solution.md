
Du kunne bemærke følgende:

```js no-beautify
function pow(x,n)  // <- intet mellemrum mellem argumenter
{  // <- krøllet krøllet parentes på en separat linje
  let result=1;   // <- intet mellemrum før eller efter =
  for(let i=0;i<n;i++) {result*=x;}   // <- intet mellemrum
  // indholdet af { ... } bør være på en ny linje
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- teknisk muligt,
// men bedre at gøre det til 2 linjer, også der mangler mellemrum og semikolon
if (n<=0)  // <- ingen mellemrum inde i (n <= 0), og der bør være en ekstra linje over det
{   // <- krøllet parentes på en separat linje
  // nedenfor - lange linjer kan opdeles i flere linjer for bedre læsbarhed
  alert(`Opløftning i ${n} potens er ikke understøttet, indtast venligst et helt tal større end nul`);
}
else // <- kunne skrive det på en enkelt linje som "} else {"
{
  alert(pow(x,n))  // intet mellemrum og manglende ;
}
```

Den tilrettede variant:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`Opløftning i ${n} potens er ikke understøttet,
    indtast venligst et helt tal større end nul`);
} else {
  alert( pow(x, n) );
}
```
