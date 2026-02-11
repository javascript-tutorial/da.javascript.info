describe("truncate", function () {
  it("Afkort den lange streng til den givne længde (inklusive ellipsen)", function () {
    assert.equal(
      truncate("Det jeg vil fortælle om emnet er følgende:", 20),
      "Det jeg vil fortæll…"
    );
  });

  it("Ændrer ikke korte strenge", function () {
    assert.equal(
      truncate("Hej alle sammen!", 20),
      "Hej alle sammen!"
    );
  });

});
