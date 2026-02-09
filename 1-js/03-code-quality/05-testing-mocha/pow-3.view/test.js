describe("pow", function () {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} hævet til 3de potens er ${expected}`, function () {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
