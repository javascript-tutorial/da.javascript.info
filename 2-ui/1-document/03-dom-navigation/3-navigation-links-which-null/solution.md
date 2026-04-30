1. Ja, det er sandt. Elementet `elem.lastChild` er altid det sidste - det har ikke nogen `nextSibling`.
2. Nej, det er ikke sandt, fordi `elem.children[0]` er det første barn *mellem elementer*. Men der kan eksistere ikke-elementer før det. Så `previousSibling` kan være en tekstnode.

Bemærk: for begge tilfælde, hvis der ikke er nogen børn, vil der være en fejl.

Hvis der ikke er nogen børn, er `elem.lastChild` `null`, så vi kan ikke tilgå `elem.lastChild.nextSibling`. Og samlingen `elem.children` er tom (ligesom et tomt array `[]`).
