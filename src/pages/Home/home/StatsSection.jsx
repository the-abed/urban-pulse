const StatsSection = () => {
  return (
    <section className="py-16 bg-primary text-primary-content">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-black mb-2">12,450+</div>
            <div className="text-lg opacity-80 uppercase tracking-widest font-bold">Issues Resolved</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">45 mins</div>
            <div className="text-lg opacity-80 uppercase tracking-widest font-bold">Avg. Response Time</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">98%</div>
            <div className="text-lg opacity-80 uppercase tracking-widest font-bold">Citizen Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;