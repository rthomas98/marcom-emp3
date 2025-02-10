import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

export const Blog42 = ({ insights = [], tagline, heading, description }) => {
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
            <Link 
              href={route('insights.index')} 
              className="bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full px-6 py-3 font-sans"
            >
              View All Articles
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {insights.map((post) => (
            <div key={post.id} className="flex size-full flex-col items-center justify-start">
              <Link 
                href={route('insights.show', { insight: post.slug })} 
                className="mb-6 w-full overflow-hidden rounded-lg"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="aspect-[3/2] size-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <p className="mr-4 bg-cardinal/10 px-3 py-1 text-sm font-semibold text-cardinal rounded-full">
                  {post.category}
                </p>
                <p className="inline text-sm font-semibold text-port-gore/70">{post.read_time} min read</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start">
                <Link 
                  href={route('insights.show', { insight: post.slug })}
                  className="mb-2 hover:text-cardinal transition-colors"
                >
                  <h2 className="font-heading text-xl font-bold text-port-gore md:text-2xl">{post.title}</h2>
                </Link>
                <p className="text-port-gore/70">{post.description}</p>
                <Link 
                  href={route('insights.show', { insight: post.slug })}
                  className="mt-6 flex items-center justify-center gap-x-2 text-cardinal hover:text-cardinal/80"
                >
                  Read more
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link 
          href={route('insights.index')} 
          className="mt-10 bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full px-6 py-3 font-sans md:hidden"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
};

export const Blog42Defaults = {
  tagline: "Latest Insights",
  heading: "Technology & Innovation",
  description: "Stay ahead with our latest insights on digital transformation, enterprise solutions, and industry trends.",
};
