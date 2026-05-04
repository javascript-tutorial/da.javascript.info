Der er en lille hage er.

På det tidspunkt hvor `<script>` eksekveres er DOM noden præcis `<script>`, fordi browseren ikke har processeret resten af siden endnu.

Så resultatet er `1` (element node).

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```
