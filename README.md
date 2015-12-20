# kerfuffle

Have movie/book/show lists, but don't know what to consume next? Let this pick for you! 

Currently supports Wunderlist as a source, but it would be possible to add more (such as Evernote, for example).

## Running it yourself

1. Create a [Wunderlist app](https://developer.wunderlist.com/apps/new). When that's done, click "CREATE ACCESS TOKEN" and note that, along with the `CLIENT ID`.
2. Create a [trakt app](https://trakt.tv/oauth/applications/new) and note the `Client ID`.
3. Replace the keys in `.env.example` with the 3 you just created and rename the file `.env`.
4. Modify `config.js` to have the id for each of the lists you want Kerfuffle to access and the appropriate handler.
5. If your keys and configs are correct you should be all set to run it! Give `npm start` a whirl. 

