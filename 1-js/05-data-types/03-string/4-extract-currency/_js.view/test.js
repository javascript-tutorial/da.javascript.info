describe("extractCurrencyValue", function () {

  it("for strengen $120 returneres tallet 120", function () {
    assert.strictEqual(extractCurrencyValue('$120'), 120);
  });


});