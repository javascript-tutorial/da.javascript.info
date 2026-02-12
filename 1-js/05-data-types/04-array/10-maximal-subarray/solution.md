# Langsom løsning

Vi kan beregne alle mulige delsummer.

Den simpleste måde er at tage hvert element og beregne summen af alle delarrays, der starter fra det.
For eksempel, for `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Startende fra -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Startende fra 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Startende fra 3:
3
3 + (-9)
3 + (-9) + 11

// Startende fra -9
-9
-9 + 11

// Startende fra 11
11
```

Koden er faktisk en indlejret løkke: den ydre løkke går over array-elementerne, og den indre tæller delsummer, der starter med det aktuelle element.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // hvis vi ikke tager nogle elementer, vil nul blive returneret

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

Løsningen har en tidskompleksitet på [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). Med andre ord, hvis vi fordobler størrelsen på arrayet, vil algoritmen tage fire gange så lang tid.

For store arrays (1000, 10000 eller flere elementer) kan sådanne algoritmer føre til alvorlig langsommelighed.

# Hurtig løsning

Lad os gå igennem arrayet og holde den nuværende delsum af elementer i variablen `s`. Hvis `s` bliver negativ på et tidspunkt, så sæt `s=0`. Maksimum af alle sådanne `s` vil være svaret.

Hvis beskrivelsen er for vag, så se venligst koden, den er kort nok:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for hvert item af arr
    partialSum += item; // læg item til partialSum
    maxSum = Math.max(maxSum, partialSum); // husk maksimum
    if (partialSum < 0) partialSum = 0; // nul hvis negativ
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

Algoritmen kræver præcis 1 gennemgang af arrayet, så tidskompleksiteten er O(n).

Du kan finde mere detaljeret information om algoritmen her: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Hvis det stadig ikke er indlysende, hvorfor det virker, så prøv at følge algoritmen på eksemplerne ovenfor, se hvordan den fungerer, det er ofte bedre end ord.