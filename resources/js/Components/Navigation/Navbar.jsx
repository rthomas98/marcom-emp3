import { useState } from "react";
import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { Link } from "@inertiajs/react";
import { 
  ChevronDown, 
  LayoutGrid, 
  Code, 
  Monitor,
  Database,
  Globe,
  MessageSquare,
  Rocket,
  Smartphone,
  Box,
  Settings,
  Users,
  UserPlus,
  Wrench,
  BookOpen,
  Briefcase,
  Image,
  Layers
} from "lucide-react";
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
    translateY: 8,
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
    translateY: -8,
  },
  closed: {
    rotate: 0,
    translateY: 0,
  },
};

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -5,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn"
    }
  }
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

  const getIcon = (iconName) => {
    const icons = {
      LayoutGrid,
      Code,
      Monitor,
      Database,
      Globe,
      MessageSquare,
      Rocket,
      Smartphone,
      Box,
      Settings,
      Users,
      UserPlus,
      Wrench,
      BookOpen,
      Briefcase,
      Image,
      Layers
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="size-5 text-cardinal" /> : null;
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-port-gore hover:bg-port-gore/5 hover:text-cardinal transition-all duration-200"
        >
          <span>{title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="pl-4"
            >
              {megaMenu.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="py-2">
                  <h3 className="mb-2 text-sm font-semibold text-port-gore/70">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 rounded-md p-2 hover:bg-cardinal/5"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && getIcon(item.icon)}
                          <div>
                            <div className="font-medium text-port-gore">
                              {item.title}
                            </div>
                            <div className="text-sm text-port-gore/70">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
        className="group flex items-center gap-x-1 text-sm font-medium leading-6 text-port-gore hover:text-cardinal transition-all duration-200"
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 group-hover:text-cardinal transition-colors duration-200" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="fixed left-0 right-0 z-50 mt-2"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-port-gore/5">
                <div className="grid gap-x-8 gap-y-6 p-6 md:grid-cols-2">
                  {megaMenu.sections.map((section, sectionIndex) => (
                    <motion.div
                      key={sectionIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                      className="space-y-3"
                    >
                      <h3 className="text-sm font-medium text-port-gore/60">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.href}
                              className="group flex items-start rounded-xl p-3 hover:bg-cardinal/5 transition-all duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.icon && (
                                <div className="shrink-0 mr-3 text-port-gore/60 group-hover:text-cardinal transition-colors duration-200">
                                  {getIcon(item.icon)}
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-port-gore group-hover:text-cardinal transition-colors duration-200">
                                  {item.title}
                                </div>
                                <div className="mt-1 text-sm text-port-gore/60 group-hover:text-port-gore/70">
                                  {item.description}
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
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

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollPosition, isScrollingUp } = useScrollPosition();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-white shadow-sm`}
    >
      <div className="container mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logos/logo.svg" 
              alt="Empuls3 Logo" 
              className="h-8 w-auto"
            />
          </Link>

          {!isMobile ? (
            <div className="flex items-center gap-8">
              {navigationConfig.mainMenu.map((item, index) =>
                item.megaMenu ? (
                  <SubMenu
                    key={index}
                    megaMenu={item.megaMenu}
                    title={item.title}
                    isMobile={false}
                  />
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-sm font-medium text-port-gore hover:text-cardinal transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                )
              )}
              <Button
                as={Link}
                href={navigationConfig.ctaButton.href}
                className="rounded-full bg-cardinal px-6 py-2.5 text-sm font-medium text-white hover:bg-cardinal/90 hover:shadow-md transition-all duration-200"
              >
                {navigationConfig.ctaButton.title}
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col items-center justify-center"
              aria-label="Toggle menu"
            >
              <motion.span
                variants={topLineVariants}
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="mb-1.5 h-0.5 w-6 bg-port-gore"
              />
              <motion.span
                variants={middleLineVariants}
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="mb-1.5 h-0.5 w-6 bg-port-gore"
              />
              <motion.span
                variants={bottomLineVariants}
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="h-0.5 w-6 bg-port-gore"
              />
            </button>
          )}

          <AnimatePresence>
            {isMobileMenuOpen && isMobile && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-0 right-0 top-full bg-white px-5 py-4 shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  {navigationConfig.mainMenu.map((item, index) =>
                    item.megaMenu ? (
                      <SubMenu
                        key={index}
                        megaMenu={item.megaMenu}
                        title={item.title}
                        isMobile={true}
                      />
                    ) : (
                      <Link
                        key={index}
                        href={item.href}
                        className="px-4 py-2 text-port-gore hover:text-cardinal"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  )}
                  <Button
                    as={Link}
                    href={navigationConfig.ctaButton.href}
                    className="rounded-full bg-cardinal px-6 py-2.5 text-sm font-medium text-white hover:bg-cardinal/90 hover:shadow-md transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {navigationConfig.ctaButton.title}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
