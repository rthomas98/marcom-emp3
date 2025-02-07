import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Code2,
  Database,
  Globe,
  Layers,
  Rocket,
  Smartphone,
  ArrowRight
} from 'lucide-react';

const solutions = [
  {
    icon: <Code2 className="size-8 text-cardinal" />,
    title: 'Custom Software Development',
    description:
      'Tailored solutions designed to meet your specific business requirements and challenges.',
    href: '/solutions/custom-software-development'
  },
  {
    icon: <Layers className="size-8 text-cardinal" />,
    title: 'Full Stack Development',
    description:
      'End-to-end development services covering both front-end and back-end technologies.',
    href: '/solutions/full-stack-development'
  },
  {
    icon: <Globe className="size-8 text-cardinal" />,
    title: 'Front-End Development',
    description:
      'Creating engaging and responsive user interfaces that deliver exceptional user experiences.',
    href: '/solutions/front-end-development'
  },
  {
    icon: <Database className="size-8 text-cardinal" />,
    title: 'Back-End Development',
    description:
      'Building robust server-side applications and APIs that power your digital solutions.',
    href: '/solutions/back-end-development'
  },
  {
    icon: <Smartphone className="size-8 text-cardinal" />,
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile applications that engage users on any device.',
    href: '/solutions/react-native'
  },
  {
    icon: <Rocket className="size-8 text-cardinal" />,
    title: 'MVP Development',
    description:
      'Rapid development of minimum viable products to validate your business ideas quickly.',
    href: '/solutions/mvp-development'
  }
];

export function Layout242() {
  return (
    <section className="bg-athens-gray py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-port-gore md:text-4xl lg:text-5xl">
            Our Development Solutions
          </h2>
          <p className="mb-16 text-lg text-port-gore/70">
            Discover our comprehensive range of development services designed to
            help your business thrive in the digital age.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              href={solution.href}
              className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4">{solution.icon}</div>
              <h3 className="mb-2 font-heading text-xl font-bold text-port-gore">
                {solution.title}
              </h3>
              <p className="mb-4 text-port-gore/70">{solution.description}</p>
              <div className="flex items-center gap-2 text-cardinal">
                Learn More
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-cardinal px-8 py-4 text-white transition-all hover:bg-cardinal/90 hover:shadow-lg"
          >
            Get Started
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
