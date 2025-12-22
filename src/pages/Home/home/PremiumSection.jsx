const PremiumSection = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="badge badge-secondary mb-4 p-4 font-bold">PREMIUM CITIZEN</span>
          <h2 className="text-4xl font-bold mb-6 italic">Get Faster Attention for <span className="text-primary">Critical Issues</span></h2>
          <p className="text-gray-600 text-lg mb-8">
            Upgrade your account to Premium to unlock Priority Support. Premium reports 
            bypass the standard queue and are assigned to staff immediately. 
            Help us maintain your neighborhood faster.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 font-medium">
              <span className="text-success text-xl">✔</span> 24/7 Priority Support Queue
            </li>
            <li className="flex items-center gap-3 font-medium">
              <span className="text-success text-xl">✔</span> Real-time SMS & Email Notifications
            </li>
            <li className="flex items-center gap-3 font-medium">
              <span className="text-success text-xl">✔</span> Direct Communication with Staff
            </li>
          </ul>
          <button className="btn btn-primary btn-lg shadow-xl">Upgrade To Premium</button>
        </div>
        <div className="flex-1 relative">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-secondary">
             <div className="flex items-center gap-4 mb-6">
               <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-12">
                    <span>JD</span>
                  </div>
               </div>
               <div>
                 <h4 className="font-bold italic">Latest Premium Activity</h4>
                 <p className="text-xs opacity-50">2 minutes ago</p>
               </div>
             </div>
             <div className="p-4 bg-base-200 rounded-xl border-l-4 border-primary">
                "Broken Water Main on 5th Ave - Resolved in 3 hours"
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;