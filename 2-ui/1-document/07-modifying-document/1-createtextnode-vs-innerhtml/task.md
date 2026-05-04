importance: 5

---

# createTextNode vs innerHTML vs textContent

Vi har et tomt DOM-element `elem` og en streng `text`.

Hvilken af disse 3 kommandoer vil gøre præcis det samme?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
