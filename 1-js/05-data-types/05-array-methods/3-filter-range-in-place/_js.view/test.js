describe("filterRangeInPlace", function () {

  it("returner det filtrerede array", function () {

    let arr = [5, 3, 8, 1];

    filterRangeInPlace(arr, 2, 5);

    assert.deepEqual(arr, [5, 3]);
  });

  it("returnerer ikke noget", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });

});
