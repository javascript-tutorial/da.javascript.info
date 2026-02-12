importance: 2

---

# A maximal subarray

Input er et array af tal, f.eks. `arr = [1, -2, 3, 4, -9, 6]`.

Opgaven er: find det sammenhængende delarray af `arr` med den maksimale sum af elementer.

Skriv funktionen `getMaxSubSum(arr)`, der returnerer den sum.

For eksempel:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (summen af de markerede elementer)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (tag det hele)
```

Hvis alle elementer er negative, betyder det, at vi ikke tager nogen (delarrayet er tomt), så summen er nul:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Prøv at tænke på en hurtig løsning: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) eller endda O(n), hvis du kan.
