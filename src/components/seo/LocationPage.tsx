import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, CheckCircle, ArrowRight, Car, Home, Wrench, Package } from 'lucide-react';

interface LocationPageProps {
  city: string;
  state: string;
  zipCodes: string[];
  nearbyAreas: string[];
}

const LocationPage: React.FC<LocationPageProps> = ({ city, state, zipCodes, nearbyAreas }) => {
  const fullLocation = `${city}, ${state}`;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-lg font-semibold text-gray-600">Serving {fullLocation}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Professional Remote Inspections in {city}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get trusted inspection services for vehicles, equipment, real estate, and marketplace purchases in {fullLocation}. 
            Our verified local agents provide detailed reports within 24-48 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/clientregister" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Request Inspection <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/account-type" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Areas We Serve in {state}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{city} Service Areas</h3>
              <div className="grid grid-cols-2 gap-2">
                {zipCodes.map((zip, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">{zip}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Nearby Areas</h3>
              <div className="grid grid-cols-1 gap-2">
                {nearbyAreas.map((area, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                    <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Inspection Services in {city}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              icon={<Car className="w-8 h-8" />}
              title="Vehicle Inspections"
              description={`Professional car, truck, and motorcycle inspections throughout ${city}`}
              color="blue"
            />
            <ServiceCard 
              icon={<Home className="w-8 h-8" />}
              title="Real Estate"
              description={`Property and home inspections for buyers and sellers in ${fullLocation}`}
              color="green"
            />
            <ServiceCard 
              icon={<Wrench className="w-8 h-8" />}
              title="Equipment"
              description={`Heavy machinery and equipment inspections for ${city} businesses`}
              color="orange"
            />
            <ServiceCard 
              icon={<Package className="w-8 h-8" />}
              title="Marketplace Items"
              description={`Verify online purchases from eBay, Facebook Marketplace in ${city}`}
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Local Benefits */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EyesOnGround in {city}?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Agents</h3>
              <p className="text-gray-600">
                Verified inspection agents located throughout {fullLocation} for faster service
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Reviews</h3>
              <p className="text-gray-600">
                Rated 4.9/5 stars by customers throughout {state} for quality and reliability
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Turnaround</h3>
              <p className="text-gray-600">
                Most inspections in {city} completed within 24-48 hours with detailed reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Your Inspection in {city}?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust EyesOnGround for professional inspections in {fullLocation}
          </p>
          <Link 
            to="/clientregister" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Start Your Inspection <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default LocationPage;
