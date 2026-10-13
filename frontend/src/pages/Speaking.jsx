import { Helmet } from 'react-helmet-async'
import SpeakingHero from '../components/SpeakingHero'
import Talks from '../components/Talks'
import AudienceNeeds from '../components/AudienceNeeds'
import Formats from '../components/Formats'
import Invitation from '../components/Invitation'
import { speakingHero } from '../content/speaking'

// Speaking: a dark stage opening, the talks, what each audience faces, the formats.
// (Videos live on My Story and Home until we have footage of him on a stage.)
export default function Speaking() {
  return (
    <>
      <Helmet>
        <title>Speaking | Jean Claude Muhire</title>
        <meta name="description" content={speakingHero.intro} />
        <meta property="og:title" content="Speaking | Jean Claude Muhire" />
        <meta property="og:description" content={speakingHero.intro} />
      </Helmet>
      <SpeakingHero />
      <Talks />
      <AudienceNeeds />
      <Formats />
      <Invitation />
    </>
  )
}
