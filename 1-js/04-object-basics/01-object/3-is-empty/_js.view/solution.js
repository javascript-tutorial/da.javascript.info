function isEmpty(obj) {
  for (let key in obj) {
    // hvis løkken er startet, er der en egenskab
    return false;
  }
  return true;
}
