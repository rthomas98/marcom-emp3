import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function Footer({ 
  logo,
  newsletterDescription,
  inputPlaceholder,
  button,
  termsAndConditions,
  columnLinks,
  footerText,
  footerLinks 
}) {
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
                  <Link
                    href={button.url}
                    className="inline-block w-full rounded-full bg-cardinal px-6 py-2 text-center text-sm font-medium text-white hover:bg-cardinal/90 focus:outline-none focus:ring-0 sm:w-auto"
                  >
                    {button.title}
                  </Link>
                </div>
              </form>
              <div
                className="text-sm text-port-gore/60"
                dangerouslySetInnerHTML={{ __html: termsAndConditions }}
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
            {columnLinks.map((column, columnIndex) => (
              <div key={columnIndex}>
                <h3 className="mb-4 text-sm font-semibold text-port-gore sm:mb-6">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.url}
                        className="text-sm text-port-gore/60 hover:text-cardinal"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-port-gore/10 pt-8 text-center sm:mt-12 sm:pt-12 md:flex-row md:text-left">
          <p className="text-sm text-port-gore/60">{footerText}</p>
          <ul className="flex flex-wrap justify-center gap-6 md:justify-end">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.url}
                  className="text-sm text-port-gore/60 hover:text-cardinal"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  logo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  newsletterDescription: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  button: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  termsAndConditions: PropTypes.string.isRequired,
  columnLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  footerText: PropTypes.string.isRequired,
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};
