import { 
  MonitorPlay, 
  Database, 
  Code2, 
  Laptop2, 
  Globe2, 
  Smartphone, 
  ShoppingCart,
  Globe,
  Rocket,
  Palette,
  BarChart,
  Search,
  Building2,
  Users2,
  GraduationCap,
  Newspaper,
  FileCode2,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Settings,
  Lightbulb,
  WrenchIcon,
  Briefcase,
  FileText,
  Brain,
  Network,
  ServerCog
} from "lucide-react";

export const navigationConfig = {
  logo: {
    src: "/images/logos/logo.svg",
    alt: "Marcom Empuls3 Logo",
    url: "/"
  },
  navLinks: [
    {
      title: "Solutions",
      subMenu: [
        {
          heading: "Development Services",
          subMenuLinks: [
            {
              title: "Front-End Development",
              description: "Create stunning user interfaces with modern frameworks",
              url: "/solutions/frontend",
              icon: <MonitorPlay size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Back-End Development",
              description: "Build robust server-side applications",
              url: "/solutions/backend",
              icon: <Database size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Full-Stack Development",
              description: "End-to-end development solutions",
              url: "/solutions/fullstack",
              icon: <Code2 size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Custom Software",
              description: "Tailored software solutions for your business",
              url: "/solutions/custom-software",
              icon: <Laptop2 size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        },
        {
          heading: "Specialized Solutions",
          subMenuLinks: [
            {
              title: "WordPress Development",
              description: "Custom WordPress themes and plugins",
              url: "/solutions/wordpress",
              icon: <Globe2 size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "E-commerce Development",
              description: "Build your online store with modern technologies",
              url: "/solutions/ecommerce",
              icon: <ShoppingCart size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "HubSpot Development",
              description: "Custom HubSpot CMS development and integration",
              url: "/solutions/hubspot",
              icon: <Globe size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "MVP Development",
              description: "Rapid prototyping and minimum viable products",
              url: "/solutions/mvp",
              icon: <Rocket size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Progressive Web Apps",
              description: "Modern web applications with native-like features",
              url: "/solutions/progressive-web-apps",
              icon: <Smartphone size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "React Native Development",
              description: "Cross-platform mobile applications",
              url: "/solutions/react-native",
              icon: <Smartphone size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Software Development & Design",
              description: "End-to-end software design and development",
              url: "/solutions/software-development-design",
              icon: <Palette size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        }
      ]
    },
    {
      title: "Services",
      subMenu: [
        {
          heading: "Core Services",
          subMenuLinks: [
            {
              title: "Software Engineering",
              description: "Expert software engineering and development services",
              url: "/services/software-engineering",
              icon: <Code2 size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Application Services",
              description: "Custom application development and maintenance",
              url: "/services/application",
              icon: <Laptop2 size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "DevOps Services",
              description: "Streamline your development and operations",
              url: "/services/devops",
              icon: <Settings size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "IT Consulting",
              description: "Strategic technology consulting and planning",
              url: "/services/it-consulting-services",
              icon: <Lightbulb size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        },
        {
          heading: "AI & ML Services",
          subMenuLinks: [
            {
              title: "AI & ML Development",
              description: "Custom AI solutions and machine learning models",
              url: "/services/ai-ml-development",
              icon: <Brain size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Foundation Models",
              description: "Building and fine-tuning foundation models",
              url: "/services/foundation-models",
              icon: <Network size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "MLOps & AI Infrastructure",
              description: "End-to-end ML infrastructure and deployment",
              url: "/services/mlops-infrastructure",
              icon: <ServerCog size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        },
        {
          heading: "Additional Services",
          subMenuLinks: [
            {
              title: "Maintenance & Support",
              description: "Ongoing maintenance and technical support",
              url: "/services/maintenance-and-support",
              icon: <WrenchIcon size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Smart Teams",
              description: "Dedicated development teams for your projects",
              url: "/services/smart-teams",
              icon: <Users2 size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        }
      ]
    },
    {
      title: "Company",
      subMenu: [
        {
          heading: "About Us",
          subMenuLinks: [
            {
              title: "Our Story",
              description: "Learn about our journey and mission",
              url: "/company/about",
              icon: <Building2 size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Our Team",
              description: "Meet our talented team members",
              url: "/company/our-team",
              icon: <Users2 size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Careers",
              description: "Join our growing team",
              url: "/company/careers",
              icon: <Briefcase size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        },
        {
          heading: "News & Updates",
          subMenuLinks: [
            {
              title: "Latest News",
              description: "Stay updated with our latest announcements",
              url: "/company/latest-news",
              icon: <Newspaper size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Case Studies",
              description: "Explore our success stories",
              url: "/resources/case-studies",
              icon: <FileText size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        }
      ]
    },
    {
      title: "Resources",
      subMenu: [
        {
          heading: "Knowledge Base",
          subMenuLinks: [
            {
              title: "Blog",
              description: "Insights and updates from our team",
              url: "/resources/blog",
              icon: <BookOpen size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Documentation",
              description: "Technical guides and API documentation",
              url: "/resources/documentation",
              icon: <BookOpen size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        },
        {
          heading: "Support",
          subMenuLinks: [
            {
              title: "Help Center",
              description: "Get help and support",
              url: "/resources/help-center",
              icon: <HelpCircle size={24} strokeWidth={1.5} className="text-cardinal" />
            },
            {
              title: "Contact Support",
              description: "Get in touch with our support team",
              url: "/resources/contact-support",
              icon: <MessageSquare size={24} strokeWidth={1.5} className="text-cardinal" />
            }
          ]
        }
      ]
    }
  ],
  buttons: [
    {
      title: "Contact Us",
      url: "/resources/contact",
      primary: true
    }
  ]
};
