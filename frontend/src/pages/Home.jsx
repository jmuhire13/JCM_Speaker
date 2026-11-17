import PageMeta from '../components/PageMeta'
import Hero from '../components/Hero'
import HomeVideo from '../components/HomeVideo'
import Bridge from '../components/Bridge'
import Audiences from '../components/Audiences'
import Themes from '../components/Themes'
import Proof from '../components/Proof'
import Note from '../components/Note'
import Invitation from '../components/Invitation'

export default function Home() {
  return (
    <>
      <PageMeta path="/" />
      <Hero />
      <HomeVideo />
      <Bridge />
      <Audiences />
      <Themes />
      <Proof />
      <Note />
      <Invitation />
    </>
  )
}
