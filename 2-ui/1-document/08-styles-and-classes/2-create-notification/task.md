importance: 5

---

# Opret en notifikation

Skriv en funktion `showNotification(options)` der opretter en notifikation: `<div class="notification">` med det givne indhold. Notifikationen skal automatisk forsvinde efter 1.5 sekunder.

Mulighederne er:

```js
// vis et element med teksten "Hejsa!" nær det højre øverste hjørne af vinduet
showNotification({
  top: 10, // 10px fra toppen af vinduet (standard 0px)
  right: 10, // 10px fra den højre side af vinduet (standard 0px)
  html: "Hejsa!", // den HTML som skal vises i notifikationen
  className: "welcome" // en ekstra klasse for div-elementet (valgfrit)
});
```

[demo src="solution"]


Brug CSS positioning til at vise elementet ved de givne top/right koordinater. Det originale dokument har de nødvendige styles.
