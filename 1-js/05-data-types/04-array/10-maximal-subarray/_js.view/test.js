describe("getMaxSubSum", function () {
  it("maksimal sum af [1, 2, 3] er 6", function () {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("maksimal sum af [-1, 2, 3, -9] er 5", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("maksimal sum af [-1, 2, 3, -9, 11] equals 11", function () {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("maksimal sum af [-2, -1, 1, 2] equals 3", function () {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("maksimal sum af [100, -9, 2, -3, 5] er 100", function () {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("maksimal sum af [] er 0", function () {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("maksimal sum af [-1] er 0", function () {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("maksimal sum af [-1, -2] er 0", function () {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });

  it("maksimal sum af [2, -8, 5, -1, 2, -3, 2] er 6", function () {
    assert.equal(getMaxSubSum([2, -8, 5, -1, 2, -3, 2]), 6);
  });
});
