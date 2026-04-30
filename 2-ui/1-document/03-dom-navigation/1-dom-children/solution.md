Der er mange måder at gå til det på. Det kunne for eksempel være:


`<div>` DOM noden:

```js
document.body.firstElementChild
// eller
document.body.children[0]
// eller (den første node er et mellemrum, så vi tager den anden)
document.body.childNodes[1]
```

`<ul>` DOM noden:

```js
document.body.lastElementChild
// eller
document.body.children[1]
```

Den anden `<li>` (med Mikkel):

```js
// hent <ul>, og derefter hent det sidste barn der er et element
document.body.lastElementChild.lastElementChild
```
