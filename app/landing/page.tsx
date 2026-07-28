import { Hero } from "@/components/landing/Hero";
import { Feature } from "@/components/landing/Feature";
import { Steps } from "@/components/landing/Steps";
import { Community } from "@/components/landing/Community";
import { BottomCta } from "@/components/landing/BottomCta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Feature />
      <Steps />
      <Community />
      <BottomCta />
    </>
  );
}
