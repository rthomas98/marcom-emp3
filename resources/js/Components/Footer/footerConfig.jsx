import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export const footerConfig = {
  logo: {
    url: "/",
    src: "/images/logos/logo.svg",
    alt: "Marcom Empuls3",
  },
  newsletterDescription: "Subscribe to our newsletter for the latest updates, insights, and industry trends in software development and digital solutions.",
  inputPlaceholder: "Enter your email",
  button: {
    title: "Subscribe",
    variant: "secondary",
    size: "sm",
  },
  termsAndConditions: `
    <p class='text-xs text-port-gore'>
      By subscribing you agree to our
      <a href='/privacy-policy' class='underline hover:text-cardinal'> Privacy Policy </a>
      and provide consent to receive updates from our company.
    </p>
  `,
  columnLinks: [
    {
      title: "Solutions",
      links: [
        { title: "Front-End Development", url: "/solutions/frontend-development" },
        { title: "Back-End Development", url: "/solutions/backend-development" },
        { title: "Full-Stack Development", url: "/solutions/fullstack-development" },
        { title: "Custom Software", url: "/solutions/custom-software-development" },
        { title: "E-commerce Development", url: "/solutions/ecommerce-development" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About Us", url: "/company/about" },
        { title: "Become a Partner", url: "/company/partner" },
        { title: "News & Updates", url: "/company/news" },
        { title: "Contact Us", url: "/resources/contact" },
        { title: "Case Studies", url: "/resources/case-studies" },
      ],
    },
    {
      title: "Connect With Us",
      links: [
        { 
          title: "Facebook", 
          url: "https://facebook.com/marcomempuls3",
          icon: <BiLogoFacebookCircle className="size-6 text-port-gore hover:text-cardinal" />
        },
        { 
          title: "Instagram", 
          url: "https://instagram.com/marcomempuls3",
          icon: <BiLogoInstagram className="size-6 text-port-gore hover:text-cardinal" />
        },
        { 
          title: "X", 
          url: "https://x.com/marcomempuls3",
          icon: <FaXTwitter className="size-6 p-0.5 text-port-gore hover:text-cardinal" />
        },
        { 
          title: "LinkedIn", 
          url: "https://linkedin.com/company/marcomempuls3",
          icon: <BiLogoLinkedinSquare className="size-6 text-port-gore hover:text-cardinal" />
        },
        { 
          title: "Youtube", 
          url: "https://youtube.com/@marcomempuls3",
          icon: <BiLogoYoutube className="size-6 text-port-gore hover:text-cardinal" />
        },
      ],
    },
  ],
  footerText: "© 2024 Marcom Empuls3. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", url: "/privacy-policy" },
    { title: "Terms of Service", url: "/terms-of-service" },
    { title: "Cookie Policy", url: "/cookie-policy" },
  ],
};
