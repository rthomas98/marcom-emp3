import { Button } from "@relume_io/relume-ui";
import React from "react";

const imageColumns = [
  { className: "-mt-[20%] animate-loop-vertically-top" },
  { className: "-mt-[50%] animate-loop-vertically-bottom" },
  { className: "animate-loop-vertically-top" },
  { className: "mt-[-30%] animate-loop-vertically-bottom" },
  { className: "mt-[-20%] animate-loop-vertically-top" },
];

export const Header79 = (props) => {
  const { heading, description, buttons, imagesPartOne, imagesPartTwo } = {
    ...Header79Defaults,
    ...props,
  };

  return (
    <section className="relative min-h-svh bg-port-gore">
      {/* Background Image Grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="grid h-full w-full grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-5">
          {imageColumns.map((column, index) => (
            <div key={index} className={`grid h-[200%] grid-cols-1 gap-4 ${column.className}`}>
              {[...imagesPartOne, ...imagesPartTwo].map((image, imgIndex) => (
                <div key={imgIndex} className="relative aspect-[3/4] w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
              {[...imagesPartOne, ...imagesPartTwo].map((image, imgIndex) => (
                <div key={`duplicate-${imgIndex}`} className="relative aspect-[3/4] w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-[5%]">
        <div className="flex min-h-svh items-center">
          <div className="container mx-auto py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="mb-5 font-heading text-5xl font-bold text-white md:mb-6 md:text-7xl lg:text-8xl">
                {heading}
              </h1>
              <p className="text-lg text-white/90 md:text-xl">
                {description}
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    {...button}
                    className={`rounded-full px-6 py-3 text-base font-medium transition-colors duration-200 ${
                      index === 0
                        ? "bg-cardinal text-white hover:bg-cardinal/90"
                        : "bg-white text-port-gore hover:bg-white/90"
                    }`}
                  >
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header79Defaults = {
  heading: "Empowering Digital Innovation",
  description:
    "Transform your business with cutting-edge solutions that drive growth, engagement, and success. Experience the future of digital transformation today.",
  buttons: [
    { title: "Get Started", variant: "primary" },
    { title: "Learn More", variant: "secondary-alt" }
  ],
  imagesPartOne: Array(4).fill({
    src: "/images/placeholder.svg",
    alt: "Empuls3 placeholder image",
  }),
  imagesPartTwo: Array(4).fill({
    src: "/images/placeholder.svg",
    alt: "Empuls3 placeholder image",
  }),
};
