import { Helmet } from 'react-helmet-async'
import BeyondHero from '../components/BeyondHero'
import Projects from '../components/Projects'
import ImpactStrip from '../components/ImpactStrip'
import Invitation from '../components/Invitation'
import { beyondHero } from '../content/beyond'

export default function BeyondTheStage() {
  return (
    <>
      <Helmet>
        <title>Beyond the Stage | Jean Claude Muhire</title>
        <meta name="description" content={beyondHero.intro} />
        <meta property="og:title" content="Beyond the Stage | Jean Claude Muhire" />
        <meta property="og:description" content={beyondHero.intro} />
      </Helmet>
      <BeyondHero />
      <Projects />
      <ImpactStrip />
      <Invitation />
    </>
  )
}
