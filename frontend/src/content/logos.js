// Organisations and programmes shown in the logo walls (Home, and the Trusted By page).
// Logos are trimmed and resized webp files in src/assets/logos/.
//
// The first 12 were confirmed by the owner as organisations that hosted Jean Claude.
// The 8 added later (Appalachian State University, Town of Boone, The Queen's Young Leaders,
// ONDE Maroc, Global Youth Connect, Global Dialogues, Segal Family Foundation, Rocena Kidney
// Foundation) were added at the user's request. CONFIRM with the owner exactly how each one is
// connected (host, honour, partner, funder) and that he is happy to show it. Because the
// relationships differ, the wording on the page says "worked with, hosted by, or honoured by"
// instead of only "hosted".
//
// To fix before launch: the UNESCO file carries a "cleanpng" watermark. Low-resolution files
// (ask for better ones): Mandela Washington Fellowship, Africa Youth Awards, Policy Center for
// the New South, Front Line Defenders, Global Youth Connect, Rocena Kidney Foundation.
import unesco from '../assets/logos/unesco.webp'
import africanUnion from '../assets/logos/african-union.webp'
import tedx from '../assets/logos/tedx.webp'
import mandelaWashington from '../assets/logos/mandela-washington-fellowship.webp'
import appalachianState from '../assets/logos/appalachian-state.webp'
import cncdh from '../assets/logos/cncdh.webp'
import parisPeaceForum from '../assets/logos/paris-peace-forum.webp'
import queensYoungLeaders from '../assets/logos/queens-young-leaders.webp'
import frontLineDefenders from '../assets/logos/front-line-defenders.webp'
import globalDialogues from '../assets/logos/global-dialogues.webp'
import policyCenter from '../assets/logos/policy-center-new-south.webp'
import townOfBoone from '../assets/logos/town-of-boone.webp'
import segalFamily from '../assets/logos/segal-family-foundation.webp'
import ondeMaroc from '../assets/logos/onde-maroc.webp'
import kidneyFoundation from '../assets/logos/kidney-foundation.webp'
import rocenaKidney from '../assets/logos/rocena-kidney-foundation.webp'
import africaYouthAwards from '../assets/logos/africa-youth-awards.webp'
import globalYouthConnect from '../assets/logos/global-youth-connect.webp'
import csed from '../assets/logos/csed.webp'
import effect250 from '../assets/logos/250-effect.webp'

export const logos = [
  { name: 'UNESCO', src: unesco },
  { name: 'African Union', src: africanUnion },
  { name: 'TEDx', src: tedx },
  { name: 'Mandela Washington Fellowship', src: mandelaWashington },
  { name: 'Appalachian State University', src: appalachianState },
  { name: "Commission nationale consultative des droits de l'homme (CNCDH)", src: cncdh },
  { name: 'Forum de Paris sur la Paix', src: parisPeaceForum },
  { name: "The Queen's Young Leaders", src: queensYoungLeaders },
  { name: 'Front Line Defenders', src: frontLineDefenders },
  { name: 'Global Dialogues', src: globalDialogues },
  { name: 'Policy Center for the New South', src: policyCenter },
  { name: 'Town of Boone, North Carolina', src: townOfBoone },
  { name: 'Segal Family Foundation', src: segalFamily },
  { name: "ONDE Maroc (Observatoire national des droits de l'enfant)", src: ondeMaroc },
  { name: 'Kidney Foundation of Canada', src: kidneyFoundation },
  { name: 'Rocena Kidney Foundation', src: rocenaKidney },
  { name: 'Africa Youth Awards', src: africaYouthAwards },
  { name: 'Global Youth Connect', src: globalYouthConnect },
  { name: 'CSED', src: csed },
  { name: '250 Effect', src: effect250 },
]
