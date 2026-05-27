import { p as promiseResolve, b as bootstrapLazy } from './index-gJWNLgIu.js';
export { s as setNonce } from './index-gJWNLgIu.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

/*
 Stencil Client Patch Browser v4.43.4 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["apod-card",[[513,"apod-card",{"imageUrl":[1,"image-url"],"cardTitle":[1,"card-title"],"date":[1],"copyright":[1],"isVideo":[4,"is-video"]}]]],["mars-photo-card",[[513,"mars-photo-card",{"imgSrc":[1,"img-src"],"cameraName":[1,"camera-name"],"earthDate":[1,"earth-date"],"sol":[2],"roverName":[1,"rover-name"],"favorited":[1028]}]]],["neo-badge",[[513,"neo-badge",{"name":[1],"hazardous":[4],"distanceKm":[2,"distance-km"],"velocityKph":[2,"velocity-kph"]}]]]], options);
});
