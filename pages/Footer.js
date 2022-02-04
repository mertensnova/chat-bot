import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <section className="w-full flex py-14 bg-black text-GrayTwo flex-col justify-center items-center">
      <div className="  text-white w-9/12 text-2xl cursor-pointer flex items-center justify-start">
        <FontAwesomeIcon icon={faFacebook} className="mx-2"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faTwitter} className="mx-2"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faYoutube} className="mx-2"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faInstagram} className="mx-2"></FontAwesomeIcon>
      </div>
      <article className="w-full flex items-center justify-evenly text-xs py-5">
        <ul class="member-footer-links">
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="/browse/subtitles">
              <span class="member-footer-link-content">
                Audio and Subtitles
              </span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="/browse/audio-description">
              <span class="member-footer-link-content">Audio Description</span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="https://help.netflix.com/">
              <span class="member-footer-link-content">Help Center</span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="/redeem">
              <span class="member-footer-link-content">Gift Cards</span>
            </a>
          </li>
        </ul>
        <ul>
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="https://media.netflix.com/">
              <span class="member-footer-link-content">Media Center</span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="http://ir.netflix.com/">
              <span class="member-footer-link-content">Investor Relations</span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="https://jobs.netflix.com/">
              <span class="member-footer-link-content">Jobs</span>
            </a>
          </li>
        </ul>
        <ul>
          <li class="member-footer-link-wrapper">
            <a
              class="member-footer-link"
              href="https://help.netflix.com/legal/termsofuse"
            >
              <span class="member-footer-link-content">Terms of Use</span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a
              class="member-footer-link"
              href="https://help.netflix.com/legal/privacy"
            >
              <span class="member-footer-link-content">Privacy</span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a
              class="member-footer-link"
              href="https://help.netflix.com/legal/notices"
            >
              <span class="member-footer-link-content">Legal Notices</span>
            </a>
          </li>
        </ul>
        <ul>
          <li class="member-footer-link-wrapper">
            <a class="member-footer-link" href="/Cookies">
              <span class="member-footer-link-content">Cookie Preferences</span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a
              class="member-footer-link"
              href="https://help.netflix.com/legal/corpinfo"
            >
              <span class="member-footer-link-content">
                Corporate Information
              </span>
            </a>
          </li>
          <li class="member-footer-link-wrapper">
            <a
              class="member-footer-link"
              href="https://help.netflix.com/contactus"
            >
              <span class="member-footer-link-content">Contact Us</span>
            </a>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default Footer;
