import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Car, Home, Wrench, Package, ArrowRight } from 'lucide-react';

export const InternalLinksFooter = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/vehicle-inspection" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Car className="w-4 h-4 mr-2" />
                  Vehicle Inspections
                </Link>
              </li>
              <li>
                <Link to="/services/real-estate-inspection" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Home className="w-4 h-4 mr-2" />
                  Real Estate Inspections
                </Link>
              </li>
              <li>
                <Link to="/services/equipment-inspection" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Wrench className="w-4 h-4 mr-2" />
                  Equipment Inspections
                </Link>
              </li>
              <li>
                <Link to="/services/marketplace-inspection" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Package className="w-4 h-4 mr-2" />
                  Marketplace Inspections
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/locations/new-york-city" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  New York City
                </Link>
              </li>
              <li>
                <Link to="/locations/los-angeles" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  Los Angeles
                </Link>
              </li>
              <li>
                <Link to="/locations/chicago" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  Chicago
                </Link>
              </li>
              <li>
                <Link to="/locations" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  View All Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Get Started</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/clientregister" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Request Inspection
                </Link>
              </li>
              <li>
                <Link to="/psiregister" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Become an Agent
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/account-type" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Learn More
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Related Services Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center">
            Popular Inspection Types
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services/pre-purchase-inspection" className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm">
              Pre-Purchase Inspections
            </Link>
            <Link to="/services/used-car-inspection" className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm">
              Used Car Inspections
            </Link>
            <Link to="/services/motorcycle-inspection" className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm">
              Motorcycle Inspections
            </Link>
            <Link to="/services/rv-inspection" className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm">
              RV Inspections
            </Link>
            <Link to="/services/boat-inspection" className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm">
              Boat Inspections
            </Link>
            <Link to="/services/heavy-equipment-inspection" className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm">
              Heavy Equipment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const BreadcrumbNavigation = ({ items }: { items: Array<{ label: string; path?: string }> }) => {
  return (
    <nav className="bg-gray-50 py-3 px-6">
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
              {item.path ? (
                <Link to={item.path} className="text-blue-600 hover:text-blue-700">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-600">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
