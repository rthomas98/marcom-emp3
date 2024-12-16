import { useState } from "react";
import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { Link } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { navigationConfig } from "./navigationConfig";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    setIsScrollingUp(currentScrollTop < lastScrollTop);
    setLastScrollTop(currentScrollTop);
    setScrollPosition(currentScrollTop);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return { scrollPosition, isScrollingUp };
};

const topLineVariants = {
  open: {
    rotate: 45,
    translateY: 5,
  },
  closed: {
    rotate: 0,
    translateY: 0,
  },
};

const middleLineVariants = {
  open: {
    opacity: 0,
  },
  closed: {
    opacity: 1,
  },
};

const bottomLineVariants = {
  open: {
    rotate: -45,
    translateY: -5,
  },
  closed: {
    rotate: 0,
    translateY: 0,
  },
};

const SubMenu = ({ megaMenu, title, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-port-gore hover:bg-port-gore/5"
        >
          <span>{title}</span>
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2 pl-4">
                {megaMenu.categoryLinks.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2">
                    {category.title && (
                      <p className="text-sm font-medium text-port-gore/60">
                        {category.title}
                      </p>
                    )}
                    <div className="space-y-2">
                      {category.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.url}
                          className="group flex items-start rounded-lg p-2 text-sm text-port-gore hover:bg-port-gore/5"
                        >
                          <div className="shrink-0 mr-3 text-port-gore/60 group-hover:text-cardinal">
                            {link.icon}
                          </div>
                          <div>
                            <div className="font-medium">{link.title}</div>
                            {link.description && (
                              <p className="mt-1 text-sm text-port-gore/60 group-hover:text-port-gore/70">
                                {link.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-1 text-sm font-medium leading-6 text-port-gore hover:text-cardinal transition-colors duration-200"
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 z-50 mt-2 bg-white shadow-lg"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={`grid gap-x-8 gap-y-6 p-6 ${
                title === "Services" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
              }`}>
                {megaMenu.categoryLinks.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-3">
                    {category.title && (
                      <p className="text-sm font-medium text-port-gore/60">
                        {category.title}
                      </p>
                    )}
                    <div className="space-y-3">
                      {category.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.url}
                          className="group flex items-start rounded-lg p-2 hover:bg-port-gore/5"
                        >
                          <div className="shrink-0 mr-3 text-port-gore/60 group-hover:text-cardinal">
                            {link.icon}
                          </div>
                          <div>
                            <div className="font-medium text-port-gore group-hover:text-cardinal">
                              {link.title}
                            </div>
                            {link.description && (
                              <p className="mt-1 text-sm text-port-gore/60 group-hover:text-port-gore/70">
                                {link.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

SubMenu.propTypes = {
  megaMenu: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { scrollPosition, isScrollingUp } = useScrollPosition();
  const { logo, navLinks, buttons } = navigationConfig;
  const showNavbar = scrollPosition < 100 || isScrollingUp;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-sm">
      <motion.div
        initial={false}
        animate={{
          y: showNavbar ? 0 : -100,
          opacity: showNavbar ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="border-b border-port-gore/10"
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href={logo.url} className="-m-1.5 p-1.5">
              <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navLinks.map((navLink, index) => (
              <div key={index}>
                {navLink.megaMenu ? (
                  <SubMenu
                    megaMenu={navLink.megaMenu}
                    title={navLink.title}
                    isMobile={false}
                  />
                ) : (
                  <Link
                    href={navLink.url}
                    className="flex items-center gap-x-2 text-sm font-medium leading-6 text-port-gore hover:text-cardinal transition-colors duration-200"
                  >
                    {navLink.icon}
                    {navLink.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                {...button}
                className="rounded-full bg-cardinal px-6 py-2 text-sm font-medium text-white hover:bg-cardinal/90 focus:outline-none focus:ring-0"
              >
                {button.title}
              </Button>
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="relative h-10 w-10 text-port-gore"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-[5px]">
                <motion.span
                  className="block h-[2px] w-5 bg-current origin-center"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  variants={topLineVariants}
                />
                <motion.span
                  className="block h-[2px] w-5 bg-current"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  variants={middleLineVariants}
                />
                <motion.span
                  className="block h-[2px] w-5 bg-current origin-center"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  variants={bottomLineVariants}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <div className="divide-y divide-port-gore/10 bg-white px-4 py-6 shadow-lg">
              <div className="space-y-2 pb-6">
                {navLinks.map((navLink, index) => (
                  <div key={index} className="-mx-3">
                    {navLink.megaMenu ? (
                      <SubMenu
                        megaMenu={navLink.megaMenu}
                        title={navLink.title}
                        isMobile={true}
                      />
                    ) : (
                      <Link
                        href={navLink.url}
                        className="flex items-center gap-x-2 rounded-lg px-3 py-2 text-base font-medium leading-7 text-port-gore hover:bg-port-gore/5"
                      >
                        <div className="shrink-0 text-port-gore/60">
                          {navLink.icon}
                        </div>
                        {navLink.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-4 py-6">
                {buttons.map((button, index) => (
                  <div key={index} className="-mx-3">
                    <Button
                      {...button}
                      className="w-full justify-center rounded-full bg-cardinal px-6 py-2 text-sm font-medium text-white hover:bg-cardinal/90 focus:outline-none focus:ring-0"
                    >
                      {button.title}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
