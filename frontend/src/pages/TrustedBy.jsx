import PageMeta from '../components/PageMeta'
import TrustedHero from '../components/TrustedHero'
import HostedBy from '../components/HostedBy'
import Recognitions from '../components/Recognitions'
import Testimonials from '../components/Testimonials'
import Invitation from '../components/Invitation'

export default function TrustedBy() {
  return (
    <>
      <PageMeta path="/trusted-by" />
      <TrustedHero />
      <HostedBy />
      <Recognitions />
      <Testimonials />
      <Invitation />
    </>
  )
}
