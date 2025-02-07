"use client";

import { useState } from "react";
import { useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { navigationConfig } from './navigationConfig.jsx';

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const SubMenu = ({ navLink, isMobile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { url } = usePage();
  
  if (!navLink) return null;
  
  const isActive = navLink.subMenu?.some(submenu => 
    submenu.subMenuLinks?.some(link => url.startsWith(link.url))
  );
  
  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className={`flex w-full items-center justify-between gap-2 py-3 text-left text-md hover:text-cardinal transition-colors duration-200 lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base ${
          isActive ? 'text-cardinal font-medium' : 'text-port-gore'
        }`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.span>
      </button>
      {isDropdownOpen && navLink.subMenu && (
        <AnimatePresence>
          <motion.nav
            variants={{
              open: {
                visibility: "visible",
                opacity: "var(--opacity-open, 100%)",
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
              },
            }}
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="bg-white py-4 lg:absolute lg:right-[186px] lg:z-50 lg:max-w-[640px] lg:border lg:border-port-gore/10 lg:p-6 lg:shadow-lg lg:[--y-close:25%]"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
              {navLink.subMenu?.map((item, index) => (
                <div key={index}>
                  <h4 className="mb-3 font-heading text-sm font-semibold text-port-gore/70 leading-[1.3] md:mb-4">
                    {item.heading}
                  </h4>
                  <div className="flex flex-col gap-2 md:gap-4">
                    {item.subMenuLinks?.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        className={`my-1 flex items-start gap-x-3 text-md group lg:text-base ${
                          url.startsWith(link.url) ? 'text-cardinal' : 'text-port-gore'
                        }`}
                      >
                        {link.icon}
                        <div className="flex grow flex-col">
                          <p className={`font-semibold group-hover:text-cardinal transition-colors duration-200 ${
                            url.startsWith(link.url) ? 'text-cardinal' : 'text-port-gore'
                          }`}>{link.title}</p>
                          <p className="hidden text-sm text-port-gore/70 md:block">{link.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.nav>
        </AnimatePresence>
      )}
    </div>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const { logo, navLinks, buttons } = navigationConfig || {};
  const { url } = usePage();

  if (!logo || !navLinks || !buttons) {
    console.error('Navigation configuration is missing required properties');
    return null;
  }

  return (
    <section className="flex w-full items-center border-b border-port-gore/10 bg-white lg:min-h-18 lg:px-[5%]">
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <Link href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
            <span className="font-heading text-lg font-semibold text-port-gore sm:text-xl md:text-2xl">Empuls3</span>
          </Link>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-port-gore"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-port-gore"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-port-gore"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
            />
          </button>
        </div>
        <motion.div
          variants={{
            open: {
              height: "var(--height-open, calc(100vh - 64px))",
            },
            close: {
              height: "var(--height-closed, 0)",
            },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.4 }}
          className="overflow-auto px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          <nav className="lg:flex lg:items-center">
            {navLinks.map((navLink, index) =>
              navLink.subMenu && navLink.subMenu.length > 0 ? (
                <SubMenu key={index} navLink={navLink} isMobile={isMobile} />
              ) : (
                <Link
                  key={index}
                  href={navLink.url}
                  className={`block py-3 text-md hover:text-cardinal transition-colors duration-200 first:pt-7 lg:px-4 lg:py-2 lg:text-base lg:first:pt-2 ${
                    url === navLink.url ? 'text-cardinal font-medium' : 'text-port-gore'
                  }`}
                >
                  {navLink.title}
                </Link>
              )
            )}
          </nav>
          <div className="my-6 flex flex-col gap-4 lg:my-0 lg:ml-4 lg:flex-row lg:items-center">
            {buttons.map((button) => (
              <Link
                key={button.url}
                href={button.url}
                className="rounded-full bg-port-gore px-6 py-2.5 text-white hover:bg-cardinal hover:shadow-md text-center text-sm font-medium transition-all duration-200"
              >
                {button.title}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
