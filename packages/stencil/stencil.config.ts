import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'nasa-ado-stencil',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
  ],
};