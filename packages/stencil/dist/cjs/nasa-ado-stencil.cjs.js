'use strict';

var index = require('./index-D0vIrhFF.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/*
 Stencil Client Patch Browser v4.43.4 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('nasa-ado-stencil.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["apod-card.cjs",[[513,"apod-card",{"imageUrl":[1,"image-url"],"cardTitle":[1,"card-title"],"date":[1],"copyright":[1],"isVideo":[4,"is-video"]}]]],["mars-photo-card.cjs",[[513,"mars-photo-card",{"imgSrc":[1,"img-src"],"cameraName":[1,"camera-name"],"earthDate":[1,"earth-date"],"sol":[2],"roverName":[1,"rover-name"],"favorited":[1028]}]]],["neo-badge.cjs",[[513,"neo-badge",{"name":[1],"hazardous":[4],"distanceKm":[2,"distance-km"],"velocityKph":[2,"velocity-kph"]}]]]], options);
});

exports.setNonce = index.setNonce;
