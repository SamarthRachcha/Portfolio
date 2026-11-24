import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { ArchiveIndex } from "@/components/archive-index";
import { Contact } from "@/components/contact";
import { DecisionBoundary } from "@/components/decision-boundary";
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
        <DecisionBoundary />
        <Section
          id="work"
          index="01"
          label="Selected work"
          title="Five systems, end to end."
          note="Open a row for the details. Five more repositories sit in the archive below."
        >
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
