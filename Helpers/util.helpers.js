const splitMsg = (string) => {
  const arr = string.split("\n");
  let i = 0;
  let finalArr = [];
  let str = "";
  arr.forEach((element, index) => {
    while (i !== arr.length) {
      const isLastElement = i === arr.length - 1;
      if (str.length + element.length < 2000) {
        str = isLastElement ? str.concat(arr[i]) : str.concat(arr[i], "\n");
        if (isLastElement) {
          finalArr.push(str);
          i++;
          return;
        }
      } else {
        finalArr.push(str);
        str = "";
        return;
      }
      i++;
    }
  });

  return finalArr;
};

module.exports = { splitMsg };
