import { Button } from "@relume_io/relume-ui";
import { Link } from "@inertiajs/react";
import { footerConfig } from "./footerConfig";

export default function Footer() {
  const {
    logo,
    newsletterDescription,
    inputPlaceholder,
    button,
    termsAndConditions,
    columnLinks,
    footerText,
    footerLinks,
  } = footerConfig;

  return (
    <footer className="bg-athens-gray">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-x-8 lg:gap-y-0">
          {/* Newsletter Section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href={logo.url} className="mb-4 inline-block sm:mb-6">
              <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
            </Link>
            <p className="mb-4 text-base text-port-gore sm:mb-6">
              {newsletterDescription}
            </p>
            <div className="w-full max-w-md">
              <form className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                <div className="min-w-0">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full rounded-full border border-port-gore/10 bg-white px-4 py-2 text-port-gore placeholder:text-port-gore/60 focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
                    placeholder={inputPlaceholder}
                  />
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    {...button}
                    className="w-full rounded-full bg-cardinal px-6 py-2 text-sm font-medium text-white hover:bg-cardinal/90 focus:outline-none focus:ring-0 sm:w-auto"
                  >
                    {button.title}
                  </Button>
                </div>
              </form>
              <div
                className="text-sm text-port-gore/60"
                dangerouslySetInnerHTML={{ __html: termsAndConditions }}
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-8">
            {columnLinks.map((column, columnIndex) => (
              <div 
                key={columnIndex} 
                className="flex flex-col items-center md:items-start"
              >
                <h3 className="mb-4 font-heading text-sm font-semibold text-port-gore text-center md:text-left">
                  {column.title}
                </h3>
                <ul className="space-y-3 sm:space-y-4 flex flex-col items-center md:items-start">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="text-center md:text-left">
                      {link.icon ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-port-gore hover:text-cardinal"
                        >
                          {link.icon}
                          <span>{link.title}</span>
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="text-sm text-port-gore hover:text-cardinal"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-port-gore/10 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-col items-center space-y-6 md:flex-row md:justify-between md:space-y-0">
            <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="text-sm text-port-gore/70 hover:text-cardinal whitespace-nowrap"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <p className="text-sm text-port-gore/70 text-center md:text-left">
              {footerText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
