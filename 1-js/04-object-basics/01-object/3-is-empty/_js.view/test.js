describe("isEmpty", function () {
  it("returner true for et tomt objekt", function () {
    assert.isTrue(isEmpty({}));
  });

  it("returner false hvis en egenskab findes", function () {
    assert.isFalse(isEmpty({
      anything: false
    }));
  });
});