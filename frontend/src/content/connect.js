// Words for the Connect page (the destination of every "Book Jean Claude" button).
//
// PROVISIONAL (confirm with the owner):
//  - The reply promise ("within two working days") and the email address (contact@jcmuhire.com,
//    in content/site.js `footer.email`) are placeholders from the brief.
//  - The privacy sentence below is our wording. The owner must confirm it is true and that a
//    privacy policy exists before launch.
//  - Headline, intro and the three "what happens next" steps are written by us.
import { footer } from './site'

export const connectHero = {
  label: 'Connect',
  headline: 'Bring the story to your stage.',
  accent: 'your stage',
  intro: 'Tell us about your event. The more you share, the better Jean Claude can shape the presentation to your room.',
}

export const connectForm = {
  title: 'Book Jean Claude',
  fields: {
    name: 'Your name',
    organisation: 'Organisation',
    eventDate: 'Event date',
    eventDateHint: 'Leave empty if it is not fixed yet.',
    audience: 'Who is the audience?',
    message: 'Tell us about your event',
  },
  audienceOptions: ['NGO', 'Hospital', 'School', 'Something else'],
  submit: 'Book Jean Claude',
  privacy: 'We use your details only to reply to your enquiry.',
}

export const reply = {
  // provisional
  promise: 'Jean Claude replies within two working days.',
}

export const nextSteps = {
  heading: 'What happens next',
  items: [
    { number: '01', title: 'You send the form', text: 'It takes two minutes.' },
    { number: '02', title: 'Jean Claude replies', text: reply.promise },
    { number: '03', title: 'You shape it together', text: 'He tailors the presentation to your room and your people.' },
  ],
}

export const directContact = {
  label: 'Prefer email?',
  email: footer.email, // provisional, see content/site.js
}
