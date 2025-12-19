import React, { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const Contact = () => {
    const [formType, setFormType] = useState<'Project' | 'Career'>('Project');

    return (
        <>
            <div className="pt-32 pb-20 bg-neutral-dark text-white text-center">
                <h1 className="text-5xl font-display font-bold mb-4">Contact Us</h1>
                <p className="text-neutral-400">We are ready to discuss your next challenge.</p>
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
                                <p>Office 204, Citadel Tower<br />Business Bay, Dubai, UAE</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Phone className="mr-6 mt-1 text-accent" size={24} />
                            <div>
                                <h3 className="text-white font-bold mb-1">Phone</h3>
                                <p>+971 4 123 4567</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Mail className="mr-6 mt-1 text-accent" size={24} />
                            <div>
                                <h3 className="text-white font-bold mb-1">Email</h3>
                                <p>info@alrabat-se.ae</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/10">
                        <h3 className="text-xl font-bold mb-4 flex items-center"><Briefcase className="mr-3" size={20} /> Careers</h3>
                        <p className="text-neutral-300 mb-6">
                            Join a culture of safety, innovation, and excellence. We are always looking for talent.
                        </p>
                        <a href="mailto:careers@alrabat-se.ae" className="text-accent hover:text-white font-bold transition-colors">
                            Send CV to careers@alrabat-se.ae &rarr;
                        </a>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-12 lg:p-20 bg-white">
                    <div className="flex space-x-6 mb-10 pb-6 border-b border-neutral-100">
                        <button onClick={() => setFormType('Project')} className={`text-sm font-bold uppercase tracking-wider pb-6 -mb-6 border-b-2 transition-colors ${formType === 'Project' ? 'border-accent text-primary' : 'border-transparent text-neutral-400 hover:text-primary'}`}>Project Enquiry</button>
                        <button onClick={() => setFormType('Career')} className={`text-sm font-bold uppercase tracking-wider pb-6 -mb-6 border-b-2 transition-colors ${formType === 'Career' ? 'border-accent text-primary' : 'border-transparent text-neutral-400 hover:text-primary'}`}>Careers</button>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-600">Name</label>
                                <input type="text" className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-600">Email</label>
                                <input type="email" className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors" />
                            </div>
                        </div>
                        {formType === 'Project' && (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-neutral-600">Company / Organization</label>
                                <input type="text" className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors" />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-600">Message</label>
                            <textarea className="w-full p-4 bg-neutral-50 rounded border border-transparent focus:bg-white focus:border-accent outline-none transition-colors h-40" placeholder={formType === 'Project' ? "Tell us about your project requirements..." : "Tell us about your experience..."} />
                        </div>
                        <Button className="w-full">Submit Message</Button>
                    </form>
                </div>
            </div>

            <div className="bg-neutral-200 h-[400px] flex items-center justify-center text-neutral-500">
                [Google Map Placeholder]
            </div>
        </>
    );
};
