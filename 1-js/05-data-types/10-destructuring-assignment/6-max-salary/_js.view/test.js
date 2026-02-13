describe("topSalary", function () {
  it("returner den bedst betalte person", function () {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal(topSalary(salaries), "Pete");
  });

  it("returnerer null for et tomt objekt", function () {
    assert.isNull(topSalary({}));
  });
});