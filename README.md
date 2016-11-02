# kerfuffle

[![David](https://img.shields.io/david/xavdid/kerfuffle.svg)](https://david-dm.org/xavdid/kerfuffle)

Have movie/book/show lists, but don't know what to consume next? Let this pick for you!

Currently supports Wunderlist as a data source. Other sources (such as Evernote, for example) may be added in the future.

## Image Sources

All of the tv and movie images are graciously taken with permission.

![logo](https://i.imgur.com/4jK5PTR.png)

**This product uses the TMDb API but is not endorsed or certified by TMDb.**

## Running it yourself

> "I want to use this for my media, not yours!"

You can do that! Just fork it and follow these instructions.

1. Create a [Wunderlist app](https://developer.wunderlist.com/apps/new). When that's done, click "CREATE ACCESS TOKEN" and note that, along with the `CLIENT ID`.
2. Create a [tmdb API key](https://www.themoviedb.org/faq/api).
3. Replace the keys in `.env.example` with the 3 you just created and rename the file `.env`.
4. Modify `config.js` to have the id for each of the lists you want Kerfuffle to access and the appropriate handler.
5. If your keys and configs are correct you should be all set to run it! Give `npm start` a whirl.

## Other features

Once upon a time, given a tv show, this app picked you a random episode to watch. That functionality could come back at some point, but I wanted to go in a more immediately useful direction.
