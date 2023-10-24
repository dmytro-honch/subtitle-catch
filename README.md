Hi there, this is a simple local tool for testing hls streams with subtitles to check issues in CC, Forced Narratives and Subtitles.

## steps to use:
1. run `npm i`
2. run `npm start`
3. open `https://localhost:3000/enter` in browser and allow access for SSL certificate
4. in your local Player change player.sourceConfig.hls url to `https://localhost:3000/enter`

in source_folder you can find manifests and subtitles files for testing
you can change them by our own files, or you can make a new folder and change path in `server.js` file
