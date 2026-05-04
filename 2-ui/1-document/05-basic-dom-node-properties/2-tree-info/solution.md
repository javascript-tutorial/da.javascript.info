Lad os lave en løkke over `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

I løkken skal vi hente teksten inde i hvert `li`.

Vi kan læse teksten fra det første barn af `li`, som er tekst node:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title er teksten inde i <li> før andre noder
}
```

Derefter kan vi hente nummeret af efterkommere med `li.getElementsByTagName('li').length`.
