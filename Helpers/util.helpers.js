const splitMsg = (string) => {
  const arr = string.split("\n");
  const LINE_BREAK = 1;
  let i = 0;
  let finalArr = [];
  let str = "";
  // arr.forEach((element, index) => {
  while (i !== arr.length) {
    const isLastElement = i === arr.length - 1;

    if (str.length + arr[i].length + LINE_BREAK <= 2000) {
      str = isLastElement ? str.concat(arr[i]) : str.concat(arr[i], "\n");
      // str = isLastElement ? str.concat(element) : str.concat(element, "\n");

      if (isLastElement) {
        finalArr.push(str);
        // i++;
        // return;
      }
    } else {
      finalArr.push(str);
      str = "";
    }
    i++;
  }
  // });
  finalArr.forEach((e) => console.log(e.length));
  return finalArr;
};

module.exports = { splitMsg };
