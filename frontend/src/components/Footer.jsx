import { Facebook, Youtube, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-lime-100 py-8 text-center">
      <p className="text-gray-800 mb-4 font-medium">
        Follow us @Urban Jungle Co.
      </p>
      <div className="flex justify-center gap-6 text-2xl text-black">
        <a href="#" aria-label="Facebook">
          <Facebook />
        </a>
        <a href="#" aria-label="YouTube">
          <Youtube />
        </a>

        <a href="#" aria-label="X (Twitter)">
          <Twitter />
        </a>
        <a href="#" aria-label="Instagram">
          <Instagram />
        </a>
      </div>
    </div>
  );
};

export default Footer;
