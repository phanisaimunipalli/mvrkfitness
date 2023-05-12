import React from "react";
/* import { FaFacebook } from 'react-icons/fa'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTwitter } from 'react-icons/fa'
import { BsYoutube } from 'react-icons/bs' */

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="bg-primary">
        <footer className="mid-container items-center p-4 text-neutral-content">
          <div className="sm:flex sm:justify-between">
            <div className="flex items-center justify-center">
              <p className="text-sm">
                <sup className="text">
                  2023 © Developed By Team Maverick @ SJSU. All Rights Reserved.
                </sup>{" "}
                <span className="font-bold text-white"></span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
