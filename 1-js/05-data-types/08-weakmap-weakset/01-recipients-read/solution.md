Let's store read messages in `WeakSet`:

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// to beskeder er læst
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages har 2 elementer

// ...lad os læse den første besked igen!
readMessages.add(messages[0]);
// readMessages stadig har 2 unikke elementer

// svar: var message[0] læst?
alert("Er besked 0 læst: " + readMessages.has(messages[0])); // true

messages.shift();
// nu har readMessages 1 element (teknisk set kan hukommelsen ryddes senere)
```

Et `WeakSet` tillader at gemme et sæt af beskeder og nemt kontrollere, om en besked findes i det.

Det rydder automatisk op i sig selv. Ulempen er, at vi ikke kan iterere over det, og vi kan ikke få "alle læste beskeder" direkte fra det. Men vi kan gøre det ved at iterere over alle beskeder og filtrere dem, der er i sættet.

En anden, forskellig løsning kunne være at tilføje en egenskab som `message.isRead=true` til en besked, efter den er læst. Da beskedobjekter styres af en anden kode, er det generelt ikke anbefalet, men vi kan bruge en symbolsk egenskab for at undgå konflikter.

Som dette:
```js
// den symbolske egenskab er kun kendt af vores kode
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Nu vil 3de-parts kode sandsynligvis ikke se vores ekstra egenskab.

Selvom symboler reducerer sandsynligheden for problemer, er brugen af `WeakSet` bedre fra et arkitektonisk synspunkt.
