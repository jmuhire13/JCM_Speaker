import PageMeta from '../components/PageMeta'
import ConnectHero from '../components/ConnectHero'
import NextSteps from '../components/NextSteps'

// Every "Book Jean Claude" button leads here.
export default function Connect() {
  return (
    <>
      <PageMeta path="/connect" />
      <ConnectHero />
      <NextSteps />
    </>
  )
}
