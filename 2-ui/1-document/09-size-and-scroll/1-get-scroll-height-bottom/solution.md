Løsningen er:

```js
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
```

Eller med andre ord: (fuld højde) minus (ud-scrollet top del) minus (synlig del) = den ud-scrollede bund del.

