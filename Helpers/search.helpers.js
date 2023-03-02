const Fuse = require("fuse.js");

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

const getBestLyrics = (results, targetSong) => {
  let { title, by } = targetSong;
  const options = {
    includeScore: true,

    keys: ["fullTitle", "title", "artist.name"],
    ignoreLocation: false,
  };

  const fuse = new Fuse(results, options);
  const query = {
    $and: [
      {
        $path: "artist.name",
        $val: by,
      },
      {
        title: title,
      },
      {
        fullTitle: `${title} ${by}`,
      },
    ],
  };

  let fuseResults = fuse.search(query);

  if (fuseResults.length === 0) {
    fuseResults = fuse.search(`${title} ${by}`);
  }

  // title = title.toLowerCase();
  // by = by.toLowerCase();
  // by = by.includes("-") ? by.split("-") : by.split(" ");
  // const joinedTitle = title.split(" ").join("");
  // const joinedBy = by.join("");

  // const titleRegx = new RegExp(`${title}|${joinedTitle}`, "g");
  // const artistRegx = new RegExp(`${by[0]}|${joinedBy}`, "g");

  // if (results.length === 1) {
  //   return results[0];
  // }
  // const bestMatch = results.filter((song) => {
  //   let {
  //     artist: { name },
  //     title,
  //     fullTitle,
  //   } = song;
  //   name = name.toLowerCase();
  //   title = title.toLowerCase();
  //   fullTitle = fullTitle.toLowerCase();
  //   const match =
  //     (name.match(artistRegx) && title.match(titleRegx)) ||
  //     (fullTitle.match(artistRegx) && fullTitle.match(titleRegx));

  //   if (match) {
  //     return song;
  //   }
  // });

  if (fuseResults[0]) {
    const { refIndex } = fuseResults[0];
    return results[refIndex];
  } else {
    return null;
  }
};
module.exports = { getBestSong, getBestLyrics };
