import { Link } from "@inertiajs/react";

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
              <Link 
                key={index} 
                href={button.href}
                className={
                  button.variant === "primary" 
                    ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-lg rounded-full px-6 py-3 font-sans"
                    : "bg-port-gore text-white hover:bg-port-gore/90 hover:shadow-lg rounded-full border border-white/10 px-6 py-3 font-sans"
                }
              >
                {button.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <img src={image.src} className="size-full object-cover" alt={image.alt} />
        <div className="absolute inset-0 bg-gradient-to-r from-port-gore/90 to-port-gore/80" />
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
      variant: "primary",
      href: route('solutions.custom'),
    }, 
    { 
      title: "Contact Us",
      variant: "secondary",
      href: route('solutions'),
    }
  ],
  image: {
    src: "/images/emp/rob_thomas23_African_American_Project_Manager_Makes_a_Presentat_ff51deb6-2b53-4935-b091-29dd4ac7a594.png",
    alt: "Schedule a consultation background",
  },
};
