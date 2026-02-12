function camelize(str) {
  return str
    .split('-') // splitter 'mit-lange-ord' til array ['mit', 'lange', 'ord']
    .map(
      // gør første bogstav stort i alle array-elementer undtagen det første
      // konverterer ['mit', 'lange', 'ord'] til ['mit', 'Lange', 'Ord']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // samler ['mit', 'Lange', 'Ord'] til 'mitLangeOrd'
}
