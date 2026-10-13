import { Helmet } from 'react-helmet-async'
import PageHero from '../components/PageHero'
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
      <PageHero {...beyondHero} />
      <Projects />
      <ImpactStrip />
      <Invitation />
    </>
  )
}
