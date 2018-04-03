# kerfuffle

[![David](https://img.shields.io/david/xavdid/kerfuffle.svg)](https://david-dm.org/xavdid/kerfuffle)

Have movie/book/show lists, but don't know what to consume next? Let this pick for you!

Currently supports Airtable as a data source. It could probably be configured to use something else, too. 

## Image Sources

All of the tv and movie images are graciously taken with permission.

![logo](https://i.imgur.com/4jK5PTR.png)

**This product uses the TMDb API but is not endorsed or certified by TMDb.**

## Running it yourself

> "I want to use this for my media, not yours!"

You can do that! Just fork it and follow these instructions.

1. Get your [Airtable API Key](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-).
2. Create a [tmdb API key](https://www.themoviedb.org/faq/api).
3. Replace the keys in `.env.example` with the 3 you just created and rename the file `.env`.
4. Modify `config.js` to have the id for each of the bases you want Kerfuffle to access and the appropriate handler.
5. If your keys and configs are correct you should be all set to run it! Give `npm start` a whirl.

## Other features

Once upon a time, given a tv show, this app picked you a random episode to watch. That functionality could come back at some point, but I wanted to go in a more immediately useful direction.
