const Fuse = require("fuse.js");

const getBestSong = (args, results) => {
  if (results.length === 1) {
    return results[0];
  } else {
    const bestResults = results.filter((song) => {
      const {
        channel: { verified, artist },
        i,
      } = song;
      const isCover = song.title.toLowerCase().includes("cover");
      const containsArgs = song.title.toLowerCase().includes(args);
      if (verified && artist && !isCover && containsArgs) {
        return song;
      }
    });
    console.log(bestResults);
    if (bestResults[0]) {
      return bestResults[0];
    } else {
      return results[0];
    }
  }
};

module.exports = { getBestSong };
