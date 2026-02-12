describe("count", function () {
  it("tæl antallet af egenskaber", function () {
    assert.equal(count({ a: 1, b: 2 }), 2);
  });

  it("returnerer 0 for et tomt objekt", function () {
    assert.equal(count({}), 0);
  });

  it("ignorerer symbolske egenskaber", function () {
    assert.equal(count({ [Symbol('id')]: 1 }), 0);
  });
});