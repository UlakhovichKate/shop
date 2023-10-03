export default function sortByPrice(object, type) {
  object.sort(function (a, b) {
    if (type === 'min') {
      return b.price - a.price;
    } else {
      return a.price - b.price;
    }
  });
}
