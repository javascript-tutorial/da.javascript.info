describe("getWeekDay", function () {
  it("3 January 2014 - fredag", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), 'Fre');
  });

  it("4 January 2014 - lørdag", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), 'Lør');
  });

  it("5 January 2014 - søndag", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), 'Søn');
  });

  it("6 January 2014 - mandag", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), 'Man');
  });

  it("7 January 2014 - tirsdag", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), 'Tir');
  });

  it("8 January 2014 - onsdag", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), 'Ons');
  });

  it("9 January 2014 - torsdag", function () {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), 'Tors');
  });
});
