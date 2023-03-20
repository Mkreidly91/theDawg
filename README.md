# Description

A music player discord bot created with Discord.js

# Commands

**Prefix**: -

## Mod Commands:

- ### mute/unmute:

  **Description**: Mute/Unmute member(s) of the guild.
  **Usage**: -mute <@user> or -unmute <@user>

- ### deafen/undeafen:

  **Description**: Deafen/Undeafen member(s) of the guild.
  **Usage**: -deafen <@user> or -undeafen <@user>

- ### nuke:
  **Description**: Delete messages from a text channel.
  **Usage**: -nuke \<number between 1 and 100>

## Music Player Commands:

- ### play:

  **Description**: play a song of your choosing. This command can take a search string, or a youtube url (compatible with videos and playlists).
  **Usage**: -play \<search string or URL>

- ### pause:
  **Description**: Pauses playback.
  **Usage**: -pause
- ### resume:

  **Description**: Resumes playback.
  **Usage**: -resume

- ### stop:
  **Description**: Stops playback and leaves the voice channel.
  **Usage**: -stop
- ### seek:
  **Description**: Seeks to a specified time in the song in seconds.
  **Usage**: -seek \<timeInSeconds>
- ### skip:
  **Description**: Skips the current song.
  **Usage**: -skip
- ### radio:
  **Description**: Populates the queue with relevant songs based on what's currently playing.
  **Usage**: -radio
- ### queue:

  **Description**: Prints out the queued songs.
  **Usage**: -queue

- ### search:

  **Description**: Takes a search string, then presents the user with a list of songs to choose from.
  **Usage**: -search \<search string>

- ### lyrics:
  **Description**: Takes a search string, then presents the user with a list of songs to choose from. If not given an argument, it will return the lyrics of what's currently playing.
  **Usage**: -lyrics \<search string> or -lyrics
