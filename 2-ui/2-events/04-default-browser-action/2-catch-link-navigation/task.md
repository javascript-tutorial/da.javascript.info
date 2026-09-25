importance: 5

---

# Fang links i elementet

Sørg for, at alle links i elementet med `id="contents"` spørger brugeren, om de virkelig vil forlade siden. Og hvis de ikke vil, så følg ikke linkets url.

Sådan her:

[iframe height=100 border=1 src="solution"]

Detaljer:

- HTML-indholdet i elementet kan være indlæst eller blive genereret dynamisk, så vi kan ikke bare finde alle links og putte håndteringer på dem. Brug event delegation.
- Indholdet kan have indlejrede tags. Også inde i links, som f.eks. `<a href=".."><i>...</i></a>`.
