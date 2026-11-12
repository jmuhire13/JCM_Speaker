// Words for the Connect page (the destination of every "Book Jean Claude" button).
// The data lives in data/connect.json (edited at /admin).
//
// PROVISIONAL (confirm with the owner):
//  - The reply promise ("within two working days") and the email address (`footer.email` in
//    data/site.json) are placeholders from the brief.
//  - The privacy sentence is our wording; the privacy policy page is content/privacy.js.
//  - Headline, intro and the three "what happens next" steps are written by us.
import data from './data/connect.json'
import { footer } from './site'

export const connectHero = data.connectHero
export const connectForm = data.connectForm
export const reply = data.reply
export const nextSteps = data.nextSteps
export const directContact = { ...data.directContact, email: footer.email }
