describe("ucFirst", function () {
  it('Stort begyndelsesbogstav', function () {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Fejler ikke ved en tom streng", function () {
    assert.strictEqual(ucFirst(""), "");
  });
});