Ja, det er lidt mærkeligt.

Men `instanceof` bryder sig ikke om funktionen, men snarere om dens `prototype`, som den matcher mod prototype-kæden.

Og her er `a.__proto__ == B.prototype`, så `instanceof` returnerer `true`.

Så, hvis man følger logikken for `instanceof`, så definerer `prototype` faktisk typen, ikke constructor-funktionen.
