import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Amazingly Magical And Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable.",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      "The Santorini Getaway Was Everything We Hoped For. Sunset Views, Beautiful Villas, And Seamless Planning From Start To Finish.",
    name: "Daniel Park",
    location: "Seoul, South Korea",
    image: "/images/person2.png",
  },
  {
    quote:
      "Our Moroccan Adventure Was Rich In Culture And Color. Every Detail Was Thoughtful And The Local Guides Were Outstanding.",
    name: "Emma Williams",
    location: "London, UK",
    image: "/images/person1.png",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#eef8fa] px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <Carousel opts={{ align: "start" }} className="w-full">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-3xl font-normal tracking-[-0.01em] text-neutral-900 lg:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-xs text-neutral-500 lg:text-base">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 pt-1">
              <CarouselPrevious
                aria-label="Previous testimonials"
                style={{ position: "static" }}
              />
              <CarouselNext
                aria-label="Next testimonials"
                style={{ position: "static" }}
              />
            </div>
          </div>

          <CarouselContent className="mt-10 lg:mt-14">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2">
                <article className="flex min-h-[300px] bg-white p-4 lg:min-h-[340px] lg:p-5">
                  <div className="flex flex-1 flex-col justify-between py-2 pr-4 lg:pr-6">
                    <blockquote className="text-[11px] leading-[1.45] text-neutral-700 lg:text-sm lg:leading-relaxed">
                      “{testimonial.quote}”
                    </blockquote>

                    <div className="mt-6">
                      <p className="flex items-center gap-2 text-xs font-medium text-brand lg:text-sm">
                        <span
                          aria-hidden="true"
                          className="h-px w-4 bg-brand"
                        />
                        {testimonial.name}
                      </p>
                      <p className="mt-1 pl-6 text-[10px] text-neutral-500 lg:text-xs">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="relative w-[42%] shrink-0 overflow-hidden bg-neutral-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 768px) 20vw, 40vw"
                      className="object-cover object-center"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
