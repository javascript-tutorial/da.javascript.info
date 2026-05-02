Der er mange måder at gøre det.

Her er et par af dem:

```js
// 1. Tabellen med `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Alle label-elementer inde i den tabel
table.getElementsByTagName('label')
// or
document.querySelectorAll('#age-table label')

// 3. Det første `td` i den tabel (med ordet "Alder")
table.rows[0].cells[0]
// or
table.getElementsByTagName('td')[0]
// or
table.querySelector('td')

// 4. Formularen med navnet "search"
// antager, at der kun er ét element med name="search" i dokumentet
let form = document.getElementsByName('search')[0]
// Eller specifikt selve formularen
document.querySelector('form[name="search"]')

// 5. Det første input i den form
form.getElementsByTagName('input')[0]
// or
form.querySelector('input')

// 6. Det sidste input i den form
let inputs = form.querySelectorAll('input') // find alle input
inputs[inputs.length-1] // tag den sidste
```
