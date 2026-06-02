'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Step2() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log('Role Selected:', role);
  };

  const roles = [
    { id: 'developer', title: 'Developer', description: 'Building applications and integrating complex workflows.', icon: 'terminal' },
    { id: 'founder', title: 'Founder', description: 'Scaling a business and leading technical strategy.', icon: 'rocket_launch' },
    { id: 'creator', title: 'Creator', description: 'Designing experiences and visual assets for the web.', icon: 'palette' },
    { id: 'community', title: 'Community Manager', description: 'Engaging users and fostering collaborative ecosystems.', icon: 'groups' },
    { id: 'student', title: 'Student', description: 'Learning the ropes and exploring new technologies.', icon: 'school' },
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-['Geist',_sans-serif]">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/50">
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">Arcfuse</div>
          <div className="flex items-center gap-sm">
            <span className="font-label-md text-label-md text-on-surface-variant">Step 2 of 4</span>
            <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-primary transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-xl px-margin-mobile">
        <div className="max-w-[800px] w-full">
          {/* Header Section */}
          <div className="text-center mb-lg">
            <h1 className="font-display-lg text-display-lg mb-sm text-on-surface">What best describes you?</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">We&apos;ll tailor your Arcfuse experience based on your role.</p>
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 gap-sm md:gap-md max-w-[600px] mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`group cursor-pointer p-md rounded-xl border transition-all duration-200 flex items-center gap-md ${
                  selectedRole === role.id
                    ? 'border-primary bg-surface-container-low shadow-[0_4px_20px_-2px_rgba(30,0,169,0.08)]'
                    : 'border-outline-variant bg-surface-container-lowest hover:border-primary/40'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  selectedRole === role.id ? 'bg-primary text-on-primary' : 'bg-primary-fixed text-primary group-hover:bg-primary group-hover:text-on-primary'
                }`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>{role.icon}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{role.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{role.description}</p>
                </div>
                <div className={`transition-opacity ${selectedRole === role.id ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action Section */}
          <div className="mt-lg flex flex-col items-center gap-sm">
            {selectedRole ? (
                <Link href="/onboarding/step-3" className="w-full max-w-[600px] h-14 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-xs">
                    Continue
                    <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
            ) : (
                <button disabled className="w-full max-w-[600px] h-14 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-lg shadow-primary/20 opacity-50 cursor-not-allowed transition-all flex items-center justify-center gap-xs">
                    Continue
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            )}

            <button className="font-label-md text-label-md text-secondary hover:text-primary transition-colors px-md py-xs">
              I&apos;ll do this later
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-md bg-surface border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto gap-sm">
          <div className="font-label-md text-label-md font-semibold text-on-surface">Arcfuse Inc.</div>
          <div className="flex gap-md">
            <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
          <div className="font-body-sm text-body-sm text-secondary">© 2024 Arcfuse Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
