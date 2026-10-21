// Videos shown on the site. All three were supplied by the owner's team and are public
// YouTube videos from the Rwandan channel ISIMBI TV, in Kinyarwanda. They embed through
// YouTube's privacy-friendly player, loaded only when a visitor clicks play.
//
// PROVISIONAL (confirm with the owner):
//  - The English labels below are OUR reading of the Kinyarwanda titles. We could not watch
//    the videos or read a transcript. Correct them if they are wrong.
//  - These look like news-style features about Jean Claude and Marie Reine (the kidney
//    donation and the wedding), not him presenting on a stage. They are labelled honestly.
//    Replace the Home slot with real stage footage when it exists.
//  - Marie Reine's agreement to show them should be confirmed.
//
// Original titles:
//  _7TwZ2QfoEE  "Nahaye IMPYIKO Fiancé | Abaganga banciye intege ndihambira | Muhire byaramurenze | inkuru yabo yakuriza pe"
//  sqjSPmyxTrI  "NAMUHAYE IMPYIKO NONE MBAYE UMUGORE WE | Muhire na Marie Reine BYABARENZE | Ubu baritegura UBUKWE"
//  Qmg91xO26ms  "UBUKWE BWA YA COUPLE YAHANYE IMPYIKO | AMARANGAMUTIMA YARI MENSHI | MUHIRE NA MARIE REINE BARUSHINZE"

const note = 'Interview in Kinyarwanda'

// Shown under every video, linked to the original on YouTube. The videos belong to this channel,
// so the credit must stay visible. Ask ISIMBI TV for permission, and take a video out of the list
// below straight away if they ask.
export const videoCredit = { prefix: 'Video from', channel: 'ISIMBI TV', suffix: 'on YouTube' }

export const videos = [
  { id: '_7TwZ2QfoEE', label: 'When doctors discouraged them', note },
  { id: 'sqjSPmyxTrI', label: 'The kidney, and the wedding to come', note },
  { id: 'Qmg91xO26ms', label: 'Their wedding', note },
]

export const featuredVideo = videos[0]

export const videoSection = {
  heading: 'Watch their story',
  intro:
    'Features from ISIMBI TV on the kidney donation and the wedding. They are in Kinyarwanda.',
}
