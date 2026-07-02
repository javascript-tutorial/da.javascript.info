importance: 5

---

# Hvilken handler vil blive afviklet?

Der er et element i variablen (en knap). Der er ingen handlers på den.

Hvilke handlers afvikles ved klik efter følgende kode? Hvilke alerts vises?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
