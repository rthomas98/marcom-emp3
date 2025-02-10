import React from "react";
import { Link } from "@inertiajs/react";

const leftColumnImages = [
  {
    src: "/images/emp/rob_thomas23_African_American_Coders_working_in_a_Software_deve_390a7a57-d7d7-4496-88ad-dce46e0c4c80.png",
    alt: "Software Development Team Meeting",
  },
  {
    src: "/images/emp/rob_thomas23_African_American_Business_professionals_in_a_moder_0f48e92a-5e85-4e9f-9713-d384e5873a22.png",
    alt: "Business Professionals Discussion",
  },
  {
    src: "/images/emp/rob_thomas23_African_American_Project_Manager_Makes_a_Presentat_2d8255b5-eb2b-4d1c-b57d-58077e6d9d44.png",
    alt: "Project Manager Presentation",
  },
  {
    src: "/images/emp/rob_thomas23_African_American_developers_working_in_meetings_st_67cd8699-d588-4e33-901a-4b41eb725a0c.png",
    alt: "Development Team Strategy Meeting",
  },
  {
    src: "/images/emp/rob_thomas23_African_American_Web_Developers_standing_in_a_grou_8bb08f30-5ef2-4360-8d79-0163528c35ea.png",
    alt: "Web Development Team",
  },
  {
    src: "/images/emp/rob_thomas23_Creative_African_American_people_and_coworking_spa_8d585a97-cf74-4b65-9577-ffe5e4e745e4.png",
    alt: "Creative Team Collaboration",
  },
];

const rightColumnImages = [
  {
    src: "/images/emp/rob_thomas23_African_American_Web_Developers_in_a_working_envir_008ed057-ce50-4832-bfc4-21051acf71dd.png",
    alt: "Web Development Environment",
  },
  {
    src: "/images/emp/rob_thomas23_African_American_developers_working_in_an_agency.__2447dfcb-adaf-4241-b1a4-34a264486177.png",
    alt: "Agency Development Team",
  },
  {
    src: "/images/emp/rob_thomas23_Portrait_African_American_teamwork_in_modern_offic_405cdebc-fda3-4939-aa3b-c13bd7a4749a.png",
    alt: "Modern Office Teamwork",
  },
  {
    src: "/images/emp/rob_thomas23_African_American_Team_of_Young_Managers_Discussing_df53a8b9-91a0-4201-a378-f71855407ec1.png",
    alt: "Management Team Discussion",
  },
  {
    src: "/images/emp/rob_thomas23_An_African_American_team_of_developers_working_col_23a5e847-d8cd-45e5-805c-f2485621fb22.png",
    alt: "Collaborative Development",
  },
  {
    src: "/images/emp/rob_thomas23_Young_black_man_discussing_market_research_with_co_c8d0d42d-962e-4e67-922c-77d03d1bacb2.png",
    alt: "Market Research Discussion",
  },
];

export const Header79 = ({ 
  heading = "Crafting Digital Solutions That Drive Growth",
  description = "Expert software development and digital solutions for businesses. From custom applications to e-commerce platforms, we deliver technology that transforms your vision into reality.",
  links = [
    { 
      title: "View Our Work", 
      href: route('resources.case-studies') || '#'
    },
    { 
      title: "Our Services", 
      href: route('services.software-engineering') || '#'
    }
  ]
}) => {
  return (
    <section
      id="relume"
      className="grid grid-cols-1 gap-y-16 pt-16 md:grid-flow-row md:pt-24 lg:grid-flow-col lg:grid-cols-2 lg:items-center lg:pt-0"
    >
      <div className="mx-[5%] max-w-[40rem] justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h1 className="font-heading mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
        <p className="md:text-md">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href || '#'}
              className={`bg-cardinal text-white hover:bg-port-gore font-sans inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-300`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="h-[30rem] overflow-hidden pl-[5vw] pr-[5vw] md:h-[40rem] lg:h-screen lg:pl-0">
        <div className="grid w-full grid-cols-2 gap-x-4">
          <div className="-mt-[120%] grid size-full animate-loop-vertically columns-2 grid-cols-1 gap-4 self-center">
            {leftColumnImages.map((image, index) => (
              <div key={index} className="grid size-full grid-cols-1 gap-4">
                <div className="relative w-full pt-[120%]">
                  <img
                    className="absolute inset-0 size-full object-cover"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="grid size-full animate-loop-vertically grid-cols-1 gap-4">
            {rightColumnImages.map((image, index) => (
              <div key={index} className="grid size-full grid-cols-1 gap-4">
                <div className="relative w-full pt-[120%]">
                  <img
                    className="absolute inset-0 size-full object-cover"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
