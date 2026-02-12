describe("sumSalaries", function () {
  it("returner summen af lønninger", function () {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal(sumSalaries(salaries), 650);
  });

  it("returnerer 0 for et tomt objekt", function () {
    assert.strictEqual(sumSalaries({}), 0);
  });
});