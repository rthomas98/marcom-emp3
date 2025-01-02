import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

export const Blog42 = (props) => {
  const { tagline, heading, description, button, blogPosts } = {
    ...Blog42Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 grid grid-cols-1 items-start justify-start gap-y-8 md:mb-18 md:grid-cols-[1fr_max-content] md:items-end md:justify-between md:gap-x-12 md:gap-y-4 lg:mb-20 lg:gap-x-20">
          <div className="md:mr-12 lg:mr-0">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
              <h2 className="font-heading mb-3 text-5xl font-bold text-port-gore md:mb-4 md:text-7xl lg:text-8xl">{heading}</h2>
              <p className="text-port-gore/70 md:text-lg">{description}</p>
            </div>
          </div>
          <div className="hidden md:flex">
            <Button {...button} className="bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full">
              {button.title}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div key={index} className="flex size-full flex-col items-center justify-start">
              <a href={post.url} className="mb-6 w-full overflow-hidden rounded-lg">
                <img
                  src={post.image.src}
                  alt={post.image.alt}
                  className="aspect-[3/2] size-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </a>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-cardinal/10 px-3 py-1 text-sm font-semibold text-cardinal rounded-full">
                  {post.category}
                </p>
                <p className="inline text-sm font-semibold text-port-gore/70">{post.readTime}</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start">
                <a className="mb-2 hover:text-cardinal transition-colors" href={post.url}>
                  <h2 className="font-heading text-xl font-bold text-port-gore md:text-2xl">{post.title}</h2>
                </a>
                <p className="text-port-gore/70">{post.description}</p>
                <Button 
                  {...post.button} 
                  className="mt-6 flex items-center justify-center gap-x-2 text-cardinal hover:text-cardinal/80"
                >
                  {post.button.title}
                  {post.button.iconRight}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button {...button} className="mt-10 bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full md:hidden">
          {button.title}
        </Button>
      </div>
    </section>
  );
};

export const Blog42Defaults = {
  tagline: "Latest Insights",
  heading: "Technology & Innovation",
  description: "Stay ahead with our latest insights on digital transformation, enterprise solutions, and industry trends.",
  button: { 
    title: "View All Articles", 
    variant: "secondary" 
  },
  blogPosts: [
    {
      url: "#",
      image: {
        src: "/images/blog/ai-transformation.svg",
        alt: "AI Transformation in Enterprise",
      },
      category: "AI & ML",
      readTime: "5 min read",
      title: "The Future of AI in Enterprise Solutions",
      description:
        "Explore how artificial intelligence is revolutionizing enterprise operations and decision-making processes in 2025.",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      url: "#",
      image: {
        src: "/images/blog/cloud-security.svg",
        alt: "Cloud Security Solutions",
      },
      category: "Security",
      readTime: "4 min read",
      title: "Advanced Cloud Security Practices",
      description:
        "Learn about the latest cloud security measures and how they protect enterprise data in an increasingly connected world.",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      url: "#",
      image: {
        src: "/images/blog/digital-transformation.svg",
        alt: "Digital Transformation Strategy",
      },
      category: "Strategy",
      readTime: "6 min read",
      title: "Digital Transformation Success Stories",
      description:
        "Discover how leading enterprises are achieving remarkable results through strategic digital transformation initiatives.",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
};
