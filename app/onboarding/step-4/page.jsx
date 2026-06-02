import Link from 'next/link';

export default function Step4() {
  return (
    <div className="min-h-screen flex flex-col text-on-surface bg-[#fcf8ff] font-['Geist',_sans-serif]">
      {/* Top Navigation (Shell Inactive for Setup Flow) */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/50">
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">Arcfuse</div>
          <div className="flex items-center gap-sm">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Step 4 of 4</span>
            <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-full"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-xl pb-xl px-margin-mobile md:px-margin-desktop max-w-[960px] mx-auto w-full">
        {/* Header Section */}
        <section className="mt-lg mb-xl text-center">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">Bring your tools together</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
            Connect Arcfuse with the platforms you use daily to automate workflows, sync data, and centralize your communication.
          </p>
        </section>

        {/* Bento-style Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* GitHub Card (Connected State) */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            <div className="absolute top-0 right-0 p-sm">
              <div className="flex items-center gap-xs bg-emerald-50 text-emerald-700 px-base py-xs rounded-full border border-emerald-100">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-label-md text-label-md">Connected</span>
              </div>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-on-surface flex items-center justify-center mb-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="GitHub Logo" className="w-7 h-7 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIjl9zx9yucM_5FDwV2JJeMH41gAtq5g7v7yI7NJb2nu3ZeYiNEpmZb29cEOj8A7-nIOmeCapffYP9aJ8GI8JQ0ml1WN78Qyii7wfbkFuYCNH8hTeuHK0k01Xa_VzPZ1IAHuD2pwxMurEglYefTZ8owJWhg8-HRw6k_rw1wjmpWMxKzr9HQHJvfUqjDFGAD-94tMN1jEQKphW5qsO7AkKAh9ToYYPavBJXasehCo8hHpX1qR-kybqeIeIY9UL7jfbNBrsYD265sno"/>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">GitHub</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Sync pull requests, track repository issues, and automate your CI/CD deployments directly within Arcfuse.
              </p>
            </div>
            <button className="w-full py-sm px-md rounded-lg border border-outline font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors cursor-pointer active:opacity-70 active:scale-[0.98]">
              Manage Connection
            </button>
          </div>

          {/* Discord Card */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#5865F2] flex items-center justify-center mb-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Discord Logo" className="w-7 h-7 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2LscewxgaKiJVHTnih5GSGQFADS0u35i1aaSp_C1cYJQCEWMQMkxIpjoINy3572k-U9nfYOIJbxfKK2DbajHwtDLK3lWXkNzr9Ru9ddNCrYXnp9fODFrLEjuJW5KgSk7rTwOV4ldMD46kTmmiKvC90jMZ9gDQ3glskJYsf3WrhstmDZ4L8kYGxj1aXtlys1IiaMKTs3zfHDJddwiiM0Gmlc0WjVvlb7qkVhUZHoTmmU5UEI68BQ6gW56wn_1lnEGGzdJ2b1s3Mgo"/>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">Discord</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Receive real-time notifications in your channels and bridge community conversations into your workspace.
              </p>
            </div>
            <button className="w-full py-sm px-md rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-[0.98]">
              Connect
            </button>
          </div>

          {/* Reddit Card */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FF4500] flex items-center justify-center mb-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Reddit Logo" className="w-7 h-7 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLg-asXRsx8tWlNm6ZRWrqF56lXh_hNfEzxBLyTFnX75jCf9yOaQTCOPal5Rdl5_GBuHa26uYaU8ReQ2ZcK78aIgMUHbvJTSfNQrduVmv6Aotbgq4ZpA8dATapyYmCWS4VUUUXktAU3Qrc4B1j9TL8wosM-DmWX7egTXoKbXHgWn0o2v3O8qQNDwkNpMdDHaHs9d_VyZZYgbUQHIgtF79yd-d3RgcFrIvn8IgIn4t-rZhvCs-eHZldWtF3UBvHab5vPKGazYlWZ0"/>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">Reddit</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Monitor subreddit mentions, track industry trends, and engage with relevant threads from your dashboard.
              </p>
            </div>
            <button className="w-full py-sm px-md rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-[0.98]">
              Connect
            </button>
          </div>

          {/* Telegram Card */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-10px_rgba(30,0,169,0.08)]">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#0088CC] flex items-center justify-center mb-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Telegram Logo" className="w-7 h-7 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA38iZnmfncMnD-whyU2z2ttb7UodIhrj3Hj0N1642C_A_mKPOJESqApSmNRaW_lv27-hZPs5W1PTJP4gND08vL56lAYj09xGEKD-Af3Lnu-asjLcW-5BXwrvUsuio_xaw63-ZyeoSgguuiHYEX0R0byISUpgZ12fXTLRknAYb_RjgpbOa_0DSnqz2AopMKyEyk6qofabPCy3_PcqQ_Y7buDjVwrRKgECblw669uo9vjrWx8gsniq0bZ8jgfzaEvOhpjBiRjcziEec"/>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">Telegram</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Integrate bots, manage group alerts, and sync secure messaging threads with your project management flow.
              </p>
            </div>
            <button className="w-full py-sm px-md rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-[0.98]">
              Connect
            </button>
          </div>
        </div>

        {/* Action Footer Section */}
        <div className="mt-xl flex flex-col items-center gap-md">
          <Link href="/onboarding/success" className="group relative flex items-center justify-center gap-sm bg-primary-container text-on-primary px-xl py-md rounded-full font-label-md text-label-md hover:scale-[1.02] transition-transform shadow-lg overflow-hidden">
            <span className="relative z-10">Finish Setup</span>
            <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link href="/onboarding/success" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors cursor-pointer">
            Skip for now
          </Link>
        </div>
      </main>

      {/* Branding Footer */}
      <footer className="w-full py-md border-t border-outline-variant bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto gap-sm">
          <div className="font-label-md text-label-md font-semibold text-on-surface">Arcfuse</div>
          <div className="flex gap-md">
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="font-body-sm text-body-sm text-secondary hover:text-primary cursor-pointer transition-colors">Help Center</span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary">© 2024 Arcfuse Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
