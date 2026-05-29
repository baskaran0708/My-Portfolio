import { Link } from "react-router-dom";

import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="footer font-poppins">
      <hr className="border-slate-200" />

      <div className="footer-container">
        <p className="text-sm text-center sm:text-left">
          © 2025 <strong>Baskaran A</strong>. All rights reserved.
        </p>

        <div className="flex gap-4 justify-center items-center flex-wrap">
          {socialLinks.map((item) => {
            const isExternal = item.link.startsWith("http");
            const content = (
              <img
                src={item.iconUrl}
                alt={item.name}
                className="w-6 h-6 object-contain"
              />
            );
            return isExternal ? (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                {content}
              </a>
            ) : (
              <Link key={item.name} to={item.link} aria-label={item.name}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
