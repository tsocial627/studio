import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Your Health, Your Schedule.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Connect with top doctors and specialists from the comfort of your home. MediLink makes healthcare accessible for everyone, everywhere.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#find-specialist">Find a Specialist</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#doctors">View Our Doctors</Link>
              </Button>
            </div>
          </div>
          <Image
            src="https://placehold.co/600x400.png"
            width={600}
            height={400}
            alt="A doctor consulting with a patient via video call"
            data-ai-hint="doctor patient online"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
export default Hero
