const { cdk8s } = require('projen');
const project = new cdk8s.Cdk8sTypeScriptApp({
  defaultReleaseBranch: 'main',
  name: 'otel',
  cdk8sVersion: '2.3.16',
  cdk8sCliVersion: '2.0.44',
  constructsVersion: '10.1.12',

  deps: [
    '@types/jest',
    '@types/node',
    'cdk8s@^2.2.87',
    'cdk8s-cli',
    'cdk8s-plus-22',
    'cdk8s-plus-23',
    'cdk8s-plus-24',
    'constructs',
    'lerna@^4',
    'semver',
    'ts-jest',
    'typescript',
    'constructs@^10.1.12',
    'js-yaml',
    '@types/js-yaml',
  ],

  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});


project.synth();