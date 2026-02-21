function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // shooter funktion
      alert( i ); // bør vise sit nummer
    };
    shooters.push(shooter);
  }

  return shooters;
}
