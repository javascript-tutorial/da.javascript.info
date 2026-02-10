describe("Accumulator", function () {

  beforeEach(function () {
    sinon.stub(window, "prompt")
  });

  afterEach(function () {
    prompt.restore();
  });

  it("initialiseret værdi er argumentet for konstruktøren", function () {
    let accumulator = new Accumulator(1);

    assert.equal(accumulator.value, 1);
  });

  it("efter at have læst 0, er værdien 1", function () {
    let accumulator = new Accumulator(1);
    prompt.returns("0");
    accumulator.read();
    assert.equal(accumulator.value, 1);
  });

  it("efter at have læst 1, er værdien 2", function () {
    let accumulator = new Accumulator(1);
    prompt.returns("1");
    accumulator.read();
    assert.equal(accumulator.value, 2);
  });
});
