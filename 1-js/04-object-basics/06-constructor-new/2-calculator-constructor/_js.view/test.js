
describe("lommeregner", function () {
  let calculator;
  before(function () {
    sinon.stub(window, "prompt")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    calculator = new Calculator();
    calculator.read();
  });

  it("read-metoden spørger efter to værdier ved hjælp af prompt og husker dem i objektets egenskaber", function () {
    assert.equal(calculator.a, 2);
    assert.equal(calculator.b, 3);
  });

  it("når 2 og 3 indtastes, er summen 5", function () {
    assert.equal(calculator.sum(), 5);
  });

  it("når 2 og 3 indtastes, er produktet 6", function () {
    assert.equal(calculator.mul(), 6);
  });

  after(function () {
    prompt.restore();
  });
});
