importance: 5

---

# Positioner en note indenfor the note inside (absolute)

Udvid den forrige opgave, <info:task/position-at-absolute>: lær funktionen  `positionAt(anchor, position, elem)` at indsætte `elem` indenfor `anchor`.

Nye værdier for `position`:

- `top-out`, `right-out`, `bottom-out` -- virker på same måde som før, de indsætter `elem` over/højre om/under `anchor`.
- `top-in`, `right-in`, `bottom-in` -- indsæt `elem` indenfor `anchor`: sæt den fast på den øvre/højre/nedre kant.

For eksempel:

```js
// viser noten over blockquote
positionAt(blockquote, "top-out", note);

// viser noten indenfor blockquote, øverst
positionAt(blockquote, "top-in", note);
```

Resultat:

[iframe src="solution" height="310" border="1" link]

Brug kildekoden fra opgaven <info:task/position-at-absolute>.
