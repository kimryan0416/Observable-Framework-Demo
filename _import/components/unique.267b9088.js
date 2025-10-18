export function unique(array) {
  return array.filter((v, i) => array.indexOf(v) === i);
}