
# Omskriv med pilefunktioner

Erstat Funktionsudtryk med pilefunktioner i koden nedenfor:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("Du er enig."); },
  function() { alert("Du annullerede udførelsen."); }
);
```
