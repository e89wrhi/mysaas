import { infos } from '@/config/landing';
import BentoGrid from '@/components/sections/bentogrid';
import Features from '@/components/sections/features';
import HeroLanding from '@/components/sections/hero-landing';
import InfoLanding from '@/components/sections/info-landing';
import Powered from '@/components/sections/powered';
import PreviewLanding from '@/components/sections/preview-landing';
import Testimonials from '@/components/sections/testimonials';
import UsSection from '@/components/sections/us-landing';
import SocialsSection from '@/components/sections/socials';
import CountsSection from '@/components/sections/count-landing';

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <CountsSection />
      <SocialsSection />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[1]} reverse={true} />
      {/* <InfoLanding data={infos[1]} /> */}
      <Features />
      <UsSection />
      <Testimonials />
    </>
  );
}
