import React from 'react';

export const Layout142 = (props) => {
  const { heading, description, image } = {
    ...Layout142Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <h2 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="text-port-gore/70 md:text-lg">{description}</p>
          </div>
        </div>
        <div>
          <img 
            src={image.src} 
            className="w-full rounded-2xl object-cover shadow-lg" 
            alt={image.alt} 
          />
        </div>
      </div>
    </section>
  );
};

export const Layout142Defaults = {
  heading: "Full-Stack Development Excellence",
  description:
    "Seamlessly integrate front-end and back-end technologies to create powerful, scalable applications. Our full-stack development approach ensures cohesive solutions that deliver exceptional user experiences.",
  image: {
    src: "/images/placeholder.svg",
    alt: "Full-Stack Development Solutions",
  },
};
