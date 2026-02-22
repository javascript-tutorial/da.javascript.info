function makeCounter() {
  let count = 0;

  // ... din kode ...
}

let counter = makeCounter();

alert(counter()); // 0
alert(counter()); // 1

counter.set(10); // sæt en ny værdi

alert(counter()); // 10

counter.decrease(); // formindsk tælleren med 1

alert(counter()); // 10 (i stedet for 11)
