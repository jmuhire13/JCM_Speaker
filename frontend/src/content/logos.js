// Organisations that have hosted Jean Claude (confirmed by the owner).
// Logos are trimmed and resized webp files in src/assets/logos/.
// To fix before launch: the UNESCO file carries a "cleanpng" watermark, and the
// Mandela Washington Fellowship, Africa Youth Awards, Policy Center for the New
// South and Front Line Defenders files are low resolution. Ask for better ones.
import unesco from '../assets/logos/unesco.webp'
import africanUnion from '../assets/logos/african-union.webp'
import tedx from '../assets/logos/tedx.webp'
import mandelaWashington from '../assets/logos/mandela-washington-fellowship.webp'
import cncdh from '../assets/logos/cncdh.webp'
import parisPeaceForum from '../assets/logos/paris-peace-forum.webp'
import frontLineDefenders from '../assets/logos/front-line-defenders.webp'
import policyCenter from '../assets/logos/policy-center-new-south.webp'
import kidneyFoundation from '../assets/logos/kidney-foundation.webp'
import africaYouthAwards from '../assets/logos/africa-youth-awards.webp'
import csed from '../assets/logos/csed.webp'
import effect250 from '../assets/logos/250-effect.webp'

export const logos = [
  { name: 'UNESCO', src: unesco },
  { name: 'African Union', src: africanUnion },
  { name: 'TEDx', src: tedx },
  { name: 'Mandela Washington Fellowship', src: mandelaWashington },
  { name: "Commission nationale consultative des droits de l'homme (CNCDH)", src: cncdh },
  { name: 'Forum de Paris sur la Paix', src: parisPeaceForum },
  { name: 'Front Line Defenders', src: frontLineDefenders },
  { name: 'Policy Center for the New South', src: policyCenter },
  { name: 'Kidney Foundation of Canada', src: kidneyFoundation },
  { name: 'Africa Youth Awards', src: africaYouthAwards },
  { name: 'CSED', src: csed },
  { name: '250 Effect', src: effect250 },
]
