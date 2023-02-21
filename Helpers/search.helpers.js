const getBestSong = (results) => {
  if (results.length === 1) {
    return results[0];
  } else {
    const bestResults = results.filter((song) => {
      const {
        channel: { verified, artist },
        i,
      } = song;

      if (verified && artist && !song.title.toLowerCase().includes("cover")) {
        return song;
      }
    });

    if (bestResults[0]) {
      return bestResults[0];
    } else {
      return results[0];
    }
  }
};

const getBestLyrics = (results, currentSong) => {
  let { title, by } = currentSong;
  title = title.toLowerCase();
  by = by.toLowerCase();

  const joinedTitle = title.split(" ").join("");
  const joinedBy = by.split(" ").join("");

  const titleRegx = new RegExp(`${title}|${joinedTitle}`, "g");
  const artistRegx = new RegExp(`${by.split(" ")[0]}|${joinedBy}`, "g");

  if (results.length === 1) {
    return results[0];
  }
  const bestMatch = results.filter((song) => {
    let {
      artist: { name },
      title,
      fullTitle,
    } = song;
    name = name.toLowerCase();
    title = title.toLowerCase();
    fullTitle = fullTitle.toLowerCase();
    const match =
      (name.match(artistRegx) && title.match(titleRegx)) ||
      (fullTitle.match(artistRegx) && fullTitle.match(titleRegx));

    if (match) {
      return song;
    }
  });

  if (bestMatch[0]) {
    return bestMatch[0];
  } else {
    return null;
  }
};
module.exports = { getBestSong, getBestLyrics };
