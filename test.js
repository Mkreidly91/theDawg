const { es } = require("date-fns/locale");

const txt =
  "1:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "2:  **Metallica: Nothing Else Matters (Official Music Video)** by **Metallica**\n" +
  "3:  **Metallica: Enter Sandman (Official Music Video)** by **Metallica**\n" +
  "4:  **Fade To Black (Remastered)** by **Metallica - Topic**\n" +
  "5:  **Master Of Puppets (Remastered)** by **Metallica - Topic**\n" +
  "6:  **Metallica.   The Unforgiven ( I, II,  III)** by **Vitaly Krokus**\n" +
  "7:  **Metallica - Whiskey In The Jar (Official Music Video)** by **Warner Records Vault**\n" +
  "8:  **Metallica: Turn the Page (Official Music Video)** by **Metallica**\n" +
  "9:  **Metallica - The Day That Never Comes (Official Music Video)** by **Warner Records Vault**\n" +
  "10:  **Metallica: The Unforgiven (Official Music Video)** by **Metallica**\n" +
  "11:  **Nirvana - Smells Like Teen Spirit (Official Music Video)** by **NirvanaVEVO**\n" +
  "12:  **Metallica: Until It Sleeps (Official Music Video)** by **Metallica**\n" +
  "13:  **Guns N' Roses - November Rain** by **GunsNRosesVEVO**\n" +
  "14:  **Metallica: The Memory Remains (Official Music Video)** by **Metallica**\n" +
  "15:  **Metallica - The Unforgiven II (Official Music Video)** by **Warner Records Vault**\n" +
  "16:  **AC/DC - Thunderstruck (Official Video)** by **acdcVEVO**\n" +
  "17:  **Metallica: Sad But True (Official Music Video)** by **Metallica**\n" +
  "18:  **The Unforgiven I,II,III** by **Ricky II**\n" +
  "19:  **Metallica: The Unforgiven II (Official Music Video)** by **Metallica**\n" +
  "20:  **System Of A Down - Aerials (Official HD Video)** by **systemofadownVEVO**\n" +
  "21:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "22:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "23:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "24:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "25:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "26:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "27:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "28:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "29:  **Metallica: One (Official Music Video)** by **Metallica**\n" +
  "30:  **Metallica: One (Official Music Video)** by **Metallica**";

const arrOfSongs = txt.split("\n");

const splitMsg = (txt) => {
  const arr = txt.split("\n");
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

const final = splitMsg(txt2);
final.forEach((e) => console.log(e.length));
