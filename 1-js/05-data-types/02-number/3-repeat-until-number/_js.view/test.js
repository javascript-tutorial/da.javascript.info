beforeEach(function () {
  sinon.stub(window, "prompt");
});

afterEach(function () {
  prompt.restore();
});

describe("readNumber", function () {

  it("hvis et tal, returnerer det", function () {
    prompt.returns("123");
    assert.strictEqual(readNumber(), 123);
  });

  it("hvis 0, returnerer det", function () {
    prompt.returns("0");
    assert.strictEqual(readNumber(), 0);
  });

  it("fortsætter løkken indtil et tal indtastes", function () {
    prompt.onCall(0).returns("ikke et tal");
    prompt.onCall(1).returns("ikke et tal igen");
    prompt.onCall(2).returns("1");
    assert.strictEqual(readNumber(), 1);
  });

  it("hvis en tom linje, returnerer null", function () {
    prompt.returns("");
    assert.isNull(readNumber());
  });

  it("hvis annuller, returnerer null", function () {
    prompt.returns(null);
    assert.isNull(readNumber());
  });

});
