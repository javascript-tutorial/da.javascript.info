describe("getDateAgo", function () {

  it("1 dag før 02.01.2015 -> day 1", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 1), 1);
  });


  it("2 dage før 02.01.2015 -> day 31", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 2), 31);
  });

  it("100 dage før 02.01.2015 -> day 24", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 100), 24);
  });

  it("365 dage før 02.01.2015 -> day 2", function () {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 365), 2);
  });

  it("ændrer ikke den givne datoen", function () {
    let date = new Date(2015, 0, 2);
    let dateCopy = new Date(date);
    getDateAgo(dateCopy, 100);
    assert.equal(date.getTime(), dateCopy.getTime());
  });

});
