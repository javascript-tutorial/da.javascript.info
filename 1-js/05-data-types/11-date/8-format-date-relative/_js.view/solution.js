
function formatDate(date) {
  let diff = new Date() - date; // forskel i millisekunder

  if (diff < 1000) { // under en sekund
    return 'lige nu';
  }

  let sec = Math.floor(diff / 1000); // konverter forskellen til sekunder

  if (sec < 60) {
    return sec + ' sekunder siden';
  }

  let min = Math.floor(diff / 60000); // konverter forskellen til minutter
  if (min < 60) {
    return min + ' minutter siden';
  }

  // formater dato
  // tilføj foranstående nuller til en-sifret dag/måned/timer/minutes
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // tag de sidste 2 cifre af hvert komponent

  // flet komponenterne sammen til en dato
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
