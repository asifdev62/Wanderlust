import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#eef8fa] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <h2 className="text-4xl font-normal tracking-[-0.01em] text-neutral-900 sm:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-sm text-neutral-500 sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-3 lg:mt-20 lg:gap-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white p-6 lg:p-8"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-7 lg:size-10"
              />
              <h3 className="mt-3 text-xl font-normal text-neutral-900 lg:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 lg:text-[15px]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
