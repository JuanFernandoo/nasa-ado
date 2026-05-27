'use strict';

var index = require('./index-D0vIrhFF.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["apod-card.cjs",[[513,"apod-card",{"imageUrl":[1,"image-url"],"cardTitle":[1,"card-title"],"date":[1],"copyright":[1],"isVideo":[4,"is-video"]}]]],["mars-photo-card.cjs",[[513,"mars-photo-card",{"imgSrc":[1,"img-src"],"cameraName":[1,"camera-name"],"earthDate":[1,"earth-date"],"sol":[2],"roverName":[1,"rover-name"],"favorited":[1028]}]]],["neo-badge.cjs",[[513,"neo-badge",{"name":[1],"hazardous":[4],"distanceKm":[2,"distance-km"],"velocityKph":[2,"velocity-kph"]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
