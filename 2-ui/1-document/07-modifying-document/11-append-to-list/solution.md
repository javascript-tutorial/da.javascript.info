
Når vi skal indsætte HTML i en liste, er `insertAdjacentHTML` det bedste værktøj.
  
Løsningen:

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
