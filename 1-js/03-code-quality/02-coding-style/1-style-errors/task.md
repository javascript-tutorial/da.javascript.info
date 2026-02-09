importance: 4

---

# Rodet kodestil

Hvad er der galt med kodestilen nedenfor?

```js no-beautify
function pow(x,n)
{
  let result=1;
  for(let i=0;i<n;i++) {result*=x;}
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'')
if (n<=0)
{
  alert(`Opløftning i ${n} potens er ikke understøttet, indtast venligst et helt tal større end nul`);
}
else
{
  alert(pow(x,n))
}
```

Kan du fikse det?
