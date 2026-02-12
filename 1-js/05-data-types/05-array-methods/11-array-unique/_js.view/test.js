describe("unique", function () {
  it("fjerner ikke-unikke elementer", function () {
    let strings = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    assert.deepEqual(unique(strings), ["Hare", "Krishna", ":-O"]);
  });

  it("ændrer ikke det oprindelige array", function () {
    let strings = ["Krishna", "Krishna", "Hare", "Hare"];
    unique(strings);
    assert.deepEqual(strings, ["Krishna", "Krishna", "Hare", "Hare"]);
  });
});
