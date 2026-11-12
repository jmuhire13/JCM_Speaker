// Words for the Privacy policy page (/privacy), linked from the footer and the booking form.
// The data lives in data/privacy.json (edited at /admin).
//
// PROVISIONAL (the owner must read and confirm every line before launch):
//  - This is plain-language wording written by us from what the site really does. It is not
//    legal advice and no lawyer has reviewed it.
//  - Every statement must stay TRUE. If the site changes (analytics added, a new form service,
//    more videos, a newsletter), update this page in the same change.
//  - "How long we keep it" and "Your choices" are promises the owner has to be able to keep.
//
// What the site does today (checked in the code, Nov 2026):
//  - The booking form posts to Formspree, which emails the owner's Gmail and keeps a copy.
//  - contact@jcmuhire.com is forwarded to that Gmail by Cloudflare Email Routing.
//  - Cloudflare hosts the site. No analytics, no advertising, no cookies set by our code.
//  - The video cover image comes from YouTube when it scrolls into view; the player loads
//    only on click, from youtube-nocookie.com.
import data from './data/privacy.json'
import { footer } from './site'

export const privacy = { ...data.privacy, email: footer.email }
