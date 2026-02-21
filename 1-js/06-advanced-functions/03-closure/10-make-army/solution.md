
Lad os undersøge hvad der faktisk sker inde i `makeArmy`. Måske står løsningen så klarere.

1. Den opretter et tomt array `shooters`:

    ```js
    let shooters = [];
    ```
2. Fylder den med funktioner via `shooters.push(function)` i løkken.

    Hvert element er en funktion, så det resulterer i et array der ser således ud:

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

3. Arrayet returneres fra funktionen.
    
    Senere vil et kald til et element i arrayet, f.eks. `army[5]()` vil hente elementet `army[5]` fra arrayet (som er en funktion) og kalde den.
    
    Men, hvorfor viser alle sådanne funktioner så samme værdi, `10`?
    
    Det skyldes, at der ikke er en lokal variabel `i` inde i `shooter`-funktionerne. Når en sådan funktion kaldes, tager den `i` fra dens ydre leksikale miljø. Så hvad er værdien af `i` når funktionen kaldes?
    
    Kig på koden:
    
    ```js
    function makeArmy() {
      ...
      let i = 0;
      while (i < 10) {
        let shooter = function() { // shooter funktion
          alert( i ); // skal vise sit nummer
        };
        shooters.push(shooter); // tilføj funktionen til arrayet
        i++;
      }
      ...
    }
    ```
    
    Vi kan se at alle `shooter` funktioner er oprettet i det leksikale miljø af `makeArmy()` funktionen. Men når `army[5]()` kaldes, har `makeArmy` allerede afsluttet sin job, og den endelige værdi af `i` er `10` (`while` stopper ved `i=10`).
    
    Som resultat får alle `shooter` funktioner samme værdi fra det ydre leksikale miljø og det er den sidste værdi, `i=10`.
    
    ![](lexenv-makearmy-empty.svg)
    
    Som du kan se ovenfor så oprettes der et nyt leksikalt miljø ved hver iteration af `while {...}` blokken. Så for at fikse dette, kan vi kopiere værdien af `i` til en variabel inden i `while {...}` blokken, som dette:
    
    ```js run
    function makeArmy() {
      let shooters = [];
    
      let i = 0;
      while (i < 10) {
        *!*
          let j = i;
        */!*
          let shooter = function() { // shooter funktion
            alert( *!*j*/!* ); // skal vise sit nummer
          };
        shooters.push(shooter);
        i++;
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
    // Nu virker koden som den skal
    army[0](); // 0
    army[5](); // 5
    ```
    
    Her vil `let j = i` deklarere en lokal variabel `j` og kopiere `i` over i den. Primitiver kopieres "ved deres værdi", så vi får en reelt uafhængig kopi af `i`, der tilhører den aktuelle løkkes iteration.
    
    Shooters virker korrekt nu fordi værdien af `i` nu lever et lidt tættere på. Ikke i `makeArmy()` Lexical Environment, men i det Lexical Environment der svarer til den aktuelle løkkes iteration:
    
    ![](lexenv-makearmy-while-fixed.svg)
    
    Dette problem kunne undgås hvis vi brugte `for` i stedet for `while`, som dette:
    
    ```js run demo
    function makeArmy() {
    
      let shooters = [];
    
    *!*
      for(let i = 0; i < 10; i++) {
    */!*
        let shooter = function() { // shooter funktion
          alert( i ); // bør vise sit nummer
        };
        shooters.push(shooter);
      }
    
      return shooters;
    }
    
    let army = makeArmy();
    
    army[0](); // 0
    army[5](); // 5
    ```
    
    Det er grundlæggende det samme fordi `for` gennem hver iteration genererer en ny leksikale miljø med sin egen variabel `i`. Så `shooter` genereret i hver iteration refererer til dens egen `i`, fra den pågældende iteration.
    
    ![](lexenv-makearmy-for-fixed.svg)

Nu, efter du har lagt så meget energi i at læse dette, og den endelige opskrift er så enkel - bare brug `for`, kan du måske tænke -- var det værd det?

Vel, hvis du kunne svare spørgsmålet nemt, ville du ikke have læst løsningen. Så håber jeg, at denne opgave har hjulpet dig med at forstå tingene lidt bedre. 

Desuden er der faktisk tilfælde hvor man hellere foretrækker `while` frem for `for`, og andre scenarier hvor sådanne problemer opstår.
