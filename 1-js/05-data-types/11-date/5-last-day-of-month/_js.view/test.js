describe("getLastDayOfMonth", function() {
  it("sidste dag i 01.01.2012 - 31", function() {
    assert.equal(getLastDayOfMonth(2012, 0), 31);
  });

  it("sidste dag i 01.02.2012 - 29 (skudår)", function() {
    assert.equal(getLastDayOfMonth(2012, 1), 29);
  });

  it("sidste dag i 01.02.2013 - 28", function() {
    assert.equal(getLastDayOfMonth(2013, 1), 28);
  });
});
