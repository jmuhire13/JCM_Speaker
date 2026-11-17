import PageMeta from '../components/PageMeta'
import SpeakingHero from '../components/SpeakingHero'
import Talks from '../components/Talks'
import AudienceNeeds from '../components/AudienceNeeds'
import Formats from '../components/Formats'
import Invitation from '../components/Invitation'

// Speaking: a dark stage opening, the talks, what each audience faces, the formats.
// (Videos live on My Story and Home until we have footage of him on a stage.)
export default function Speaking() {
  return (
    <>
      <PageMeta path="/speaking" />
      <SpeakingHero />
      <Talks />
      <AudienceNeeds />
      <Formats />
      <Invitation />
    </>
  )
}
