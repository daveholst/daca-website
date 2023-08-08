# DACA Tours Website ver2

Rebuild of the website from a wordpress site to next.js on AWS to bring down costs and enable myself to work on it without crying.

## TODO

- [ ] Fix the DACA Logo up [change to SVG, where? Redo>]
- [ ] Optimize all the LARGE images :sweat:

## AWS CDK

From root
`cdk synth` - build the cloudformation files from the typescript + CDK
`cdk bootstrap` - creates the initial resources in AWS - I think these are just the resources for CDK / cloudformation to actually deploy to AWS. So I think you only have to bootstrap the 'account' once
`cdk deploy` - deploys the actual resources
`cdk destroy` - rips down all the resources/stack
