
function filterRange(arr, a, b) {
  // tilføjer krøllede parenteser omkring udtrykket for bedre læsbarhed
  return arr.filter(item => (a <= item && item <= b));
}