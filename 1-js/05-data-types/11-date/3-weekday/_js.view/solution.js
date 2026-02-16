function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // ugedage 0 (søndag) er 7 i europæiske lande
    day = 7;
  }

  return day;
}
