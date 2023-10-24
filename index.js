import express from 'express';
import https from 'https';
import fs from 'fs';
import makeCert from 'make-cert';
import path from 'path';

const { key, cert } = makeCert('localhost')

const app = express();

const server = https.createServer({ key, cert, header: {
  'Access-Control-Allow-Origin': '*'
} }, app);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next();
});

/**
 * Entry point for the player, it will get the Manifest file from source_folder
 * If you use HTTPS - don't forget to open https://localhost:3001/enter in your browser and accept the self-signed certificate
 * and each time reload the page - you will need to accept the certificate again
 * If you use pure HTTP - just change import to HTTP and use http.createServer
 */
app.get('/enter', function (req, res) {
  fs.readFile("source_folder/index.m3u8", 'utf8', function (err, data) {
    console.log(err, data);
    res.header('Access-Control-Allow-Origin', '*');
    res.end(data);
  });
})


/**
 * Here you have to put the url of Manifest file of the video you want to play, but without "/index.m3u8" part
 * @type {string}
 */
const baseUrl = '';


/**
 * This is where the player will get the Manifest files for Subtitles - in source_folder
 */
app.get('/sub/*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const fileName = path.parse(req.url).base;

  fs.readFile("source_folder/"+ fileName, 'utf8', function (err, data) {
    console.log( "source_folder/"+ fileName + '\n\n\n\n' );
    res.end( data );
  });
});


/**
 * This is the route that will be called by the player to get the Video and audio files, so it just redirects to the CDN
 */
app.get('/video/*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.redirect(baseUrl + req.url);
});
app.get('/audio/*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.redirect(baseUrl + req.url);
});

server.listen(3001, () => { console.log('listening on 3001') });
