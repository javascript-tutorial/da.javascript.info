importance: 5

---

# Tooltip adfærd

Skriv JavaScrip kode for en tooltip-adfærd.

Når en mus kommer over et element med `data-tooltip`, skal tooltippen vises over det, og når den er væk, skal den blive skjult.

Et eksempel på hvordan det ser ud i HTML:
```html
<button data-tooltip="tooltip er ikke længere end elementet">Kort knap</button>
<button data-tooltip="HTML<br>tooltip">Endnu en knap</button>
```

Den skal virke således:

[iframe src="solution" height=200 border=1]

I denne opgave antager vi, at alle elementer med `data-tooltip` kun har tekst indeni. Ingen indlejrede tags (endnu).

Detaljer:

- Afstanden mellem elementet og tooltippen skal være `5px`.
- Dit tooltip skal være centreret i forhold til elementet, hvis det er muligt.
- Dit tooltip skal ikke krydse vindueskanterne. Normalt skal det være over elementet, men hvis elementet er øverst på siden og der ikke er plads til tooltippen, så skal den være under det.
- Indholdet af tooltippen er givet i attributten `data-tooltip`. Det kan være vilkårlig HTML.

Du har brug for to events:
- `mouseover` trigger når musen kommer over et element.
- `mouseout` trigger når musen forlader et element.

Bemærk: Du skal bruge event delegation, dvs. du skal sætte to handlere på `document` for at følge alle "overs" og "outs" fra elementer med `data-tooltip` og håndtere dine tooltip derfra.

Efter adfærden er implementeret, kan alle mennesker, også de, der ikke er vant til JavaScript, tilføje annoterede elementer.

P.S. Kun en tooltip kan vises ad gangen.
