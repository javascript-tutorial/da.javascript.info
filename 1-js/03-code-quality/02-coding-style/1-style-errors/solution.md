
Du kunne bemærke følgende:

```js no-beautify
<<<<<<< HEAD
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
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
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
