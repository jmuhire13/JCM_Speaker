import PageMeta from '../components/PageMeta'
import StoryHero from '../components/StoryHero'
import Timeline from '../components/Timeline'
import Today from '../components/Today'
import VideoSection from '../components/VideoSection'
import Invitation from '../components/Invitation'

export default function MyStory() {
  return (
    <>
      <PageMeta path="/my-story" />
      <StoryHero />
      <Timeline />
      <VideoSection />
      <Today />
      <Invitation />
    </>
  )
}
