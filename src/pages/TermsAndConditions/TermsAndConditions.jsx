import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-base-200 overflow-hidden">
          {/* Header */}
          <div className="bg-secondary p-10 text-secondary-content">
            <h1 className="text-3xl font-bold">Terms & Conditions</h1>
            <p className="opacity-80 mt-2">Last Updated: December 22, 2025</p>
          </div>

          {/* Body */}
          <div className="p-10 prose prose-indigo max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4 italic">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Public Infrastructure Issue Reporting System, you agree to 
                comply with and be bound by these terms. If you do not agree, please refrain from 
                using the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4 italic">2. Reporting Guidelines</h2>
              <p>
                Users are responsible for the accuracy of their reports. Submission of false information, 
                harassing content, or duplicate reports intentionally is strictly prohibited and 
                may lead to account suspension.
              </p>
            </section>

            <section className="mb-8 p-6 bg-primary/5 rounded-2xl border-l-4 border-primary">
              <h2 className="text-xl font-bold text-primary mb-4 italic">3. Premium Services & Payments</h2>
              <p>
                Payments made for "Issue Boosting" are processed securely via Stripe. 
                Boosting an issue guarantees higher visibility to staff but does not 
                guarantee an immediate resolution if technical constraints exist.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4 italic">4. Data Privacy</h2>
              <p>
                We collect location data and photos solely for the purpose of resolving infrastructure 
                issues. Your personal information is protected under our Privacy Policy and will not 
                be sold to third parties.
              </p>
            </section>

            <div className="divider"></div>

            <p className="text-sm text-gray-400 text-center">
              Questions about our Terms? Contact us at legal@cityreport-urp.gov
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;