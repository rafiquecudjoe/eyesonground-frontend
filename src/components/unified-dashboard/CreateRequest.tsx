import { useState, useEffect, useRef } from "react";
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
import { ServiceTierSelector } from "./ServiceTierSelector";
import { InspectionDetailsForm } from "./InspectionDetailsForm";
import { FormProgress } from "./FormProgress";
import { RequestTips } from "./RequestTips";
import { ServiceTier, AdditionalService, calculateTotalPrice, SERVICE_TIERS } from "@/lib/pricing/service-tiers";
import RequestReview from "./RequestReview";
import { inspectionRequestService, CreateInspectionRequestPayload } from "@/lib/api/inspection-requests";

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
    preferredDate: "",
    description: "",
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
    certificationRequirements: []
  });
  const [selectedServiceTier, setSelectedServiceTier] = useState<ServiceTier>('basic');
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<AdditionalService[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [posting, setPosting] = useState(false);
  // Address autocomplete state
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const addressRef = useRef<HTMLDivElement | null>(null);

  // Debounced Nominatim search for address suggestions
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
        // Nominatim search API (OpenStreetMap). Limit to 6 results and restrict to US for relevance.
        const url = new URL('https://nominatim.openstreetmap.org/search');
        url.searchParams.set('q', query);
        url.searchParams.set('format', 'json');
        url.searchParams.set('addressdetails', '0');
        url.searchParams.set('limit', '6');
        url.searchParams.set('countrycodes', 'us');

        const res = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            'Accept-Language': 'en',
            // Nominatim requires a valid User-Agent or Referer identifying the application
            'User-Agent': 'eyesonground-frontend/1.0 (youremail@example.com)'
          }
        });

        if (!res.ok) {
          setAddressSuggestions([]);
          setAddressLoading(false);
          return;
        }

        const data = await res.json();
        const suggestions = (data || []).map((item: any) => item.display_name).slice(0, 6);
        setAddressSuggestions(suggestions);
        setAddressLoading(false);
      } catch (err) {
        if ((err as any).name === 'AbortError') return;
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
  setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset subcategory when category changes
    if (field === "category") {
      setFormData(prev => ({ ...prev, subCategory: "", customSubCategory: "" }));
    }
  };
  
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
      // Calculate pricing
      const baseTier = SERVICE_TIERS.find(t => t.id === selectedServiceTier);
      const basePrice = baseTier?.price || 50;
      const additionalServicesTotal = selectedAdditionalServices
        .filter(service => service.included)
        .reduce((sum, service) => {
          if (service.id === 'travel_surcharge') {
            const miles = service.units || 0;
            return sum + (service.price * miles);
          }
          return sum + service.price;
        }, 0);
      const totalPrice = basePrice + additionalServicesTotal;

      // Transform form data to match API payload structure
      const payload: CreateInspectionRequestPayload = {
        title: formData.title || '',
        category: (formData.category as CreateInspectionRequestPayload['category']) || 'residential',
        subCategory: formData.subCategory || '',
        customSubCategory: formData.customSubCategory || '',
        state: formData.state || '',
        city: formData.city || '',
        address: formData.address || '',
        urgency: formData.urgency || new Date().toISOString(),
        phoneNumber: formData.phoneNumber || '',
        basePrice: basePrice,
        additionalServicesTotal: additionalServicesTotal,
        totalPrice: totalPrice,
        specificAreas: formData.specificAreas || '',
        knownIssues: formData.knownIssues || '',
        accessInstructions: formData.accessInstructions || '',
        contactPerson: formData.contactPerson || '',
        contactPhone: formData.contactPhone || '',
        preferredContact: formData.preferredContact || '',
        availabilityWindow: formData.availabilityWindow || '',
        specialRequirements: formData.specialRequirements || '',
        safetyConsiderations: formData.safetyConsiderations || '',
        recordingConsent: formData.recordingConsent || false,
        uploadedFiles: [], // TODO: Implement file upload handling
        paymentIntentId: 'post_only_request', // Special identifier for post-only requests
        paymentStatus: 'pending', // For post-only requests, payment status is pending
        paidAt: undefined,
      };

      console.log('Posting request to backend:', payload);

      // Call the actual backend API
      const response = await inspectionRequestService.createInspectionRequest(payload);
      
      if (response.data) {
        toast.success('Request posted successfully!', { 
          description: `Request ID: ${response.data.id}. Agents will start applying soon.` 
        });
        setShowReview(false);
        navigate('/request-confirmation');
      } else {
        throw new Error('Failed to create request - no data returned');
      }
    } catch (err) {
      console.error('Error posting request:', err);
      toast.error('Failed to post request. Please try again.', {
        description: err instanceof Error ? err.message : 'Unknown error occurred'
      });
    } finally {
      setPosting(false);
    }
  };

  const handlePay = async () => {
    // TODO: integrate Stripe — call backend to create a PaymentIntent and redirect to checkout or use Stripe Elements
    toast('Proceeding to payment is not wired yet. Redirecting to confirmation as a placeholder.');
    setShowReview(false);
    // For now, proceed to the same confirmation flow (placeholder)
    navigate('/request-confirmation');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] px-6 py-3 rounded-full mb-6 border border-[rgba(42,100,186,0.2)]">
              <FileText className="h-6 w-6 text-[rgba(42,100,186,1)]" />
              <span className="text-sm font-semibold text-[rgba(13,38,75,1)]">New Inspection Request</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[rgba(13,38,75,1)] mb-3 tracking-tight">
              Post Your Inspection Request
            </h1>
            <p className="text-lg text-[rgba(13,38,75,0.7)] max-w-2xl mx-auto leading-relaxed">
              Get professional inspection services by qualified agents in your area. 
              Complete the form below to start receiving applications.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Main Form */}
          <div className="lg:col-span-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="bg-white/90 backdrop-blur-sm border-[rgba(42,100,186,0.2)] shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="border-b border-[rgba(42,100,186,0.1)] bg-gradient-to-r from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)]">
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
                    <Select value={formData.category} onValueChange={(value) => {
                      handleInputChange("category", value);
                      handleInputChange("subCategory", ""); // Reset subcategory when category changes
                    }}>
                      <SelectTrigger id="category" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automotive">Automotive & Vehicles</SelectItem>
                        <SelectItem value="heavy-equipment">Heavy Equipment & Machinery</SelectItem>
                        <SelectItem value="electronics">Electronics & Technology</SelectItem>
                        <SelectItem value="appliances">Home Appliances</SelectItem>
                        <SelectItem value="machinery">Industrial Machinery</SelectItem>
                        <SelectItem value="construction">Construction Equipment</SelectItem>
                        <SelectItem value="antiques">Antiques & Collectibles</SelectItem>
                        <SelectItem value="jewelry">Jewelry & Precious Items</SelectItem>
                        <SelectItem value="art">Art & Artwork</SelectItem>
                        <SelectItem value="furniture">Furniture & Home Goods</SelectItem>
                        <SelectItem value="sporting">Sporting Goods & Equipment</SelectItem>
                        <SelectItem value="musical">Musical Instruments</SelectItem>
                        <SelectItem value="medical">Medical Equipment</SelectItem>
                        <SelectItem value="marine">Marine & Boats</SelectItem>
                        <SelectItem value="aviation">Aviation & Aircraft</SelectItem>
                        <SelectItem value="agricultural">Agricultural Equipment</SelectItem>
                        <SelectItem value="commercial">Commercial Equipment</SelectItem>
                        <SelectItem value="industrial">Industrial Facilities</SelectItem>
                        <SelectItem value="retail">Retail & Business Assets</SelectItem>
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
                        onValueChange={(value) => {
                          if (value === "others") {
                            handleInputChange("subCategory", value);
                            handleInputChange("customSubCategory", "");
                          } else {
                            handleInputChange("subCategory", value);
                            handleInputChange("customSubCategory", "");
                          }
                        }}
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
                  Location & Service Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <SearchableSelect
                      value={formData.state}
                      onValueChange={(value) => {
                        handleInputChange("state", value);
                        handleInputChange("city", ""); // Reset city when state changes
                      }}
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
                  onTierChange={setSelectedServiceTier}
                  selectedAdditionalServices={selectedAdditionalServices}
                  onAdditionalServicesChange={setSelectedAdditionalServices}
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
                  <Label htmlFor="urgency">When do you need this inspection?</Label>
                  <Input
                    id="urgency"
                    type="date"
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50"
                    min={new Date().toISOString().split('T')[0]} // today
                  />
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
          <div className="sticky top-6 z-10 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto space-y-4">
            <div className="space-y-4">
              <FormProgress
                formData={formData}
                selectedServiceTier={selectedServiceTier}
                photoFiles={photoFiles}
                className="shadow-xl"
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
      </div>
    </div>
  );
};