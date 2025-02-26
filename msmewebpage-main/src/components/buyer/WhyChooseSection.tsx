const WhyChooseSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose RepoMarket?</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">High-Quality Repositories</h3>
              <p className="text-gray-600">Curated selection of premium code repositories to ensure you get the best quality for your projects.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">Exclusive Deals</h3>
              <p className="text-gray-600">Access to exclusive deals and discounts on top repositories, available only to our members.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-600">Safe and secure platform for buying and selling code repositories with confidence.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
