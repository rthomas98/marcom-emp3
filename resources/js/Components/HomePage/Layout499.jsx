import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, GitBranch } from 'lucide-react';
import { Tab } from '@headlessui/react';

export function Layout499() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      name: "Development",
      features: [
        {
          icon: <Zap size={24} strokeWidth={1.5} className="text-cardinal" />,
          title: "Lightning Fast",
          description: "Experience blazing-fast performance with our optimized solutions."
        },
        {
          icon: <Shield size={24} strokeWidth={1.5} className="text-cardinal" />,
          title: "Enterprise Security",
          description: "Bank-grade security measures to protect your valuable data."
        },
        {
          icon: <GitBranch size={24} strokeWidth={1.5} className="text-cardinal" />,
          title: "Seamless Integration",
          description: "Effortlessly connect with your existing tools and workflows."
        }
      ],
      image: {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        alt: "Development team collaboration"
      }
    },
    {
      name: "Design",
      features: [
        {
          icon: <Zap size={24} strokeWidth={1.5} className="text-cardinal" />,
          title: "Modern Design",
          description: "Create stunning user interfaces with our modern design system."
        },
        {
          icon: <Shield size={24} strokeWidth={1.5} className="text-cardinal" />,
          title: "Responsive",
          description: "Fully responsive layouts that work on any device or screen size."
        },
        {
          icon: <GitBranch size={24} strokeWidth={1.5} className="text-cardinal" />,
          title: "Customizable",
          description: "Easily customize and extend components to match your brand."
        }
      ],
      image: {
        src: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        alt: "Design team working"
      }
    }
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-port-gore/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tab.Group onChange={setSelectedTab}>
          <Tab.List className="flex space-x-4 border-b border-port-gore/10">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium leading-5 transition-all duration-200 focus:outline-none
                  ${selected 
                    ? 'text-cardinal border-b-2 border-cardinal' 
                    : 'text-port-gore/60 hover:text-port-gore/80'
                  }`
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-16">
            <AnimatePresence mode="wait">
              {tabs.map((tab, idx) => (
                <Tab.Panel
                  key={idx}
                  static
                  className={idx === selectedTab ? 'block' : 'hidden'}
                >
                  <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <h2 className="font-heading text-3xl font-bold tracking-tight text-port-gore sm:text-4xl">
                        Transform Your Digital Presence
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-port-gore/70">
                        Unlock new possibilities with our innovative solutions. We help businesses navigate the digital landscape with confidence.
                      </p>
                      <div className="mt-10 space-y-8">
                        {tab.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex gap-4"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cardinal/10">
                              {feature.icon}
                            </div>
                            <div>
                              <h3 className="font-heading text-lg font-semibold text-port-gore">
                                {feature.title}
                              </h3>
                              <p className="mt-2 text-base text-port-gore/70">
                                {feature.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-gray-50">
                        <img
                          src={`${tab.image.src}?auto=format&fit=crop&w=1740&q=80`}
                          alt={tab.image.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-cardinal/20 to-transparent mix-blend-multiply" />
                      </div>
                    </motion.div>
                  </div>
                </Tab.Panel>
              ))}
            </AnimatePresence>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
} 