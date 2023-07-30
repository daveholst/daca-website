export default function cloudfrontLoader({ src, width, quality }) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto']
  //TODO: change me when a domain is setup
  // This is just stripping out query params that we aren't using on cloudfront
  // return `https://d3nq3ed4qzq05o.cloudfront.net${src}`
  return `${src}`
}
