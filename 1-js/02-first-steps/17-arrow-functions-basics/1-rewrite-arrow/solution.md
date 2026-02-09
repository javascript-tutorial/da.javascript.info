
```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Er du enig",
  () => alert("Du er enig."),
  () => alert("Du annullerede udførelsen.")
);
```

Ser kort og overskueligt ud, ikke? 
