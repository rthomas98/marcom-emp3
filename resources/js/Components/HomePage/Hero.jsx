import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";

// Import hero images
import solutionsImage from '../../../images/hero/solutions.jpg';
import servicesImage from '../../../images/hero/services.jpg';
import industriesImage from '../../../images/hero/industries.jpg';
import companyImage from '../../../images/hero/company.jpg';

const TabContent = ({ heading, description, buttons, image }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <motion.div
          className="mx-auto max-w-lg text-center"
          initial={{ y: "20%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-20%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="mb-5 font-heading text-6xl font-bold text-white md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h1>
          <p className="text-white/90 md:text-lg">{description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button 
                key={index} 
                {...button}
                className={`rounded-full px-6 py-3 text-base font-medium transition-colors duration-200 ${
                  index === 0 
                    ? "bg-cardinal text-white hover:bg-cardinal/90 focus:outline-none focus:ring-0" 
                    : "bg-white text-port-gore hover:bg-white/90 focus:outline-none focus:ring-0"
                }`}
              >
                {button.title}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 z-10 bg-port-gore/60" />
        <img className="size-full object-cover" src={image.src} alt={image.alt} />
      </div>
    </div>
  );
};

TabContent.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      variant: PropTypes.string,
    })
  ).isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
};

export const Hero = (props) => {
  const { defaultTabValue, tabs } = {
    ...HeroDefaults,
    ...props,
  };

  const [activeTab, setActiveTab] = useState(defaultTabValue);

  return (
    <section>
      <div className="relative min-h-screen">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <AnimatePresence initial={false}>
            {tabs.content.map(
              (content, index) =>
                content.value === activeTab && (
                  <TabsContent
                    key={index}
                    value={content.value}
                    className="relative max-h-[60rem] min-h-screen overflow-visible"
                  >
                    <TabContent {...content} />
                  </TabsContent>
                ),
            )}
          </AnimatePresence>
          <TabsList className="absolute bottom-12 left-0 right-0 top-auto z-20 mx-auto flex justify-center gap-4 px-[5vw] md:bottom-16 lg:bottom-20 lg:max-w-xl">
            {tabs.trigger.map((trigger, index) => (
              <TabsTrigger
                key={index}
                value={trigger.value}
                onClick={() => setActiveTab(trigger.value)}
                className="relative flex-1 whitespace-normal border-0 bg-transparent px-4 py-4 text-center text-white/60 duration-0 data-[state=active]:bg-transparent data-[state=active]:text-white sm:px-8 md:min-w-32"
              >
                <span>{trigger.text}</span>
                <div className="absolute inset-0 top-auto h-1 w-full bg-white/20">
                  <motion.div
                    className="h-full bg-cardinal"
                    initial={{ width: "0%" }}
                    animate={{ width: activeTab === trigger.value ? "100%" : "0%" }}
                    transition={{
                      duration: activeTab === trigger.value ? 1.5 : 0.3,
                      ...(activeTab === trigger.value
                        ? {
                            type: "spring",
                            stiffness: 25,
                            damping: 30,
                          }
                        : { ease: "easeInOut" }),
                    }}
                  />
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
};

Hero.propTypes = {
  defaultTabValue: PropTypes.string,
  tabs: PropTypes.shape({
    trigger: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        buttons: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            variant: PropTypes.string,
          })
        ).isRequired,
        image: PropTypes.shape({
          src: PropTypes.string.isRequired,
          alt: PropTypes.string,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export const HeroDefaults = {
  defaultTabValue: "solutions",
  tabs: {
    trigger: [
      {
        value: "solutions",
        text: "Solutions",
      },
      {
        value: "services",
        text: "Services",
      },
      {
        value: "industries",
        text: "Industries",
      },
      {
        value: "company",
        text: "Company",
      },
    ],
    content: [
      {
        value: "solutions",
        heading: "Digital Solutions That Drive Growth",
        description:
          "Transform your business with cutting-edge web and mobile solutions. We create powerful, scalable applications that drive engagement and deliver results.",
        buttons: [
          { title: "Explore Solutions" },
          { title: "Contact Us", variant: "secondary" }
        ],
        image: {
          src: solutionsImage,
          alt: "Digital solutions showcase",
        },
      },
      {
        value: "services",
        heading: "Expert Development Services",
        description:
          "From custom software development to cloud solutions, our expert team delivers comprehensive services tailored to your business needs.",
        buttons: [
          { title: "View Services" },
          { title: "Get Started", variant: "secondary" }
        ],
        image: {
          src: servicesImage,
          alt: "Development services showcase",
        },
      },
      {
        value: "industries",
        heading: "Solutions For Every Industry",
        description:
          "Specialized solutions for Technology, Finance, Healthcare, and more. We understand your industry's unique challenges and opportunities.",
        buttons: [
          { title: "Find Your Industry" },
          { title: "Learn More", variant: "secondary" }
        ],
        image: {
          src: industriesImage,
          alt: "Industry solutions showcase",
        },
      },
      {
        value: "company",
        heading: "Innovation Meets Excellence",
        description:
          "A team of passionate experts committed to delivering exceptional results. Discover our story, values, and commitment to your success.",
        buttons: [
          { title: "About Us" },
          { title: "Join Our Team", variant: "secondary" }
        ],
        image: {
          src: companyImage,
          alt: "Company showcase",
        },
      },
    ],
  },
};
