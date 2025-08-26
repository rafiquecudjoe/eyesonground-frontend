import { useState } from "react";
import { ArrowLeft, Upload, MapPin, Calendar, DollarSign, FileText } from "lucide-react";
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
import { ServiceTier, AdditionalService } from "@/lib/pricing/service-tiers";

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
    description: "",
    phoneNumber: "",
    specificAreas: "",
    knownIssues: "",
    accessInstructions: "",
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
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    
    console.log("Request data:", { 
      ...formData, 
      selectedServiceTier,
      selectedAdditionalServices,
      photoFiles, 
      videoFile 
    });
    
    toast.success("Request posted successfully!", {
      description: "Agents will start applying soon"
    });
    
    navigate("/client-dashboard/my-ads");
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl min-h-screen">
      <div className="mb-6">
        <button 
          onClick={() => navigate("/client-dashboard/post-board")}
          className="inline-flex items-center text-[rgba(42,100,186,1)] hover:text-[rgba(13,38,75,1)] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Post Board
        </button>
        
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
                    ) : (
                      <Select value={formData.subCategory} onValueChange={(value) => {
                        if (value === "others") {
                          handleInputChange("subCategory", value);
                          handleInputChange("customSubCategory", "");
                        } else {
                          handleInputChange("subCategory", value);
                          handleInputChange("customSubCategory", "");
                        }
                      }}>
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
                    )}
                    
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
                    <Select value={formData.state} onValueChange={(value) => {
                      handleInputChange("state", value);
                      handleInputChange("city", ""); // Reset city when state changes
                    }}>
                      <SelectTrigger id="state" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="AR">Arkansas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="DE">Delaware</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="HI">Hawaii</SelectItem>
                        <SelectItem value="ID">Idaho</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="IN">Indiana</SelectItem>
                        <SelectItem value="IA">Iowa</SelectItem>
                        <SelectItem value="KS">Kansas</SelectItem>
                        <SelectItem value="KY">Kentucky</SelectItem>
                        <SelectItem value="LA">Louisiana</SelectItem>
                        <SelectItem value="ME">Maine</SelectItem>
                        <SelectItem value="MD">Maryland</SelectItem>
                        <SelectItem value="MA">Massachusetts</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                        <SelectItem value="MN">Minnesota</SelectItem>
                        <SelectItem value="MS">Mississippi</SelectItem>
                        <SelectItem value="MO">Missouri</SelectItem>
                        <SelectItem value="MT">Montana</SelectItem>
                        <SelectItem value="NE">Nebraska</SelectItem>
                        <SelectItem value="NV">Nevada</SelectItem>
                        <SelectItem value="NH">New Hampshire</SelectItem>
                        <SelectItem value="NJ">New Jersey</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="ND">North Dakota</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="OK">Oklahoma</SelectItem>
                        <SelectItem value="OR">Oregon</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="RI">Rhode Island</SelectItem>
                        <SelectItem value="SC">South Carolina</SelectItem>
                        <SelectItem value="SD">South Dakota</SelectItem>
                        <SelectItem value="TN">Tennessee</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="UT">Utah</SelectItem>
                        <SelectItem value="VT">Vermont</SelectItem>
                        <SelectItem value="VA">Virginia</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                        <SelectItem value="WV">West Virginia</SelectItem>
                        <SelectItem value="WI">Wisconsin</SelectItem>
                        <SelectItem value="WY">Wyoming</SelectItem>
                        <SelectItem value="DC">Washington D.C.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      list="cities"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                      placeholder={formData.state ? "Type to search cities..." : "Select state first"}
                      disabled={!formData.state}
                      required
                    />
                    <datalist id="cities">
                      {formData.state && getCitiesForState(formData.state).map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Specific Address</Label>
                    <Input 
                      id="address" 
                      placeholder="Enter the inspection address" 
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                      list="addresses"
                      required
                    />
                    <datalist id="addresses">
                      {getAddressSuggestions(formData.address).map((address, index) => (
                        <option key={index} value={address} />
                      ))}
                    </datalist>
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
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                    <SelectTrigger id="urgency" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same Day</SelectItem>
                      <SelectItem value="within-24h">Within 24 hours</SelectItem>
                      <SelectItem value="within-3-days">Within 3 days</SelectItem>
                      <SelectItem value="within-week">Within a week</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
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

            {/* Description & Media */}
            <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
              <CardHeader>
                <CardTitle className="text-[rgba(13,38,75,1)]">Description & Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="min-h-[120px] rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                    placeholder="Describe what you need inspected, any specific concerns, and what you're looking for in the report..."
                    required
                  />
                </div>
                
                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label>Reference Photos (Optional)</Label>
                  <div className="border-2 border-dashed border-[rgba(42,100,186,0.3)] rounded-xl p-8 text-center bg-[rgba(42,100,186,0.02)] hover:bg-[rgba(42,100,186,0.05)] transition-colors">
                    <input
                      type="file"
                      id="photo-upload"
                      className="hidden"
                      accept="image/jpeg,image/png"
                      multiple
                      onChange={handlePhotoChange}
                    />
                    <label 
                      htmlFor="photo-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="h-8 w-8 text-[rgba(42,100,186,1)] mb-2" />
                      <p className="text-sm font-medium text-[rgba(13,38,75,1)]">Upload reference images</p>
                      <p className="text-xs text-[rgba(13,38,75,0.6)] mt-1">JPG, PNG format • Max 5 files</p>
                      {photoFiles.length > 0 && (
                        <p className="text-sm text-green-600 mt-2">{photoFiles.length} file(s) selected</p>
                      )}
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

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
    </div>
  );
};