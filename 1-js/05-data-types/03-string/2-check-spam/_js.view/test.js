describe("checkSpam", function () {
  it('finder spam i "buy ViAgRA now"', function () {
    assert.isTrue(checkSpam('buy ViAgRA now'));
  });

  it('finder spam i "free xxxxx"', function () {
    assert.isTrue(checkSpam('free xxxxx'));
  });

  it('ingen spam i "innocent rabbit"', function () {
    assert.isFalse(checkSpam('innocent rabbit'));
  });
});