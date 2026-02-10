describe("pow", function () {

  describe("hæver x til 3de potens", function () {

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

  it("hvis n er negativ, er resultatet NaN", function () {
    assert.isNaN(pow(2, -1));
  });

  it("hvis n ikke er et heltal, er resultatet NaN", function () {
    assert.isNaN(pow(2, 1.5));
  });

});
