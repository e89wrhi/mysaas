import { Infos } from '@/config/landing';
import BentoGrid from '@/components/sections/bentogrid';
import Featuress from '@/components/sections/features';
import HeroLanding from '@/components/sections/hero/hero-landing';
import InfoLanding from '@/components/sections/info-landing';
import Powered from '@/components/sections/powered';
import PreviewLanding from '@/components/sections/preview-landing';
import Testimonialss from '@/components/sections/testimonials';
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
      <InfoLanding data={Infos()[1]} reverse={true} />
      {/* <InfoLanding data={infos[1]} /> */}
      <Featuress />
      <Testimonialss />
    </>
  );
}
