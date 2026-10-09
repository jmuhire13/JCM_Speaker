import { Helmet } from 'react-helmet-async'
import StoryHero from '../components/StoryHero'
import Timeline from '../components/Timeline'
import Today from '../components/Today'
import Invitation from '../components/Invitation'
import { storyHero } from '../content/story'

export default function MyStory() {
  return (
    <>
      <Helmet>
        <title>My Story | Jean Claude Muhire</title>
        <meta name="description" content={storyHero.intro} />
        <meta property="og:title" content="My Story | Jean Claude Muhire" />
        <meta property="og:description" content={storyHero.intro} />
      </Helmet>
      <StoryHero />
      <Timeline />
      <Today />
      <Invitation />
    </>
  )
}
