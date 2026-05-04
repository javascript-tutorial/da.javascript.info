
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Vælg en genre</div>

  <script>
    // hent elementet
    let elem = document.querySelector('[data-widget-name]');

    // læs værdien
    alert(elem.dataset.widgetName);
    // eller
    alert(elem.getAttribute('data-widget-name'));
  </script>
</body>
</html>
```
