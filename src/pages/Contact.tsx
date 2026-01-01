import React from "react";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

export const Contact = () => {
  return (
    <>
      <div className="pt-32 pb-40 bg-neutral-dark text-white text-center slant-divider-bottom-lg">
        <h1 className="text-5xl font-display font-bold mb-4">Contact Us</h1>
        <p className="text-neutral-400">
          We are ready to discuss your next challenge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Info Side */}
        <div className="bg-primary text-white p-12 lg:p-20 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-10">Get in Touch</h2>
          <div className="space-y-8 text-neutral-300">
            <div className="flex items-start">
              <MapPin className="mr-6 mt-1 text-accent" size={24} />
              <div>
                <h3 className="text-white font-bold mb-1">Head Office</h3>
                <p className="mb-2">
                  401, Red Crescent Building,
                  <br />
                  Al Garhoud, Dubai, U.A.E
                </p>
                <p>
                  411, DBCS Building,
                  <br />
                  Al Gharoud, Dubai, U.A.E
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="mr-6 mt-1 text-accent" size={24} />
              <div>
                <h3 className="text-white font-bold mb-1">Phone</h3>
                <p>+971 4 267 6054 / +971 4 337 8073</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="mr-6 mt-1 text-accent" size={24} />
              <div>
                <h3 className="text-white font-bold mb-1">Email</h3>
                <p>info@rabatpfc.com</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Briefcase className="mr-3" size={20} /> Careers
            </h3>
            <p className="text-neutral-300 mb-6">
              Join a culture of safety, innovation, and excellence. We are
              always looking for talent.
            </p>
            <a
              href="mailto:careers@alrabat-se.ae"
              className="text-accent hover:text-white font-bold transition-colors"
            >
              Send CV to careers@alrabat-se.ae &rarr;
            </a>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12 lg:p-20 bg-white">
          <div className="mb-10 pb-6 border-b border-neutral-100">
            <h2 className="text-2xl font-bold text-primary">Project Enquiry</h2>
            <p className="text-neutral-500 mt-2">
              Tell us about your project needs.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-600">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-600">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600">
                Company / Organization
              </label>
              <input
                type="text"
                className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-600">
                Message
              </label>
              <textarea
                className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors h-40"
                placeholder="Tell us about your project..."
              />
            </div>
            <Button className="w-full">Submit Message</Button>
          </form>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=Red%20Crescent%20Building%2C%20Al%20Garhoud%2C%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
        />
      </div>
    </>
  );
};
