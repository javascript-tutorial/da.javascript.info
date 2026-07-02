
# HTML/CSS
Lad os først oprette HTML/CSS.

En menu er at selvstændigt element på side, så det bør puttes i sit eget DOM-element.

En liste at menupunkter kan opstilles som en liste `ul/li`.

Here's the example structure:

```html
<div class="menu">
  <span class="title">Søde sager (klik her)!</span>
  <ul>
    <li>Kage</li>
    <li>Donut</li>
    <li>Honning</li>
  </ul>
</div>
```

Vi bruger `<span>` til titlen fordi `<div>` har en implicit `display:block` på det, og det vil optage 100% af den horisontale bredde.

Sådan her:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Søde sager (klik her)!</div>
```

Så hvis vi sætter et `onclick` på det, så vil det også opfange klik til højre for teksten.

Da `<span>` har en implicit `display: inline`, optager det kun den plads, der er nødvendig for at rumme hele teksten:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Søde sager (klik her)!</span>
```

# Toggling af menu

Toggling af menu bør ændre pilen og vise/skjule menu-listen.

Alle disse ændringer håndteres perfekt af CSS. I JavaScript skal vi justere den tilstand menuen er i ved at tilføje eller fjerne klassen `.open`.

Uden den vil menuen være uden den vil menuen være lukket:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

... og med `.open` vil pilen ændres og listen vises:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
