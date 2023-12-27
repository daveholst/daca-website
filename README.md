# DACA Tours Website ver2

Rebuild of the website from a wordpress site to next.js on AWS to bring down costs and enable myself to work on it without crying.

## TODO

- [ ] Fix the DACA Logo up [change to SVG, where? Redo>]
- [ ] Optimize all the LARGE images :sweat:
- [ ] :bug: clicking on home after load goes to the bottom of the

## Running locally

Your terminal will need to be assumed into the appropriate AWS profile. In my case this is `cdk-admin`. This is because it uses SST special sauce (owned infra to grab things).

## Secrets, How do they work?

I'm using SST secrets on this one. I think it just throws them into an AWS service (Secrets Manager? :shrug:) under the hood.

You can add a secret with - the default stage is `local`... i think.
`pnpm sst secrets`

To add the secrets into the prod stage you can use the following:
`pnpm sst secrets set YOUTUBE_API_KEY <key> --stage prod`

Currently the required secrets are:
`YOUTUBE_API_KEY` for getting all the daca youtube channel videos for the `/videos/` route.

## Deploying

Next app builds with SST and open next. Prod deploys with `pnpm deploy:prod`
