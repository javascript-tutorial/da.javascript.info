describe("camelize", function () {

  it("efterlad en tom linje som den er", function () {
    assert.equal(camelize(""), "");
  });

  it("omdanner background-color til backgroundColor", function () {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("omdanner list-style-image til listStyleImage", function () {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("omdanner -webkit-transition til WebkitTransition", function () {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });

});