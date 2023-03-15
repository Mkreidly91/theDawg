const splitMsg = (string) => {
  const arr = string.split("\n");
  const LINE_BREAK = 1;
  let i = 0;
  let finalArr = [];
  let str = "";

  while (i !== arr.length) {
    const isLastElement = i === arr.length - 1;

    if (str.length + arr[i].length + LINE_BREAK <= 2000) {
      str = isLastElement ? str.concat(arr[i]) : str.concat(arr[i], "\n");
      if (isLastElement) {
        finalArr.push(str);
      }
    } else {
      finalArr.push(str);
      str = "";
    }
    i++;
  }

  return finalArr;
};

module.exports = { splitMsg };
