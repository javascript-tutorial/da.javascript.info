describe("test", function() {
  
   // Mocha plejer normalt at vente i 2 sekunder på testene, før den betragter dem som forkerte
  
  this.timeout(200000); // Med denne kode øger vi denne - i dette tilfælde til 200.000 millisekunder

  // Dette skyldes "alert"-funktionen, fordi hvis du forsinker tryk på "OK"-knappen, vil testene ikke bestå!
  
  before(() => alert("Testning startet – før alle tests"));
  after(() => alert("Testning færdig – efter alle tests"));

  beforeEach(() => alert("Før en test – ind i en test"));
  afterEach(() => alert("Efter en test – ud af en test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
