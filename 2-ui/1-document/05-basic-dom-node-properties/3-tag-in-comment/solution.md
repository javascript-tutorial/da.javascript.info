Svaret er: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

Hvad sker der trin for trin:

1. Indholdet af `<body>` erstattes af en kommentar. Kommentaren er `<!--BODY-->`, fordi `body.tagName == "BODY"`. Som vi husker, er `tagName` altid versaler i HTML.
2. Kommentaren er nu det eneste barn, så vi får den med `body.firstChild`.
3. `data`-egenskaben af kommentaren er dens indhold (inde i `<!--...-->`): `"BODY"`.
