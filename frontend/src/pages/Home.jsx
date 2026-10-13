import { Helmet } from 'react-helmet-async'
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
      <Helmet>
        <title>Jean Claude Muhire | Speaker, Storyteller, Community Builder</title>
        <meta
          name="description"
          content="Leadership through lived experience. Jean Claude Muhire shares stories that foster belonging, strengthen connections, and inspire action for NGOs, hospitals and schools."
        />
        <meta property="og:title" content="Jean Claude Muhire" />
        <meta
          property="og:description"
          content="Sharing stories that foster belonging, strengthen connections, and inspire action."
        />
      </Helmet>
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
