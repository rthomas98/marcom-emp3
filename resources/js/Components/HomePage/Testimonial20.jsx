"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";

export const Testimonial20 = (props) => {
  const { heading, description, testimonials } = {
    ...Testimonial20Defaults,
    ...props,
  };

  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="relume" className="bg-white overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <h2 className="font-heading rb-5 mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="font-sans text-port-gore/70 md:text-lg">{description}</p>
        </div>
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="ml-0">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="basis-[95%] pl-0 pr-6 sm:basis-[80%] md:basis-1/2 md:pr-8 lg:basis-1/3"
              >
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="rt-8 mt-8 flex items-center justify-between">
            <div className="mt-5 flex w-full items-start justify-start">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={clsx("mx-[3px] inline-block size-2 rounded-full transition-all duration-300", {
                    "bg-cardinal": current === index + 1,
                    "bg-cardinal/20": current !== index + 1,
                  })}
                />
              ))}
            </div>
            <div className="flex items-end justify-end gap-2 md:gap-4">
              <CarouselPrevious className="static right-0 top-0 size-12 -translate-y-0 bg-cardinal text-white hover:bg-cardinal/90" />
              <CarouselNext className="static right-0 top-0 size-12 -translate-y-0 bg-cardinal text-white hover:bg-cardinal/90" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-between rounded-lg border border-cardinal/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl md:p-8">
      <div className="mb-5 flex text-cardinal md:mb-6">
        {Array(testimonial.numberOfStars)
          .fill(null)
          .map((_, starIndex) => (
            <Star key={starIndex} className="size-6 fill-current" />
          ))}
      </div>
      <blockquote className="font-sans text-port-gore/80 md:text-lg">{testimonial.quote}</blockquote>
      <div className="mt-5 flex w-full flex-col items-start gap-4 border-t border-cardinal/10 pt-5 md:mt-6 md:w-auto md:flex-row md:items-center">
        <div>
          <img
            src={testimonial.avatar.src}
            alt={testimonial.avatar.alt}
            className="size-12 min-h-12 min-w-12 rounded-full object-cover shadow-md"
          />
        </div>
        <div>
          <p className="font-heading font-semibold text-port-gore">{testimonial.name}</p>
          <p className="text-port-gore/70">
            <span>{testimonial.position}</span>, <span>{testimonial.companyName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Testimonial20Defaults = {
  heading: "Client Success Stories",
  description: "Hear directly from our enterprise partners about their experience working with us and the transformative impact of our solutions.",
  testimonials: [
    {
      numberOfStars: 5,
      quote:
        "Their innovative approach to content delivery infrastructure has significantly improved our streaming capabilities. The team's expertise and dedication to excellence made them a valuable partner in our digital transformation journey.",
      avatar: {
        src: "/images/emp/rob_thomas23_African_American_CEO_and_Chief_Executive_Talking_A_72595ef3-0f82-49e6-bbd3-9b4581e80520.png",
        alt: "Warner Bros Discovery representative",
      },
      name: "Michael Chen",
      position: "VP of Technology",
      companyName: "Warner Bros Discovery",
    },
    {
      numberOfStars: 5,
      quote:
        "The IoT solutions implemented have revolutionized how we monitor and optimize our operations. Their deep understanding of enterprise-scale challenges and ability to deliver robust solutions sets them apart.",
      avatar: {
        src: "/images/emp/rob_thomas23_African_American_Business_professionals_in_a_moder_0f48e92a-5e85-4e9f-9713-d384e5873a22.png",
        alt: "Shell representative",
      },
      name: "Sarah Martinez",
      position: "Digital Innovation Director",
      companyName: "Shell",
    },
    {
      numberOfStars: 5,
      quote:
        "Their expertise in mobile solutions and enterprise software integration has been instrumental in modernizing our digital infrastructure. The team's commitment to quality and innovation is exceptional.",
      avatar: {
        src: "/images/emp/rob_thomas23_African_American_Business_professionals_in_a_moder_aa9cdc13-5800-4ce5-8074-5d754c6002f1.png",
        alt: "Samsung representative",
      },
      name: "David Park",
      position: "Head of Enterprise Solutions",
      companyName: "Samsung",
    }
  ],
};
