import { Button } from "@relume_io/relume-ui";

export const Cta3 = (props) => {
  const { heading, description, buttons, image } = {
    ...Cta3Defaults,
    ...props,
  };
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="w-full max-w-2xl">
          <h2 className="font-heading mb-5 text-5xl font-bold text-white md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="text-white/80 md:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
            {buttons.map((button, index) => (
              <Button 
                key={index} 
                {...button}
                className={
                  button.variant === "primary" 
                    ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-lg rounded-full"
                    : "bg-port-gore text-white hover:bg-port-gore/90 hover:shadow-lg rounded-full border border-white/10"
                }
              >
                {button.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <img src={image.src} className="size-full object-cover" alt={image.alt} />
      </div>
    </section>
  );
};

export const Cta3Defaults = {
  heading: "Transform Your Digital Future",
  description:
    "Ready to elevate your business with cutting-edge solutions? Schedule a consultation with our experts and discover how we can help you achieve your digital transformation goals.",
  buttons: [
    { 
      title: "Schedule Consultation",
      variant: "primary"
    }, 
    { 
      title: "Contact Us",
      variant: "secondary"
    }
  ],
  image: {
    src: "/images/cta/consultation-bg.svg",
    alt: "Schedule a consultation background",
  },
};
