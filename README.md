# Description

A music player discord bot created with Discord.js

# Commands

**Prefix**: -

## Mod Commands:

- ### mute/unmute:

  - **Description**: Mute/Unmute member(s) of the guild.<br>
  - **Usage**: -mute <@user> or -unmute <@user>

- ### deafen/undeafen:

  - **Description**: Deafen/Undeafen member(s) of the guild.<br>
  - **Usage**: -deafen <@user> or -undeafen <@user>

- ### nuke:

  - **Description**: Delete messages from a text channel.<br>
  - **Usage**: -nuke \<number between 1 and 100>

## Music Player Commands:

- ### play:

  - **Description**: play a song of your choosing. This command can take a search string, or a youtube url (compatible with videos and playlists).<br>
  - **Usage**: -play \<search string or URL>

- ### pause:

  - **Description**: Pauses playback.<br>
  - **Usage**: -pause

- ### resume:

  - **Description**: Resumes playback.<br>
  - **Usage**: -resume

- ### stop:

  - **Description**: Stops playback and leaves the voice channel.<br>
  - **Usage**: -stop

- ### seek:

  - **Description**: Seeks to a specified time in the song in seconds.<br>
  - **Usage**: -seek \<timeInSeconds>

- ### skip:

  - **Description**: Skips the current song.<br>
  - **Usage**: -skip

- ### radio:

  - **Description**: Populates the queue with relevant songs based on what's currently playing.<br>
  - **Usage**: -radio

- ### queue:

  - **Description**: Prints out the queued songs.<br>
  - **Usage**: -queue

- ### search:

  - **Description**: Takes a search string, then presents the user with a list of songs to choose from.<br>
  - **Usage**: -search \<search string>

- ### lyrics:

  - **Description**: Takes a search string, then presents the user with a list of songs to choose from. If not given an argument, it will return the lyrics of what's currently playing.<br>
  - **Usage**: -lyrics \<search string> or -lyrics
