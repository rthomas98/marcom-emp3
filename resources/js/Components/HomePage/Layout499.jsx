import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VideoIframe,
} from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { FaCirclePlay } from "react-icons/fa6";

export const Layout499 = (props) => {
  const { tagline, heading, description, tabs, buttons, defaultTabValue } = {
    ...Layout499Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 md:w-auto lg:mb-20">
          <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
          <h1 className="mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
          <p className="text-port-gore/70 md:text-lg">{description}</p>
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button 
                key={index} 
                {...button}
                className={
                  button.variant === "secondary" 
                    ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full"
                    : "text-cardinal hover:text-cardinal/80"
                }
              >
                {button.title}
                {button.variant === "link" && button.iconRight}
              </Button>
            ))}
          </div>
        </div>
        <Tabs
          defaultValue={defaultTabValue}
          className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20"
        >
          <TabsList className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-1 items-center gap-x-4">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.value}
                className="flex-col items-start whitespace-normal border-0 border-l-2 border-transparent bg-transparent py-4 pl-6 pr-0 text-left data-[state=active]:border-l-cardinal data-[state=active]:bg-transparent data-[state=active]:text-port-gore md:pl-8"
              >
                <h3 className="mb-3 text-2xl font-bold text-port-gore md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  {tab.heading}
                </h3>
                <p className="text-port-gore/70">{tab.description}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab, index) => (
            <TabsContent key={index} value={tab.value} className="data-[state=active]:animate-tabs">
              {tab.image && <img src={tab.image.src} alt={tab.image.alt} className="size-full rounded-lg shadow-lg" />}
              {tab.video && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="relative flex w-full items-center justify-center">
                      <img
                        src={tab.video.image.src}
                        alt={tab.video.image.alt}
                        className="size-full rounded-lg object-cover shadow-lg"
                      />
                      <span className="absolute inset-0 z-10 rounded-lg bg-black/50" />
                      <FaCirclePlay className="absolute z-20 size-16 text-white transition-transform hover:scale-110" />
                    </button>
                  </DialogTrigger>

                  <DialogContent>
                    <VideoIframe video={tab.video.url} />
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export const Layout499Defaults = {
  tagline: "Enterprise Experience",
  heading: "Global Leaders Trust Us",
  description:
    "Proven success delivering transformative solutions for industry giants. Our enterprise partnerships demonstrate our ability to handle complex, large-scale projects with excellence.",
  defaultTabValue: "warner-bros",
  tabs: [
    {
      value: "warner-bros",
      heading: "Warner Bros Discovery",
      description:
        "Revolutionizing content delivery and streaming infrastructure for one of the world's largest media companies.",
      video: {
        image: {
          src: "/images/enterprise/warner-bros-case.svg",
          alt: "Warner Bros Discovery case study",
        },
        url: "https://www.youtube.com/embed/placeholder-warner-bros",
      },
    },
    {
      value: "shell",
      heading: "Shell",
      description:
        "Implementing cutting-edge IoT solutions and data analytics platforms to optimize global operations.",
      image: {
        src: "/images/enterprise/shell-case.svg",
        alt: "Shell case study showcase",
      },
    },
    {
      value: "samsung",
      heading: "Samsung",
      description:
        "Developing innovative mobile solutions and enterprise software integration systems.",
      image: {
        src: "/images/enterprise/samsung-case.svg",
        alt: "Samsung case study showcase",
      },
    },
  ],
  buttons: [
    { 
      title: "View Case Studies", 
      variant: "secondary"
    },
    {
      title: "Enterprise Solutions",
      variant: "link",
      size: "link",
      iconRight: <RxChevronRight />,
    },
  ],
};