import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export const Header79 = ({ 
  heading,
  description,
  buttons = [],
  ...props 
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-port-gore to-port-gore/90 px-[5%] pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cardinal/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-koromiko/10 via-transparent to-transparent"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(var(--port-gore-10) 1px, transparent 1px), linear-gradient(90deg, var(--port-gore-10) 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
        opacity: '0.1'
      }}></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="font-sans mb-8 text-lg text-white/80 md:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {buttons?.map((button, index) => (
              <Link
                key={index}
                href={button.url || '#'}
                className={`${
                  button.variant === 'primary'
                    ? 'bg-cardinal text-white hover:bg-cardinal/90'
                    : 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20'
                } font-sans inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-300`}
              >
                {button.title}
                <ArrowRight className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -left-4 top-1/4 h-24 w-24 animate-float rounded-2xl bg-gradient-to-br from-cardinal to-cardinal/50 blur-xl"></div>
        <div className="absolute -right-8 bottom-1/4 h-32 w-32 animate-float-delay rounded-full bg-gradient-to-br from-koromiko to-koromiko/50 blur-xl"></div>
      </div>
    </section>
  );
};
