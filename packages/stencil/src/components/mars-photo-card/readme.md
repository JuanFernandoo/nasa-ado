# mars-photo-card



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute     | Description | Type      | Default     |
| ------------------------- | ------------- | ----------- | --------- | ----------- |
| `cameraName` _(required)_ | `camera-name` |             | `string`  | `undefined` |
| `earthDate` _(required)_  | `earth-date`  |             | `string`  | `undefined` |
| `favorited`               | `favorited`   |             | `boolean` | `false`     |
| `imgSrc` _(required)_     | `img-src`     |             | `string`  | `undefined` |
| `roverName` _(required)_  | `rover-name`  |             | `string`  | `undefined` |
| `sol` _(required)_        | `sol`         |             | `number`  | `undefined` |


## Events

| Event            | Description | Type                                                |
| ---------------- | ----------- | --------------------------------------------------- |
| `favoriteToggle` |             | `CustomEvent<{ sol: number; favorited: boolean; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
