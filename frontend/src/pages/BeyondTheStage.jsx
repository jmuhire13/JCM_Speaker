import PageMeta from '../components/PageMeta'
import BeyondHero from '../components/BeyondHero'
import Projects from '../components/Projects'
import ImpactStrip from '../components/ImpactStrip'
import Invitation from '../components/Invitation'

export default function BeyondTheStage() {
  return (
    <>
      <PageMeta path="/beyond-the-stage" />
      <BeyondHero />
      <Projects />
      <ImpactStrip />
      <Invitation />
    </>
  )
}
