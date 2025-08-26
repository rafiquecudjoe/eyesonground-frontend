import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ArrowLeft, Upload, MapPin, Calendar, DollarSign, FileText, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TokenStorage } from "@/lib/api/token-storage";
import { inspectionRequestService, CreateInspectionRequestPayload } from "@/lib/api/inspection-requests";
import { ServiceTierSelector } from "./ServiceTierSelector";
import { InspectionDetailsForm } from "./InspectionDetailsForm";
import { FormProgress } from "./FormProgress";
import { RequestTips } from "./RequestTips";
import { ServiceTier, AdditionalService } from "@/lib/pricing/service-tiers";
import RequestReview from "./RequestReview";
import { FileUpload } from "@/components/ui/FileUpload";
import { StripePayment } from "@/components/ui/StripePayment";
import { fileUploadService } from "@/services/fileUploadService";
import { paymentService } from "@/services/paymentService";
import { geocodingService } from "@/services/geocodingService";
import { pricingService } from "@/services/pricingService";

// States data with abbreviations and full names
const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "Washington D.C." }
];

// City data for each state
const STATE_CITIES: Record<string, string[]> = {
  "AL": ["Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa", "Hoover", "Dothan", "Auburn", "Decatur", "Madison"],
  "AK": ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan", "Wasilla", "Kenai", "Kodiak", "Bethel", "Palmer"],
  "AZ": ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale", "Gilbert", "Tempe", "Peoria", "Surprise"],
  "AR": ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro", "North Little Rock", "Conway", "Rogers", "Pine Bluff", "Bentonville"],
  "CA": ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento", "Long Beach", "Oakland", "Bakersfield", "Anaheim", "Santa Ana", "Riverside", "Stockton", "Irvine", "Chula Vista", "Fremont", "San Bernardino", "Modesto", "Fontana", "Oxnard"],
  "CO": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Thornton", "Arvada", "Westminster", "Pueblo", "Centennial"],
  "CT": ["Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury", "Norwalk", "Danbury", "New Britain", "West Hartford", "Greenwich"],
  "DE": ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna", "Milford", "Seaford", "Georgetown", "Elsmere", "New Castle"],
  "FL": ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale", "Port St. Lucie", "Cape Coral", "Pembroke Pines", "Hollywood", "Miramar", "Gainesville", "Coral Springs"],
  "GA": ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah", "Athens", "Sandy Springs", "Roswell", "Johns Creek", "Albany"],
  "HI": ["Honolulu", "Pearl City", "Hilo", "Kailua", "Waipahu", "Kaneohe", "Mililani", "Kahului", "Ewa Gentry", "Mililani Town"],
  "ID": ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello", "Caldwell", "Coeur d'Alene", "Twin Falls", "Lewiston", "Post Falls"],
  "IL": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield", "Peoria", "Elgin", "Waukegan", "Cicero"],
  "IN": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Fishers", "Bloomington", "Hammond", "Gary", "Muncie"],
  "IA": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Waterloo", "Council Bluffs", "Ames", "West Des Moines", "Dubuque"],
  "KS": ["Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe", "Lawrence", "Shawnee", "Manhattan", "Lenexa", "Salina"],
  "KY": ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington", "Richmond", "Georgetown", "Florence", "Hopkinsville", "Nicholasville"],
  "LA": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles", "Kenner", "Bossier City", "Monroe", "Alexandria", "Houma"],
  "ME": ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn", "Biddeford", "Sanford", "Saco", "Westbrook", "Augusta"],
  "MD": ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie", "Hagerstown", "Annapolis", "College Park", "Salisbury", "Laurel"],
  "MA": ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River"],
  "MI": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing", "Ann Arbor", "Flint", "Dearborn", "Livonia", "Westland"],
  "MN": ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington", "Brooklyn Park", "Plymouth", "St. Cloud", "Eagan", "Woodbury"],
  "MS": ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi", "Meridian", "Tupelo", "Greenville", "Olive Branch", "Horn Lake"],
  "MO": ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence", "Lee's Summit", "O'Fallon", "St. Joseph", "St. Charles", "St. Peters"],
  "MT": ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte", "Helena", "Kalispell", "Havre", "Anaconda", "Miles City"],
  "NE": ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney", "Fremont", "Hastings", "North Platte", "Norfolk", "Columbus"],
  "NV": ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks", "Carson City", "Fernley", "Elko", "Mesquite", "Boulder City"],
  "NH": ["Manchester", "Nashua", "Concord", "Derry", "Rochester", "Salem", "Dover", "Merrimack", "Londonderry", "Hudson"],
  "NJ": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Woodbridge", "Lakewood", "Toms River", "Hamilton", "Trenton"],
  "NM": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell", "Farmington", "Clovis", "Hobbs", "Alamogordo", "Carlsbad"],
  "NY": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica"],
  "NC": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington", "High Point", "Concord"],
  "ND": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo", "Williston", "Dickinson", "Mandan", "Jamestown", "Wahpeton"],
  "OH": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton", "Youngstown", "Lorain"],
  "OK": ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton", "Edmond", "Moore", "Midwest City", "Enid", "Stillwater"],
  "OR": ["Portland", "Eugene", "Salem", "Gresham", "Hillsboro", "Bend", "Beaverton", "Medford", "Springfield", "Corvallis"],
  "PA": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster", "Harrisburg", "Altoona"],
  "RI": ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence", "Woonsocket", "Newport", "Central Falls", "Westerly", "North Providence"],
  "SC": ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Rock Hill", "Greenville", "Summerville", "Sumter", "Goose Creek", "Hilton Head Island"],
  "SD": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown", "Mitchell", "Yankton", "Pierre", "Huron", "Vermillion"],
  "TN": ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro", "Franklin", "Johnson City", "Bartlett", "Hendersonville"],
  "TX": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock", "Laredo", "Irving", "Garland", "Frisco", "McKinney", "Amarillo", "Grand Prairie", "Brownsville", "Pasadena", "Mesquite"],
  "UT": ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy", "Ogden", "St. George", "Layton", "Taylorsville"],
  "VT": ["Burlington", "Essex", "South Burlington", "Colchester", "Rutland", "Bennington", "Brattleboro", "Milton", "Hartford", "Barre"],
  "VA": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News", "Alexandria", "Hampton", "Portsmouth", "Suffolk", "Roanoke"],
  "WA": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett", "Renton", "Yakima", "Federal Way"],
  "WV": ["Charleston", "Huntington", "Parkersburg", "Morgantown", "Wheeling", "Martinsburg", "Fairmont", "Beckley", "Clarksburg", "Lewisburg"],
  "WI": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Waukesha", "Eau Claire", "Oshkosh", "Janesville"],
  "WY": ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs", "Sheridan", "Green River", "Evanston", "Riverton", "Jackson"],
  "DC": ["Washington"]
};

// Function to get cities for a state
const getCitiesForState = (state: string): string[] => {
  return STATE_CITIES[state] || [];
};

// Function to get address suggestions (mock implementation)
const getAddressSuggestions = (input: string): string[] => {
  if (!input || input.length < 3) return [];
  
  // Mock address suggestions - in a real app, this would call a geocoding API
  const suggestions = [
    `${input} Street, City, State`,
    `${input} Avenue, City, State`,
    `${input} Boulevard, City, State`,
    `${input} Drive, City, State`,
    `${input} Lane, City, State`
  ];
  
  return suggestions.slice(0, 5);
};

// Searchable Select Component
const SearchableSelect = ({ 
  value, 
  onValueChange, 
  options, 
  placeholder, 
  searchPlaceholder = "Search...",
  className = "" 
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: { code: string; name: string }[];
  placeholder: string;
  searchPlaceholder?: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.code === value);

  const handleSelect = (optionCode: string) => {
    onValueChange(optionCode);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 px-3 py-2 text-left bg-white/50 border border-[rgba(42,100,186,0.2)] rounded-xl flex items-center justify-between hover:border-[rgba(42,100,186,0.4)] focus:border-[rgba(42,100,186,1)] focus:outline-none ${className}`}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? `${selectedOption.name} (${selectedOption.code})` : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[rgba(42,100,186,0.2)] rounded-xl shadow-lg max-h-60 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:border-[rgba(42,100,186,1)] focus:outline-none"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => handleSelect(option.code)}
                  className="w-full px-3 py-2 text-left hover:bg-[rgba(42,100,186,0.05)] focus:bg-[rgba(42,100,186,0.1)] focus:outline-none transition-colors"
                >
                  {option.name} ({option.code})
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No states found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const CreateRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    customSubCategory: "",
    state: "",
    city: "",
    address: "",
    urgency: "",
    phoneNumber: "",
    specificAreas: "",
    knownIssues: "",
    accessInstructions: "",
  accessAttachments: [] as File[],
    contactPerson: "",
    contactPhone: "",
    preferredContact: "",
    availabilityWindow: "",
    specialRequirements: "",
    safetyConsiderations: "",
    recordingConsent: false,
  });
  const [selectedServiceTier, setSelectedServiceTier] = useState<ServiceTier>('basic');
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<AdditionalService[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [posting, setPosting] = useState(false);
  // Payment state
  const [showPayment, setShowPayment] = useState(false);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  // Address autocomplete state
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const addressRef = useRef<HTMLDivElement | null>(null);

  // Calculate estimated price
  const estimatedPrice = useMemo(() => {
    let basePrice = 0;
    
    switch (selectedServiceTier) {
      case 'basic':
        basePrice = 50;
        break;
      case 'standard':
        basePrice = 150;
        break;
      case 'premium':
        basePrice = 250;
        break;
      default:
        basePrice = 50;
    }
    
    const additionalPrice = selectedAdditionalServices?.reduce((total, service) => {
      return total + (service.price || 0);
    }, 0) || 0;
    
    return basePrice + additionalPrice;
  }, [selectedServiceTier, selectedAdditionalServices]);

  // Debounced geocoding search for address suggestions using backend service
  useEffect(() => {
    const query = formData.address;
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      setAddressLoading(false);
      return;
    }

    setAddressLoading(true);
    const controller = new AbortController();
    const handle = setTimeout(async () => {
      try {
        // Use our backend geocoding service instead of direct Nominatim calls
        const result = await geocodingService.geocodeAddress(query);
        
        if (result.success && result.results) {
          const suggestions = result.results
            .map((item: any) => item.display_name)
            .slice(0, 6);
          setAddressSuggestions(suggestions);
        } else {
          setAddressSuggestions([]);
        }
        setAddressLoading(false);
      } catch (err) {
        if ((err as any).name === 'AbortError') return;
        console.error('Geocoding error:', err);
        setAddressSuggestions([]);
        setAddressLoading(false);
      }
    }, 500); // debounce

    return () => {
      clearTimeout(handle);
      controller.abort();
    };
  }, [formData.address]);

  // Close address dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (addressOpen && addressRef.current && !addressRef.current.contains(e.target as Node)) {
        setAddressOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAddressOpen(false);
    };

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [addressOpen]);
  
  const handleInputChange = (field: string, value: string) => {
    if (field === "category") {
      // Handle category change with all related resets in one state update
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        subCategory: "", 
        customSubCategory: "" 
      }));
    } else if (field === "state") {
      // Handle state change with city reset in one state update
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        city: "" 
      }));
    } else if (field === "subCategory") {
      // Handle subCategory change with customSubCategory reset in one state update
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        customSubCategory: "" 
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Stable callbacks to prevent unnecessary re-renders
  const handleServiceTierChange = useCallback((tier: ServiceTier) => {
    setSelectedServiceTier(tier);
  }, []);

  const handleAdditionalServicesChange = useCallback((services: AdditionalService[]) => {
    setSelectedAdditionalServices(services);
  }, []);
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotoFiles(Array.from(e.target.files));
    }
  };
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.recordingConsent) {
      toast.error("Please provide consent for recording and documentation");
      return;
    }
    
    if (!formData.accessInstructions && !formData.contactPhone) {
      toast.error("Please provide either access instructions or a contact phone number");
      return;
    }
    // Open review modal instead of immediately posting
    setShowReview(true);
  };

  const handlePost = async () => {
    setPosting(true);
    try {
      // First, upload any files that were attached via FileUpload component
      let finalUploadedFiles = uploadedFiles;
      
      // Also handle any legacy photo/video files if they exist
      const legacyFiles = [...photoFiles];
      if (videoFile) legacyFiles.push(videoFile);
      
      if (legacyFiles.length > 0) {
        try {
          const result = await fileUploadService.uploadMultipleFiles(legacyFiles, 'inspection-requests');
          finalUploadedFiles = [...finalUploadedFiles, ...result.files];
          toast.success(`${result.files.length} additional files uploaded successfully`);
        } catch (error: any) {
          console.error('File upload error:', error);
          toast.error(`File upload failed: ${error.message}`);
          throw error;
        }
      }

      // Validate address using geocoding service
      try {
        const addressValidation = await geocodingService.validateAddress(formData.address);
        if (!addressValidation.isValid) {
          throw new Error('Invalid address provided');
        }
      } catch (error: any) {
        console.error('Address validation error:', error);
        toast.error('Please provide a valid address');
        throw error;
      }

      // Calculate final pricing
      const pricingResult = await pricingService.calculatePricing(
        selectedServiceTier as 'basic' | 'standard' | 'premium',
        selectedAdditionalServices.map(service => service.id)
      );

      // Validate pricing result
      if (!pricingResult || !pricingResult.pricing) {
        throw new Error('Failed to calculate pricing - invalid response');
      }

      const { pricing } = pricingResult;
      if (typeof pricing.totalPrice !== 'number' || pricing.totalPrice < 0) {
        throw new Error('Invalid pricing calculation result');
      }

      // Transform legacy data to inspection request format
      const inspectionPayload: CreateInspectionRequestPayload = inspectionRequestService.transformLegacyRequest({
        ...formData,
        serviceTier: selectedServiceTier,
        additionalServices: selectedAdditionalServices,
        uploadedFiles: finalUploadedFiles,
        totalPrice: pricing.totalPrice,
        basePrice: pricing.basePrice,
        additionalServicesTotal: pricing.additionalServicesTotal,
        paymentIntentId: 'temp_payment_intent_' + Date.now(), // TODO: Get from Stripe
        paymentStatus: 'pending' as const,
      });

      console.log('Posting inspection request with payload:', inspectionPayload);

      // Call backend API to create the inspection request
      const result = await inspectionRequestService.createInspectionRequest(inspectionPayload);
      
      console.log('API Response:', result);
      
      // Handle nested response structure: result.data.data
      const responseData = (result as any).data?.data || result.data;
      
      // Check if request was successful - check status code or presence of data
      if (responseData || (result.status && result.status >= 200 && result.status < 300)) {
        toast.success('Request posted successfully!', { 
          description: 'Your inspection request is now live and agents can start applying' 
        });
        
        setShowReview(false);
        // Navigate to My Requests page to show the user their newly created request
        navigate('/client-dashboard/my-ads', { 
          state: { 
            requestId: responseData?.id,
            justCreated: true 
          }
        });
      } else {
        throw new Error(result.message || 'Failed to create inspection request');
      }
    } catch (err: any) {
      console.error('Request posting error:', err);
      toast.error('Failed to post request', {
        description: err.message || 'Please try again later'
      });
    } finally {
      setPosting(false);
    }
  };

  const handlePay = async () => {
    try {
      // Hide review modal first for better UX (replace instead of overlay)
      setShowReview(false);
      
      // Calculate final pricing
      const pricingResult = await pricingService.calculatePricing(
        selectedServiceTier as 'basic' | 'standard' | 'premium',
        selectedAdditionalServices.map(service => service.id)
      );

      // Validate pricing result
      if (!pricingResult || !pricingResult.pricing) {
        throw new Error('Failed to calculate pricing for payment');
      }

      const totalAmount = pricingResult.pricing.totalPrice;

      // Create payment intent
      const paymentResult = await paymentService.createPaymentIntent(totalAmount, {
        requestType: 'inspection',
        serviceTier: selectedServiceTier,
        additionalServices: selectedAdditionalServices.map(s => s.id).join(','),
      });

      // Show Stripe payment modal/form
      setShowPayment(true);
      setPaymentClientSecret(paymentResult.clientSecret);
      setPaymentIntentId(paymentResult.paymentIntentId);
      
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      // If payment setup fails, show review again
      setShowReview(true);
      toast.error('Failed to initialize payment', {
        description: error.message || 'Please try again'
      });
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      // Confirm payment on backend
      await paymentService.confirmPaymentIntent(paymentIntentId);
      
      // Hide payment modal and review modal
      setShowPayment(false);
      setShowReview(false);
      
      // Post the request after successful payment
      await handlePost();
      
      toast.success('Payment successful!', { 
        description: 'Your request has been posted and payment processed' 
      });

      // Navigate to My Requests page for better UX - user can see their request
      navigate('/client-dashboard/my-ads', { 
        state: { 
          paymentIntentId,
          requestData: formData,
          estimatedPrice: estimatedPrice,
          justCreated: true // Flag to highlight the new request
        }
      });
    } catch (error: any) {
      console.error('Payment confirmation error:', error);
      toast.error('Payment failed to confirm', {
        description: error.message || 'Please contact support'
      });
    }
  };

  const handlePaymentError = (error: string) => {
    setShowPayment(false);
    toast.error('Payment failed', {
      description: error
    });
  };

  const handleFilesUploaded = (files: any[]) => {
    setUploadedFiles(files);
    toast.success(`${files.length} files uploaded successfully`);
  };

  const handleFileUploadError = (error: string) => {
    toast.error('File upload failed', {
      description: error
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl min-h-screen">
      <div className="mb-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[rgba(42,100,186,0.1)] px-4 py-2 rounded-full mb-4">
            <FileText className="h-5 w-5 text-[rgba(42,100,186,1)]" />
            <span className="text-sm font-medium text-[rgba(13,38,75,1)]">New Request</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[rgba(13,38,75,1)] mb-2">
            Post Inspection Request
          </h1>
          <p className="text-[rgba(13,38,75,0.7)]">
            Provide details about what you need inspected
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
        {/* Main Form */}
        <div className="lg:col-span-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Vehicle Inspection - 2019 Honda Civic" 
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger id="category" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="heavy-equipment">Heavy Equipment</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="appliances">Appliances</SelectItem>
                        <SelectItem value="machinery">Machinery</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="antiques">Antiques</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="sporting">Sporting Goods</SelectItem>
                        <SelectItem value="musical">Musical Instruments</SelectItem>
                        <SelectItem value="medical">Medical Equipment</SelectItem>
                        <SelectItem value="marine">Marine</SelectItem>
                        <SelectItem value="aviation">Aviation</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subCategory">Sub Category</Label>
                    {formData.category === "other" ? (
                      <Input
                        id="subCategory"
                        value={formData.customSubCategory || ""}
                        onChange={(e) => handleInputChange("customSubCategory", e.target.value)}
                        className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                        placeholder="Enter custom category"
                      />
                    ) : formData.category ? (
                      <Select 
                        key={formData.category} // Force re-render when category changes
                        value={formData.subCategory} 
                        onValueChange={(value) => handleInputChange("subCategory", value)}
                      >
                        <SelectTrigger id="subCategory" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                          <SelectValue placeholder="Select sub category" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Automotive Subcategories */}
                          {formData.category === "automotive" && (
                            <>
                              <SelectItem value="cars-sedans">Cars - Sedans</SelectItem>
                              <SelectItem value="cars-suvs">Cars - SUVs/Crossovers</SelectItem>
                              <SelectItem value="cars-trucks">Cars - Trucks/Pickups</SelectItem>
                              <SelectItem value="cars-luxury">Cars - Luxury/Sports</SelectItem>
                              <SelectItem value="cars-classic">Cars - Classic/Vintage</SelectItem>
                              <SelectItem value="motorcycles">Motorcycles</SelectItem>
                              <SelectItem value="rvs-motorhomes">RVs/Motorhomes</SelectItem>
                              <SelectItem value="trailers">Trailers</SelectItem>
                              <SelectItem value="commercial-vehicles">Commercial Vehicles</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {/* Heavy Equipment Subcategories */}
                          {formData.category === "heavy-equipment" && (
                            <>
                              <SelectItem value="excavators">Excavators</SelectItem>
                              <SelectItem value="bulldozers">Bulldozers</SelectItem>
                              <SelectItem value="cranes">Cranes</SelectItem>
                              <SelectItem value="loaders">Loaders</SelectItem>
                              <SelectItem value="forklifts">Forklifts</SelectItem>
                              <SelectItem value="generators">Generators</SelectItem>
                              <SelectItem value="compressors">Compressors</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {/* Electronics Subcategories */}
                          {formData.category === "electronics" && (
                            <>
                              <SelectItem value="computers-laptops">Computers/Laptops</SelectItem>
                              <SelectItem value="smartphones-tablets">Smartphones/Tablets</SelectItem>
                              <SelectItem value="gaming-consoles">Gaming Consoles</SelectItem>
                              <SelectItem value="audio-equipment">Audio Equipment</SelectItem>
                              <SelectItem value="cameras-video">Cameras/Video Equipment</SelectItem>
                              <SelectItem value="smart-home">Smart Home Devices</SelectItem>
                              <SelectItem value="televisions">Televisions</SelectItem>
                              <SelectItem value="networking">Networking Equipment</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {/* Appliances Subcategories */}
                          {formData.category === "appliances" && (
                            <>
                              <SelectItem value="kitchen-appliances">Kitchen Appliances</SelectItem>
                              <SelectItem value="laundry-appliances">Laundry Appliances</SelectItem>
                              <SelectItem value="hvac-systems">HVAC Systems</SelectItem>
                              <SelectItem value="water-heaters">Water Heaters</SelectItem>
                              <SelectItem value="small-appliances">Small Appliances</SelectItem>
                              <SelectItem value="outdoor-appliances">Outdoor Appliances</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {/* Machinery Subcategories */}
                          {formData.category === "machinery" && (
                            <>
                              <SelectItem value="manufacturing-equipment">Manufacturing Equipment</SelectItem>
                              <SelectItem value="printing-equipment">Printing Equipment</SelectItem>
                              <SelectItem value="packaging-equipment">Packaging Equipment</SelectItem>
                              <SelectItem value="textile-machinery">Textile Machinery</SelectItem>
                              <SelectItem value="food-processing">Food Processing Equipment</SelectItem>
                              <SelectItem value="woodworking-machinery">Woodworking Machinery</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {/* Construction Subcategories */}
                          {formData.category === "construction" && (
                            <>
                              <SelectItem value="excavators">Excavators</SelectItem>
                              <SelectItem value="bulldozers">Bulldozers</SelectItem>
                              <SelectItem value="cranes">Cranes</SelectItem>
                              <SelectItem value="concrete-equipment">Concrete Equipment</SelectItem>
                              <SelectItem value="generators">Generators</SelectItem>
                              <SelectItem value="hand-tools">Hand Tools</SelectItem>
                              <SelectItem value="power-tools">Power Tools</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {/* Antiques Subcategories */}
                          {formData.category === "antiques" && (
                            <>
                              <SelectItem value="vintage-furniture">Vintage Furniture</SelectItem>
                              <SelectItem value="vintage-jewelry">Vintage Jewelry</SelectItem>
                              <SelectItem value="collectible-coins">Collectible Coins</SelectItem>
                              <SelectItem value="vintage-art">Vintage Art</SelectItem>
                              <SelectItem value="vintage-books">Vintage Books</SelectItem>
                              <SelectItem value="vintage-toys">Vintage Toys</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "jewelry" && (
                            <>
                              <SelectItem value="diamond-jewelry">Diamond Jewelry</SelectItem>
                              <SelectItem value="gold-jewelry">Gold Jewelry</SelectItem>
                              <SelectItem value="silver-jewelry">Silver Jewelry</SelectItem>
                              <SelectItem value="luxury-watches">Luxury Watches</SelectItem>
                              <SelectItem value="gemstone-jewelry">Gemstone Jewelry</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "art" && (
                            <>
                              <SelectItem value="paintings">Paintings</SelectItem>
                              <SelectItem value="sculptures">Sculptures</SelectItem>
                              <SelectItem value="photography">Photography</SelectItem>
                              <SelectItem value="mixed-media">Mixed Media</SelectItem>
                              <SelectItem value="prints-posters">Prints/Posters</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "furniture" && (
                            <>
                              <SelectItem value="bedroom-furniture">Bedroom Furniture</SelectItem>
                              <SelectItem value="living-room">Living Room Furniture</SelectItem>
                              <SelectItem value="dining-furniture">Dining Furniture</SelectItem>
                              <SelectItem value="office-furniture">Office Furniture</SelectItem>
                              <SelectItem value="outdoor-furniture">Outdoor Furniture</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "sporting" && (
                            <>
                              <SelectItem value="fitness-equipment">Fitness Equipment</SelectItem>
                              <SelectItem value="outdoor-gear">Outdoor Gear</SelectItem>
                              <SelectItem value="team-sports">Team Sports Equipment</SelectItem>
                              <SelectItem value="water-sports">Water Sports Equipment</SelectItem>
                              <SelectItem value="winter-sports">Winter Sports Equipment</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "musical" && (
                            <>
                              <SelectItem value="guitars">Guitars</SelectItem>
                              <SelectItem value="pianos-keyboards">Pianos/Keyboards</SelectItem>
                              <SelectItem value="drums-percussion">Drums/Percussion</SelectItem>
                              <SelectItem value="wind-instruments">Wind Instruments</SelectItem>
                              <SelectItem value="string-instruments">String Instruments</SelectItem>
                              <SelectItem value="audio-recording">Audio/Recording Equipment</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "medical" && (
                            <>
                              <SelectItem value="diagnostic-equipment">Diagnostic Equipment</SelectItem>
                              <SelectItem value="surgical-instruments">Surgical Instruments</SelectItem>
                              <SelectItem value="dental-equipment">Dental Equipment</SelectItem>
                              <SelectItem value="rehabilitation">Rehabilitation Equipment</SelectItem>
                              <SelectItem value="laboratory-equipment">Laboratory Equipment</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "marine" && (
                            <>
                              <SelectItem value="sailboats">Sailboats</SelectItem>
                              <SelectItem value="motorboats">Motorboats</SelectItem>
                              <SelectItem value="yachts">Yachts</SelectItem>
                              <SelectItem value="jet-skis">Jet Skis</SelectItem>
                              <SelectItem value="fishing-boats">Fishing Boats</SelectItem>
                              <SelectItem value="marine-engines">Marine Engines</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "aviation" && (
                            <>
                              <SelectItem value="single-engine">Single Engine Aircraft</SelectItem>
                              <SelectItem value="multi-engine">Multi Engine Aircraft</SelectItem>
                              <SelectItem value="helicopters">Helicopters</SelectItem>
                              <SelectItem value="gliders">Gliders</SelectItem>
                              <SelectItem value="aircraft-parts">Aircraft Parts</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "agricultural" && (
                            <>
                              <SelectItem value="tractors">Tractors</SelectItem>
                              <SelectItem value="harvesters">Harvesters</SelectItem>
                              <SelectItem value="irrigation-systems">Irrigation Systems</SelectItem>
                              <SelectItem value="livestock-equipment">Livestock Equipment</SelectItem>
                              <SelectItem value="farming-tools">Farming Tools</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "commercial" && (
                            <>
                              <SelectItem value="restaurant-equipment">Restaurant Equipment</SelectItem>
                              <SelectItem value="office-equipment">Office Equipment</SelectItem>
                              <SelectItem value="retail-fixtures">Retail Fixtures</SelectItem>
                              <SelectItem value="warehouse-equipment">Warehouse Equipment</SelectItem>
                              <SelectItem value="hotel-equipment">Hotel Equipment</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "industrial" && (
                            <>
                              <SelectItem value="manufacturing-equipment">Manufacturing Equipment</SelectItem>
                              <SelectItem value="conveyor-systems">Conveyor Systems</SelectItem>
                              <SelectItem value="packaging-equipment">Packaging Equipment</SelectItem>
                              <SelectItem value="quality-control">Quality Control Equipment</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                          
                          {formData.category === "retail" && (
                            <>
                              <SelectItem value="store-fixtures">Store Fixtures</SelectItem>
                              <SelectItem value="point-of-sale">Point of Sale Systems</SelectItem>
                              <SelectItem value="inventory-equipment">Inventory Equipment</SelectItem>
                              <SelectItem value="display-equipment">Display Equipment</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    ) : null}
                    
                    {/* Custom input for "Others" selection */}
                    {formData.subCategory === "others" && (
                      <Input
                        value={formData.customSubCategory || ""}
                        onChange={(e) => handleInputChange("customSubCategory", e.target.value)}
                        className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50 mt-2"
                        placeholder="Please specify the sub category"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Service Pricing */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Item Location & Service Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <SearchableSelect
                      value={formData.state}
                      onValueChange={(value) => handleInputChange("state", value)}
                      options={US_STATES}
                      placeholder="Select state"
                      searchPlaceholder="Search states..."
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    {formData.state ? (
                      <SearchableSelect
                        value={formData.city}
                        onValueChange={(value) => handleInputChange("city", value)}
                        options={getCitiesForState(formData.state).map((name) => ({ code: name, name }))}
                        placeholder="Select city"
                        searchPlaceholder="Search cities..."
                        className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                      />
                    ) : (
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                        placeholder="Select state first"
                        disabled
                        required
                      />
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div ref={addressRef} className="space-y-2 relative">
                    <Label htmlFor="address">Specific Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter the inspection address"
                      value={formData.address}
                      onChange={(e) => {
                        handleInputChange("address", e.target.value);
                        setAddressOpen(true);
                      }}
                      onFocus={() => formData.address.length >= 3 && setAddressOpen(true)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                      required
                      autoComplete="off"
                    />

                    {/* Suggestions dropdown */}
                    {addressOpen && (
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-[rgba(42,100,186,0.1)] rounded-xl shadow-lg max-h-60 overflow-auto">
                        <div className="p-2">
                          {addressLoading ? (
                            <div className="text-sm text-gray-500">Searching...</div>
                          ) : addressSuggestions.length > 0 ? (
                            addressSuggestions.map((sugg, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  handleInputChange("address", sugg);
                                  setAddressOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-[rgba(42,100,186,0.05)] rounded-md"
                              >
                                {sugg}
                              </button>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 px-3 py-2">No suggestions</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Service Tier Selection */}
                <ServiceTierSelector
                  selectedTier={selectedServiceTier}
                  onTierChange={handleServiceTierChange}
                  selectedAdditionalServices={selectedAdditionalServices}
                  onAdditionalServicesChange={handleAdditionalServicesChange}
                  className="mt-6"
                />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                    <SelectTrigger id="urgency" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within 2 weeks</SelectItem>
                      <SelectItem value="medium">Medium - Within 1 week</SelectItem>
                      <SelectItem value="high">High - Within 3 days</SelectItem>
                      <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Inspection Details */}
            <InspectionDetailsForm
              formData={formData}
              onChange={handleInputChange}
            />

            {/* Contact Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    placeholder="Your contact number" 
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
                  <Upload className="h-5 w-5 text-[rgba(42,100,186,1)]" />
                  Attachments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-[rgba(13,38,75,0.7)]">
                    Upload photos, videos, or documents that will help agents understand your inspection needs
                  </p>
                  <FileUpload
                    onFilesUploaded={handleFilesUploaded}
                    onError={handleFileUploadError}
                    multiple={true}
                    folder="inspection-requests"
                    maxFiles={10}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <Button 
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Post Inspection Request
              </Button>
              
              <Button 
                type="button"
                onClick={() => navigate("/client-dashboard/post-board")}
                variant="outline" 
                className="flex-1 h-12 border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)] rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
        
        {/* Progress Sidebar */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <div className="sticky top-4 z-10 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto space-y-3">
            <div className="space-y-3">
              <FormProgress
                formData={formData}
                selectedServiceTier={selectedServiceTier}
                photoFiles={photoFiles}
              />
              <div className="hidden lg:block">
                <RequestTips />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showReview && (
        <RequestReview
          formData={formData}
          selectedTier={selectedServiceTier}
          selectedAdditionalServices={selectedAdditionalServices}
          onClose={() => setShowReview(false)}
          onPay={handlePay}
          onPost={handlePost}
        />
      )}
      
      {/* Payment Modal */}
      {showPayment && paymentClientSecret && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[rgba(13,38,75,1)]">
                Complete Payment
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPayment(false)}
                className="h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>
            
            {/* Calculate amount for display */}
            {(() => {
              const pricingCalculation = async () => {
                try {
                  const result = await pricingService.calculatePricing(
                    selectedServiceTier as 'basic' | 'standard' | 'premium',
                    selectedAdditionalServices.map(service => service.id)
                  );
                  return result?.pricing?.totalPrice || 0;
                } catch (error) {
                  console.error('Failed to calculate pricing for payment display:', error);
                  return 0;
                }
              };
              
              return (
                <StripePayment
                  amount={100} // Placeholder - in real implementation, calculate this synchronously
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  metadata={{
                    requestType: 'inspection',
                    serviceTier: selectedServiceTier,
                    additionalServices: selectedAdditionalServices.map(s => s.id).join(','),
                  }}
                />
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};