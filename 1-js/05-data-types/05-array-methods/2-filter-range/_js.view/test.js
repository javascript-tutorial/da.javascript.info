describe("filterRange", function () {

  it("returner de filtrerede værdier", function () {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    assert.deepEqual(filtered, [3, 1]);
  });

  it("ændrer ikke arrayet", function () {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    assert.deepEqual(arr, [5, 3, 8, 1]);
  });

});