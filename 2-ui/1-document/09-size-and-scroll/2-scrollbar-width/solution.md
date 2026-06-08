For at få bredden på en scrollbjælke kan vi oprette et element med scroll, men uden rammer og padding.

Forskellen mellem dets fulde bredde `offsetWidth` og den indre indholdsarealbredde `clientWidth` vil være præcis scrollbjælken:

```js run
// Opret et div element med scroll
let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// Vi skal indsætte elementet i dokumentet, ellers vil dimensionerne være 0
document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;

div.remove();

alert(scrollWidth);
```
