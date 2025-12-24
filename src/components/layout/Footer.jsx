import React from 'react';
import UrbanPulseLogo from '../shared/UrbanPulseLogo';
import { FaFacebook, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://www.facebook.com/mdabed.azim", label: "Facebook" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/mohammad-abed-azim/", label: "LinkedIn" },
    { icon: <FaGithub />, url: "https://github.com/the-abed", label: "GitHub" },
  ];

  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <UrbanPulseLogo />
            <p className="text-sm leading-relaxed opacity-80">
              Empowering citizens to build smarter cities. Report infrastructure issues 
              instantly and track progress in real-time. Together for a better tomorrow.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/issues" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">All Issues</Link></li>
              <li><Link to="/about" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Legal & Help</h3>
            <ul className="space-y-4">
              <li><Link to="/terms-and-conditions" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">FAQs</Link></li>
              <li><Link to="/dashboard" className="text-sm opacity-70 hover:opacity-100 hover:text-secondary transition-colors">User Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm opacity-70">
                <FaMapMarkerAlt className="mt-1 text-secondary" />
                <span>Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <FaEnvelope className="text-secondary" />
                <span>support@urbanpulse.gov</span>
              </li>
              <li className="mt-6">
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
                  <p className="text-xs font-bold text-primary italic">Emergency Service</p>
                  <p className="text-sm font-black text-white mt-1">Call: 165 (Local Authority)</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/5 py-8 bg-black/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-50">
            © {currentYear} <span className="text-primary font-bold tracking-tight">UrbanPulse</span>. All rights reserved.
          </p>
          <p className="text-xs opacity-50 flex items-center gap-1">
            Developed with <span className="text-secondary">❤️</span> by Mohammad Abed Azim
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;