describe("formatDate", function () {
  it("viser 1 millisekund som \"lige nu\"", function () {
    assert.equal(formatDate(new Date(new Date - 1)), 'lige nu');
  });

  it('viser 30 sekunder som \"30 sekunder siden\"', function () {
    assert.equal(formatDate(new Date(new Date - 30 * 1000)), "30 sekunder siden");
  });

  it('viser 5 minutter som \"5 minutter siden\"', function () {
    assert.equal(formatDate(new Date(new Date - 5 * 60 * 1000)), "5 minutter siden");
  });

  it('viser mere end en dag siden som DD.MM.YY HH:mm', function () {
    assert.equal(formatDate(new Date(2014, 2, 1, 11, 22, 33)), "01.03.14 11:22");
  });

});
