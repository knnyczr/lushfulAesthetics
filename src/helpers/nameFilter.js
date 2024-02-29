export default function nameFilter(name) {
  let splitNameBySpace;

  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  hasWhiteSpace(name)
    ? (splitNameBySpace = name.split(" "))
    : (splitNameBySpace = [name, ""]);

  return { first: splitNameBySpace[0], last: splitNameBySpace[1] };
}
