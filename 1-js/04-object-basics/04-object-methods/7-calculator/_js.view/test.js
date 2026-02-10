

describe("lommeregner", function () {

  context("når 2 og 3 indtastes", function () {
    beforeEach(function () {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      calculator.read();
    });

    afterEach(function () {
      prompt.restore();
    });

    it('read metoden får to værdier og gemmer dem som egenskaber i objektet', function () {
      assert.equal(calculator.a, 2);
      assert.equal(calculator.b, 3);
    });

    it("summen er 5", function () {
      assert.equal(calculator.sum(), 5);
    });

    it("produktet af multiplikationen er 6", function () {
      assert.equal(calculator.mul(), 6);
    });
  });

});
