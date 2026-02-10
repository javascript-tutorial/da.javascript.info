describe("multiplyNumeric", function() {
  it("Ganger alle numeriske egenskaber med 2", function() {
    let menu = {
      width: 200,
      height: 300,
      title: "Min menu"
    };
    let result = multiplyNumeric(menu);
    assert.equal(menu.width, 400);
    assert.equal(menu.height, 600);
    assert.equal(menu.title, "Min menu");
  });

  it("returner returnerer intet", function() {
    assert.isUndefined( multiplyNumeric({}) );
  });

});
