
Først skal vi finde alle eksterne referencer.

Der er to måder.

Den første er at finde alle links ved hjælp af `document.querySelectorAll('a')` og derefter filtrere ud, hvad vi har brug for:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // ingen attribut

  if (!href.includes('://')) continue; // ingen protokol

  if (href.startsWith('http://internal.com')) continue; // intern

  link.style.color = 'orange';
}
```

Bemærk: vi bruger `link.getAttribute('href')`. ikke `link.href` fordi vi har brug for værdien fra HTML.

... en anden, simplere måde vil være at tilføje vores tjek til CSS-vælgeren:

```js
// kig efter alle links der har :// i href
// men hvor href ikke starter med http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
