// create an array called numberOfPages
// this array is made of multiple array called 'group10Tab'
// in each 'group10Tab' the number of elements is the number of pages total (will be 10, except for the last one)
// and each element is the specific page number

// EXAMPLE if there are 1150 results and there are 50 results per page
// let numberOfPages = [
//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
//   [21, 22, 23],
// ];

const handleNumberOfPages = (counts, limit) => {
  const numberOfPagesTotal = Math.ceil(counts / limit);
  let numberOfPages = [];
  let group10Tab = [];
  for (let i = 1; i <= numberOfPagesTotal; i++) {
    if (group10Tab.length === 0) {
      group10Tab.push(i);
    } else if (i === numberOfPagesTotal) {
      group10Tab.push(i);
      numberOfPages.push(group10Tab);
    } else if (group10Tab.length % 10 !== 0) {
      group10Tab.push(i);
    } else {
      numberOfPages.push(group10Tab);
      group10Tab = [];
      group10Tab.push(i);
    }
  }
  return numberOfPages;
};

export default handleNumberOfPages;
