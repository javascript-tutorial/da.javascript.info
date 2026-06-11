importance: 5

---

# Vis en note ved siden af elementet

Lav en funktion `positionAt(anchor, position, elem)`, som placerer `elem`, afhængig af `position`, i nærheden af `anchor` elementet.

`position` skal være en streng med en af 3 værdier:
- `"top"` - position `elem` lige over `anchor`
- `"right"` - position `elem` lige ved siden af `anchor` til højre
- `"bottom"` - position `elem` lige under `anchor`

Det bruges inde i funktionen `showNote(anchor, position, html)`, som leveres i opgavens kildekode, som opretter en "note"-element med den givne `html` og viser den på den givne `position` nær `anchor`.

Her er en demonstration af notes:

[iframe src="solution" height="350" border="1" link]
