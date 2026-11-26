import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { ArchiveIndex } from "@/components/archive-index";
import { Contact } from "@/components/contact";
import { Credentials } from "@/components/credentials";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toolbox } from "@/components/toolbox";
import { WorkIndex } from "@/components/work-index";
import { Section } from "@/components/section";

export default function Home() {
  return (
    <SmoothScroll>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Credentials />
        <Section id="work" title="Projects">
          <WorkIndex />
          <ArchiveIndex />
        </Section>
        <Approach />
        <Toolbox />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
