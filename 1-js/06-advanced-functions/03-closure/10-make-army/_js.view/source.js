function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter funktion
      alert( i ); // bør vise sit nummer
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // shooter nummer 0 viser 10
army[5](); // og nummer 5 viser også 10...
*/
