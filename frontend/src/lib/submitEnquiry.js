// Sending an enquiry. Nothing is ever lost silently:
//  - If a sending service is connected (VITE_ENQUIRY_ENDPOINT in frontend/.env), the form
//    posts to it and reports success only when the service says it received the message.
//  - If it is not connected, or the send fails, the page offers a ready-made email instead.
//
// To connect a service later (for example a form service that emails every enquiry and keeps
// a copy), put its address in frontend/.env as VITE_ENQUIRY_ENDPOINT=... and rebuild.

const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT

export const isConnected = Boolean(endpoint)

export async function submitEnquiry(values) {
  if (!endpoint) return { ok: false, reason: 'not-connected' }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })
    return res.ok ? { ok: true } : { ok: false, reason: 'failed' }
  } catch {
    return { ok: false, reason: 'failed' }
  }
}

// An email the visitor can send themselves, with their answers already written in.
export function mailtoHref(email, values) {
  const subject = `Speaking enquiry from ${values.organisation || values.name || 'a visitor'}`
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || 'not given'}`,
    `Organisation: ${values.organisation}`,
    `Event date: ${values.eventDate || 'not fixed yet'}`,
    `Audience: ${values.audience}`,
    '',
    values.message,
  ].join('\n')
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
