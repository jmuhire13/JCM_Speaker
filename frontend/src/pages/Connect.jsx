import { Helmet } from 'react-helmet-async'
import ConnectHero from '../components/ConnectHero'
import NextSteps from '../components/NextSteps'
import { connectHero } from '../content/connect'

// Every "Book Jean Claude" button leads here.
export default function Connect() {
  return (
    <>
      <Helmet>
        <title>Connect | Jean Claude Muhire</title>
        <meta name="description" content={connectHero.intro} />
        <meta property="og:title" content="Book Jean Claude" />
        <meta property="og:description" content={connectHero.intro} />
      </Helmet>
      <ConnectHero />
      <NextSteps />
    </>
  )
}
