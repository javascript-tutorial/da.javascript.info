Selve HTML-koden i opgaven er forkert. Det er årsagen til det mærkelige resultat.

Browseren må reparere det automatisk. Men der kan ikke være noget tekst inden i `<table>`: ifølge specifikationen er kun tabel-specifikke tags tilladt. Så browseren viser `"aaa"` *før* `<table>`.

Nu bliver det mere tydeligt hvorfor det bliver stående når tabellen fjernes.

Spørgsmålet kan nemt besvares ved at udforske DOM'en ved hjælp af browserværktøjerne. Du vil se `"aaa"` før `<table>`.

HTML-standarden specificerer i detaljer, hvordan man behandler dårlig HTML, og sådan adfærd fra browseren anses for korrekt.
