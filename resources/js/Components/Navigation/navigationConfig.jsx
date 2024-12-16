import { 
  Building2, 
  Rocket,
  Briefcase,
  Users,
  HeartHandshake,
  Newspaper,
  Info,
  Home,
  Wrench,
  Building,
  BookOpen,
  Network,
  Blocks,
  Binary,
  Cpu,
  LayoutGrid,
  Boxes,
  Gauge,
  Settings2,
  Lightbulb,
  GraduationCap,
  Code2,
  Database,
  Globe2,
  Smartphone,
  ShoppingCart,
  MonitorPlay,
  Laptop2,
  MessagesSquare,
  Mail,
  Phone,
  Handshake,
  CircleDollarSign,
  GanttChart,
  HelpCircle,
  FileCode,
  Users2,
  Shield
} from 'lucide-react';

export const navigationConfig = {
  logo: {
    url: "/",
    src: "/images/logos/logo.svg",
    alt: "Marcom Empuls3",
  },
  navLinks: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Solutions",
      url: "/solutions",
      icon: <Blocks className="w-5 h-5" />,
      megaMenu: {
        categoryLinks: [
          {
            title: "Development",
            links: [
              {
                url: "/solutions/frontend-development",
                icon: <MonitorPlay className="w-5 h-5" />,
                title: "Front-End Development",
                description: "Create engaging user interfaces and experiences",
              },
              {
                url: "/solutions/backend-development",
                icon: <Database className="w-5 h-5" />,
                title: "Back-End Development",
                description: "Build robust server-side applications",
              },
              {
                url: "/solutions/fullstack-development",
                icon: <Code2 className="w-5 h-5" />,
                title: "Full-Stack Development",
                description: "End-to-end web application development",
              },
              {
                url: "/solutions/custom-software-development",
                icon: <Laptop2 className="w-5 h-5" />,
                title: "Custom Software",
                description: "Tailored software solutions for your business",
              },
            ],
          },
          {
            title: "Specialized Solutions",
            links: [
              {
                url: "/solutions/progressive-web-apps",
                icon: <Globe2 className="w-5 h-5" />,
                title: "Progressive Web Apps",
                description: "Modern web apps with native-like features",
              },
              {
                url: "/solutions/react-native-development",
                icon: <Smartphone className="w-5 h-5" />,
                title: "React Native Development",
                description: "Cross-platform mobile applications",
              },
              {
                url: "/solutions/ecommerce-development",
                icon: <ShoppingCart className="w-5 h-5" />,
                title: "E-commerce Development",
                description: "Build powerful online stores",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Services",
      url: "/services",
      icon: <Settings2 className="w-5 h-5" />,
      megaMenu: {
        categoryLinks: [
          {
            title: "Development Services",
            links: [
              {
                url: "/services/web-development",
                icon: <Globe2 className="w-5 h-5" />,
                title: "Web Development",
                description: "Custom websites and web applications",
              },
              {
                url: "/services/mobile-development",
                icon: <Smartphone className="w-5 h-5" />,
                title: "Mobile Development",
                description: "Native and cross-platform mobile apps",
              },
              {
                url: "/services/cloud-solutions",
                icon: <Network className="w-5 h-5" />,
                title: "Cloud Solutions",
                description: "Scalable cloud infrastructure and services",
              },
              {
                url: "/services/ui-ux-design",
                icon: <LayoutGrid className="w-5 h-5" />,
                title: "UI/UX Design",
                description: "User-centered design solutions",
              },
            ],
          },
          {
            title: "Professional Services",
            links: [
              {
                url: "/services/consulting",
                icon: <Wrench className="w-5 h-5" />,
                title: "Technical Consulting",
                description: "Expert guidance and solutions",
              },
              {
                url: "/services/team-augmentation",
                icon: <Users2 className="w-5 h-5" />,
                title: "Team Augmentation",
                description: "Skilled developers for your team",
              },
              {
                url: "/services/project-management",
                icon: <GanttChart className="w-5 h-5" />,
                title: "Project Management",
                description: "End-to-end project delivery",
              },
              {
                url: "/services/maintenance",
                icon: <Settings2 className="w-5 h-5" />,
                title: "Maintenance & Support",
                description: "Ongoing technical support",
              },
            ],
          },
          {
            title: "Enterprise Solutions",
            links: [
              {
                url: "/services/digital-transformation",
                icon: <Cpu className="w-5 h-5" />,
                title: "Digital Transformation",
                description: "Modernize your business",
              },
              {
                url: "/services/system-integration",
                icon: <Blocks className="w-5 h-5" />,
                title: "System Integration",
                description: "Seamless software integration",
              },
              {
                url: "/services/devops",
                icon: <Binary className="w-5 h-5" />,
                title: "DevOps Services",
                description: "Streamline your development",
              },
              {
                url: "/services/security",
                icon: <Shield className="w-5 h-5" />,
                title: "Security Services",
                description: "Protect your digital assets",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Company",
      url: "/company",
      icon: <Building className="w-5 h-5" />,
      megaMenu: {
        categoryLinks: [
          {
            title: "About Us",
            links: [
              {
                url: "/company/about",
                icon: <Info className="w-5 h-5" />,
                title: "Our Story",
                description: "Learn about our mission and values",
              },
              {
                url: "/company/team",
                icon: <Users className="w-5 h-5" />,
                title: "Our Team",
                description: "Meet the people behind our success",
              },
              {
                url: "/company/careers",
                icon: <GraduationCap className="w-5 h-5" />,
                title: "Careers",
                description: "Join our growing team",
              },
            ],
          },
          {
            title: "Innovation",
            links: [
              {
                url: "/company/technology",
                icon: <FileCode className="w-5 h-5" />,
                title: "Technology",
                description: "Our tech stack and innovations",
              },
              {
                url: "/company/research",
                icon: <Lightbulb className="w-5 h-5" />,
                title: "Research & Development",
                description: "Exploring new possibilities",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Resources",
      url: "/resources",
      icon: <BookOpen className="w-5 h-5" />,
      megaMenu: {
        categoryLinks: [
          {
            title: "Learn",
            links: [
              {
                url: "/resources/blog",
                icon: <Newspaper className="w-5 h-5" />,
                title: "Blog",
                description: "Latest insights and updates",
              },
              {
                url: "/resources/documentation",
                icon: <FileCode className="w-5 h-5" />,
                title: "Documentation",
                description: "Technical guides and references",
              },
              {
                url: "/resources/tutorials",
                icon: <GraduationCap className="w-5 h-5" />,
                title: "Tutorials",
                description: "Step-by-step learning resources",
              },
            ],
          },
          {
            title: "Support",
            links: [
              {
                url: "/resources/help",
                icon: <HelpCircle className="w-5 h-5" />,
                title: "Help Center",
                description: "Find answers to common questions",
              },
              {
                url: "/resources/contact",
                icon: <Phone className="w-5 h-5" />,
                title: "Contact Us",
                description: "Get in touch with our team",
              },
              {
                url: "/resources/chat",
                icon: <MessagesSquare className="w-5 h-5" />,
                title: "Live Chat",
                description: "Real-time support when you need it",
              },
            ],
          },
        ],
      },
    },
  ],
  buttons: [
    {
      title: "Get Started",
      size: "sm",
      variant: "primary",
    },
  ],
};
