For at matche funktionaliteten af `switch` præcist, skal `if` bruge en streng sammenligning `'==='`.

For givne strenge fungerer en simpel `'=='` dog også.

```js no-beautify
if(browser == 'Edge') {
  alert("Du bruger Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay vi understøtter også disse browsere' );
} else {
  alert( 'Vi håber, at denne side ser godt ud!' );
}
```

Bemærk: konstruktionen `browser == 'Chrome' || browser == 'Firefox' …` er opdelt i flere linjer for bedre læsbarhed.

Men `switch` konstruktionen er stadig renere og mere beskrivende.
