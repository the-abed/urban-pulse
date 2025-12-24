import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'data-collection', title: 'Data Collection' },
    { id: 'usage', title: 'How We Use Data' },
    { id: 'security', title: 'Security Measures' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'rights', title: 'Your Rights' },
  ];

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-primary py-16 text-primary-content text-center px-4">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
        <p className="max-w-2xl mx-auto opacity-90 text-lg">
          Your trust is our priority. Learn how UrbanPulse protects and manages your data.
        </p>
        <p className="mt-6 text-sm opacity-70 italic">Last updated: December 24, 2025</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 flex flex-col md:flex-row gap-12">
        
        {/* Quick Links Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 p-6 bg-base-200 rounded-2xl border border-base-300">
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-50">Contents</h3>
            <ul className="space-y-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`} 
                    className="text-sm hover:text-primary transition-colors font-medium block"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 prose prose-slate lg:prose-lg max-w-none">
          
          <section id="data-collection" className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-lg text-primary text-base">01</span>
              Information We Collect
            </h2>
            <p>
              UrbanPulse collects information to provide better services to all our citizens. 
              This includes your name, email address, and geographical location when you 
              report an urban issue.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account Info:</strong> Profile picture, name, and email via Firebase.</li>
              <li><strong>Issue Data:</strong> Photos, descriptions, and locations of reported issues.</li>
              <li><strong>Payment Info:</strong> Transaction IDs processed securely via Stripe.</li>
            </ul>
          </section>

          <section id="usage" className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-lg text-primary text-base">02</span>
              How We Use Information
            </h2>
            <p>
              We use the data collected to track the progress of city repairs, verify report 
              authenticity, and improve urban infrastructure response times. 
            </p>
            <div className="bg-info/5 border-l-4 border-info p-4 rounded-r-xl">
              <p className="text-sm italic m-0">
                <strong>Note:</strong> We never sell your personal data to third-party 
                advertisers or marketing agencies.
              </p>
            </div>
          </section>

          <section id="security" className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-lg text-primary text-base">03</span>
              Security and Storage
            </h2>
            <p>
              We implement a variety of security measures to maintain the safety of your 
              personal information. We use industry-standard encryption and secure database 
              protocols via MongoDB and Firebase.
            </p>
          </section>

          <section id="cookies" className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-lg text-primary text-base">04</span>
              Cookies Policy
            </h2>
            <p>
              We use cookies to understand and save your preferences for future visits. 
              This helps us keep you logged in and remember your dashboard settings.
            </p>
          </section>

          <section id="rights" className="mb-12 border-t border-base-300 pt-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Your Legal Rights</h2>
            <p>
              You have the right to request access to your data, request corrections, 
              or ask for the deletion of your account. Please contact our support 
              team at <span className="text-primary font-bold">privacy@urbanpulse.com</span>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;