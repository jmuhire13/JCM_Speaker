import { Helmet } from 'react-helmet-async'
import TrustedHero from '../components/TrustedHero'
import HostedBy from '../components/HostedBy'
import Recognitions from '../components/Recognitions'
import Testimonials from '../components/Testimonials'
import Invitation from '../components/Invitation'
import { trustedHero } from '../content/trusted'

export default function TrustedBy() {
  return (
    <>
      <Helmet>
        <title>Trusted By | Jean Claude Muhire</title>
        <meta name="description" content={trustedHero.intro} />
        <meta property="og:title" content="Trusted By | Jean Claude Muhire" />
        <meta property="og:description" content={trustedHero.intro} />
      </Helmet>
      <TrustedHero />
      <HostedBy />
      <Recognitions />
      <Testimonials />
      <Invitation />
    </>
  )
}
