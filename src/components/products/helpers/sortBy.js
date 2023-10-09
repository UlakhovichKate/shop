export default function sortByAll(object, type) {
  object.sort(function (a, b) {
    if (type === 'title') {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    } else if (type === 'minPrice') {
      return b.price - a.price;
    } else {
      return a.price - b.price;
    }
  });
}
