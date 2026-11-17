// Page titles and descriptions for the running site, built from the same content files the
// pages use. See pageMeta.js for the full explanation.
import story from './data/story.json'
import speaking from './data/speaking.json'
import beyond from './data/beyond.json'
import trusted from './data/trusted.json'
import connect from './data/connect.json'
import privacy from './data/privacy.json'
import { buildPageMeta } from './pageMeta'

export { notFound } from './pageMeta'

export const pageMeta = Object.fromEntries(
  buildPageMeta({ story, speaking, beyond, trusted, connect, privacy }).map((p) => [p.path, p]),
)
