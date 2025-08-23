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

export const CreateRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    location: "",
    address: "",
    budget: "",
    urgency: "",
    description: "",
    phoneNumber: ""
  });
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
    console.log("Request data:", { ...formData, photoFiles, videoFile });
    
    toast.success("Request posted successfully!", {
      description: "Agents will start applying soon"
    });
    
    navigate("/client-dashboard/my-requests");
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <button 
          onClick={() => navigate("/client-dashboard/my-requests")}
          className="inline-flex items-center text-[rgba(42,100,186,1)] hover:text-[rgba(13,38,75,1)] mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Requests
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
                    <SelectItem value="automotive">Automotive & Vehicles</SelectItem>
                    <SelectItem value="real-estate">Real Estate & Property</SelectItem>
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
                    <SelectItem value="commercial">Commercial Property</SelectItem>
                    <SelectItem value="industrial">Industrial Property</SelectItem>
                    <SelectItem value="retail">Retail & Business Assets</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subCategory">Sub Category</Label>
                <Select value={formData.subCategory} onValueChange={(value) => handleInputChange("subCategory", value)}>
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
                      </>
                    )}
                    
                    {/* Real Estate Subcategories */}
                    {formData.category === "real-estate" && (
                      <>
                        <SelectItem value="residential-homes">Residential Homes</SelectItem>
                        <SelectItem value="condos-townhomes">Condos/Townhomes</SelectItem>
                        <SelectItem value="apartments">Apartments</SelectItem>
                        <SelectItem value="land-lots">Land/Lots</SelectItem>
                        <SelectItem value="vacation-rentals">Vacation Rentals</SelectItem>
                        <SelectItem value="mobile-homes">Mobile Homes</SelectItem>
                        <SelectItem value="new-construction">New Construction</SelectItem>
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
                      </>
                    )}
                    
                    {/* Other categories */}
                    {formData.category === "antiques" && (
                      <>
                        <SelectItem value="vintage-furniture">Vintage Furniture</SelectItem>
                        <SelectItem value="vintage-jewelry">Vintage Jewelry</SelectItem>
                        <SelectItem value="collectible-coins">Collectible Coins</SelectItem>
                        <SelectItem value="vintage-art">Vintage Art</SelectItem>
                        <SelectItem value="vintage-books">Vintage Books</SelectItem>
                        <SelectItem value="vintage-toys">Vintage Toys</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "jewelry" && (
                      <>
                        <SelectItem value="diamond-jewelry">Diamond Jewelry</SelectItem>
                        <SelectItem value="gold-jewelry">Gold Jewelry</SelectItem>
                        <SelectItem value="silver-jewelry">Silver Jewelry</SelectItem>
                        <SelectItem value="luxury-watches">Luxury Watches</SelectItem>
                        <SelectItem value="gemstone-jewelry">Gemstone Jewelry</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "art" && (
                      <>
                        <SelectItem value="paintings">Paintings</SelectItem>
                        <SelectItem value="sculptures">Sculptures</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="mixed-media">Mixed Media</SelectItem>
                        <SelectItem value="prints-posters">Prints/Posters</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "furniture" && (
                      <>
                        <SelectItem value="bedroom-furniture">Bedroom Furniture</SelectItem>
                        <SelectItem value="living-room">Living Room Furniture</SelectItem>
                        <SelectItem value="dining-furniture">Dining Furniture</SelectItem>
                        <SelectItem value="office-furniture">Office Furniture</SelectItem>
                        <SelectItem value="outdoor-furniture">Outdoor Furniture</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "sporting" && (
                      <>
                        <SelectItem value="fitness-equipment">Fitness Equipment</SelectItem>
                        <SelectItem value="outdoor-gear">Outdoor Gear</SelectItem>
                        <SelectItem value="team-sports">Team Sports Equipment</SelectItem>
                        <SelectItem value="water-sports">Water Sports Equipment</SelectItem>
                        <SelectItem value="winter-sports">Winter Sports Equipment</SelectItem>
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
                      </>
                    )}
                    
                    {formData.category === "medical" && (
                      <>
                        <SelectItem value="diagnostic-equipment">Diagnostic Equipment</SelectItem>
                        <SelectItem value="surgical-instruments">Surgical Instruments</SelectItem>
                        <SelectItem value="dental-equipment">Dental Equipment</SelectItem>
                        <SelectItem value="rehabilitation">Rehabilitation Equipment</SelectItem>
                        <SelectItem value="laboratory-equipment">Laboratory Equipment</SelectItem>
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
                      </>
                    )}
                    
                    {formData.category === "aviation" && (
                      <>
                        <SelectItem value="single-engine">Single Engine Aircraft</SelectItem>
                        <SelectItem value="multi-engine">Multi Engine Aircraft</SelectItem>
                        <SelectItem value="helicopters">Helicopters</SelectItem>
                        <SelectItem value="gliders">Gliders</SelectItem>
                        <SelectItem value="aircraft-parts">Aircraft Parts</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "agricultural" && (
                      <>
                        <SelectItem value="tractors">Tractors</SelectItem>
                        <SelectItem value="harvesters">Harvesters</SelectItem>
                        <SelectItem value="irrigation-systems">Irrigation Systems</SelectItem>
                        <SelectItem value="livestock-equipment">Livestock Equipment</SelectItem>
                        <SelectItem value="farming-tools">Farming Tools</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "commercial" && (
                      <>
                        <SelectItem value="office-buildings">Office Buildings</SelectItem>
                        <SelectItem value="retail-spaces">Retail Spaces</SelectItem>
                        <SelectItem value="warehouses">Warehouses</SelectItem>
                        <SelectItem value="restaurants">Restaurants</SelectItem>
                        <SelectItem value="hotels-motels">Hotels/Motels</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "industrial" && (
                      <>
                        <SelectItem value="manufacturing-facilities">Manufacturing Facilities</SelectItem>
                        <SelectItem value="distribution-centers">Distribution Centers</SelectItem>
                        <SelectItem value="industrial-land">Industrial Land</SelectItem>
                        <SelectItem value="storage-facilities">Storage Facilities</SelectItem>
                      </>
                    )}
                    
                    {formData.category === "retail" && (
                      <>
                        <SelectItem value="store-fixtures">Store Fixtures</SelectItem>
                        <SelectItem value="point-of-sale">Point of Sale Systems</SelectItem>
                        <SelectItem value="inventory-equipment">Inventory Equipment</SelectItem>
                        <SelectItem value="display-equipment">Display Equipment</SelectItem>
                      </>
                    )}
                    
                    {/* Default/Other */}
                    {(!formData.category || formData.category === "other") && (
                      <SelectItem value="general-inspection">General Inspection</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location & Budget */}
        <Card className="bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)]">
          <CardHeader>
            <CardTitle className="text-[rgba(13,38,75,1)] flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[rgba(42,100,186,1)]" />
              Location & Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">City/State</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger id="location" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Major US Cities by State */}
                    <SelectItem value="new-york-ny">New York, NY</SelectItem>
                    <SelectItem value="los-angeles-ca">Los Angeles, CA</SelectItem>
                    <SelectItem value="chicago-il">Chicago, IL</SelectItem>
                    <SelectItem value="houston-tx">Houston, TX</SelectItem>
                    <SelectItem value="phoenix-az">Phoenix, AZ</SelectItem>
                    <SelectItem value="philadelphia-pa">Philadelphia, PA</SelectItem>
                    <SelectItem value="san-antonio-tx">San Antonio, TX</SelectItem>
                    <SelectItem value="san-diego-ca">San Diego, CA</SelectItem>
                    <SelectItem value="dallas-tx">Dallas, TX</SelectItem>
                    <SelectItem value="san-jose-ca">San Jose, CA</SelectItem>
                    <SelectItem value="austin-tx">Austin, TX</SelectItem>
                    <SelectItem value="jacksonville-fl">Jacksonville, FL</SelectItem>
                    <SelectItem value="fort-worth-tx">Fort Worth, TX</SelectItem>
                    <SelectItem value="columbus-oh">Columbus, OH</SelectItem>
                    <SelectItem value="charlotte-nc">Charlotte, NC</SelectItem>
                    <SelectItem value="san-francisco-ca">San Francisco, CA</SelectItem>
                    <SelectItem value="indianapolis-in">Indianapolis, IN</SelectItem>
                    <SelectItem value="seattle-wa">Seattle, WA</SelectItem>
                    <SelectItem value="denver-co">Denver, CO</SelectItem>
                    <SelectItem value="washington-dc">Washington, DC</SelectItem>
                    <SelectItem value="boston-ma">Boston, MA</SelectItem>
                    <SelectItem value="el-paso-tx">El Paso, TX</SelectItem>
                    <SelectItem value="detroit-mi">Detroit, MI</SelectItem>
                    <SelectItem value="nashville-tn">Nashville, TN</SelectItem>
                    <SelectItem value="portland-or">Portland, OR</SelectItem>
                    <SelectItem value="memphis-tn">Memphis, TN</SelectItem>
                    <SelectItem value="oklahoma-city-ok">Oklahoma City, OK</SelectItem>
                    <SelectItem value="las-vegas-nv">Las Vegas, NV</SelectItem>
                    <SelectItem value="louisville-ky">Louisville, KY</SelectItem>
                    <SelectItem value="baltimore-md">Baltimore, MD</SelectItem>
                    <SelectItem value="milwaukee-wi">Milwaukee, WI</SelectItem>
                    <SelectItem value="albuquerque-nm">Albuquerque, NM</SelectItem>
                    <SelectItem value="tucson-az">Tucson, AZ</SelectItem>
                    <SelectItem value="fresno-ca">Fresno, CA</SelectItem>
                    <SelectItem value="mesa-az">Mesa, AZ</SelectItem>
                    <SelectItem value="sacramento-ca">Sacramento, CA</SelectItem>
                    <SelectItem value="atlanta-ga">Atlanta, GA</SelectItem>
                    <SelectItem value="kansas-city-mo">Kansas City, MO</SelectItem>
                    <SelectItem value="colorado-springs-co">Colorado Springs, CO</SelectItem>
                    <SelectItem value="miami-fl">Miami, FL</SelectItem>
                    <SelectItem value="raleigh-nc">Raleigh, NC</SelectItem>
                    <SelectItem value="omaha-ne">Omaha, NE</SelectItem>
                    <SelectItem value="long-beach-ca">Long Beach, CA</SelectItem>
                    <SelectItem value="virginia-beach-va">Virginia Beach, VA</SelectItem>
                    <SelectItem value="oakland-ca">Oakland, CA</SelectItem>
                    <SelectItem value="minneapolis-mn">Minneapolis, MN</SelectItem>
                    <SelectItem value="tulsa-ok">Tulsa, OK</SelectItem>
                    <SelectItem value="tampa-fl">Tampa, FL</SelectItem>
                    <SelectItem value="arlington-tx">Arlington, TX</SelectItem>
                    <SelectItem value="wichita-ks">Wichita, KS</SelectItem>
                    <SelectItem value="new-orleans-la">New Orleans, LA</SelectItem>
                    <SelectItem value="cleveland-oh">Cleveland, OH</SelectItem>
                    <SelectItem value="bakersfield-ca">Bakersfield, CA</SelectItem>
                    <SelectItem value="tampa-fl">Tampa, FL</SelectItem>
                    <SelectItem value="honolulu-hi">Honolulu, HI</SelectItem>
                    <SelectItem value="anaheim-ca">Anaheim, CA</SelectItem>
                    <SelectItem value="santa-ana-ca">Santa Ana, CA</SelectItem>
                    <SelectItem value="corpus-christi-tx">Corpus Christi, TX</SelectItem>
                    <SelectItem value="riverside-ca">Riverside, CA</SelectItem>
                    <SelectItem value="lexington-ky">Lexington, KY</SelectItem>
                    <SelectItem value="stockton-ca">Stockton, CA</SelectItem>
                    <SelectItem value="henderson-nv">Henderson, NV</SelectItem>
                    <SelectItem value="saint-paul-mn">Saint Paul, MN</SelectItem>
                    <SelectItem value="cincinnati-oh">Cincinnati, OH</SelectItem>
                    <SelectItem value="pittsburgh-pa">Pittsburgh, PA</SelectItem>
                    <SelectItem value="greensboro-nc">Greensboro, NC</SelectItem>
                    <SelectItem value="lincoln-ne">Lincoln, NE</SelectItem>
                    <SelectItem value="plano-tx">Plano, TX</SelectItem>
                    <SelectItem value="anchorage-ak">Anchorage, AK</SelectItem>
                    <SelectItem value="orlando-fl">Orlando, FL</SelectItem>
                    <SelectItem value="irvine-ca">Irvine, CA</SelectItem>
                    <SelectItem value="newark-nj">Newark, NJ</SelectItem>
                    <SelectItem value="durham-nc">Durham, NC</SelectItem>
                    <SelectItem value="chula-vista-ca">Chula Vista, CA</SelectItem>
                    <SelectItem value="toledo-oh">Toledo, OH</SelectItem>
                    <SelectItem value="fort-wayne-in">Fort Wayne, IN</SelectItem>
                    <SelectItem value="st-petersburg-fl">St. Petersburg, FL</SelectItem>
                    <SelectItem value="laredo-tx">Laredo, TX</SelectItem>
                    <SelectItem value="jersey-city-nj">Jersey City, NJ</SelectItem>
                    <SelectItem value="chandler-az">Chandler, AZ</SelectItem>
                    <SelectItem value="madison-wi">Madison, WI</SelectItem>
                    <SelectItem value="lubbock-tx">Lubbock, TX</SelectItem>
                    <SelectItem value="norfolk-va">Norfolk, VA</SelectItem>
                    <SelectItem value="winston-salem-nc">Winston-Salem, NC</SelectItem>
                    <SelectItem value="glendale-az">Glendale, AZ</SelectItem>
                    <SelectItem value="garland-tx">Garland, TX</SelectItem>
                    <SelectItem value="hialeah-fl">Hialeah, FL</SelectItem>
                    <SelectItem value="reno-nv">Reno, NV</SelectItem>
                    <SelectItem value="baton-rouge-la">Baton Rouge, LA</SelectItem>
                    <SelectItem value="irving-tx">Irving, TX</SelectItem>
                    <SelectItem value="chesapeake-va">Chesapeake, VA</SelectItem>
                    <SelectItem value="scottsdale-az">Scottsdale, AZ</SelectItem>
                    <SelectItem value="north-las-vegas-nv">North Las Vegas, NV</SelectItem>
                    <SelectItem value="fremont-ca">Fremont, CA</SelectItem>
                    <SelectItem value="gilbert-az">Gilbert, AZ</SelectItem>
                    <SelectItem value="san-bernardino-ca">San Bernardino, CA</SelectItem>
                    <SelectItem value="boise-id">Boise, ID</SelectItem>
                    <SelectItem value="birmingham-al">Birmingham, AL</SelectItem>
                    <SelectItem value="spokane-wa">Spokane, WA</SelectItem>
                    <SelectItem value="rochester-ny">Rochester, NY</SelectItem>
                    <SelectItem value="des-moines-ia">Des Moines, IA</SelectItem>
                    <SelectItem value="modesto-ca">Modesto, CA</SelectItem>
                    <SelectItem value="fayetteville-nc">Fayetteville, NC</SelectItem>
                    <SelectItem value="tacoma-wa">Tacoma, WA</SelectItem>
                    <SelectItem value="oxnard-ca">Oxnard, CA</SelectItem>
                    <SelectItem value="fontana-ca">Fontana, CA</SelectItem>
                    <SelectItem value="columbus-ga">Columbus, GA</SelectItem>
                    <SelectItem value="montgomery-al">Montgomery, AL</SelectItem>
                    <SelectItem value="shreveport-la">Shreveport, LA</SelectItem>
                    <SelectItem value="aurora-il">Aurora, IL</SelectItem>
                    <SelectItem value="yonkers-ny">Yonkers, NY</SelectItem>
                    <SelectItem value="akron-oh">Akron, OH</SelectItem>
                    <SelectItem value="huntington-beach-ca">Huntington Beach, CA</SelectItem>
                    <SelectItem value="little-rock-ar">Little Rock, AR</SelectItem>
                    <SelectItem value="augusta-ga">Augusta, GA</SelectItem>
                    <SelectItem value="amarillo-tx">Amarillo, TX</SelectItem>
                    <SelectItem value="glendale-ca">Glendale, CA</SelectItem>
                    <SelectItem value="mobile-al">Mobile, AL</SelectItem>
                    <SelectItem value="grand-rapids-mi">Grand Rapids, MI</SelectItem>
                    <SelectItem value="salt-lake-city-ut">Salt Lake City, UT</SelectItem>
                    <SelectItem value="tallahassee-fl">Tallahassee, FL</SelectItem>
                    <SelectItem value="huntsville-al">Huntsville, AL</SelectItem>
                    <SelectItem value="grand-prairie-tx">Grand Prairie, TX</SelectItem>
                    <SelectItem value="knoxville-tn">Knoxville, TN</SelectItem>
                    <SelectItem value="worcester-ma">Worcester, MA</SelectItem>
                    <SelectItem value="newport-news-va">Newport News, VA</SelectItem>
                    <SelectItem value="brownsville-tx">Brownsville, TX</SelectItem>
                    <SelectItem value="overland-park-ks">Overland Park, KS</SelectItem>
                    <SelectItem value="santa-clarita-ca">Santa Clarita, CA</SelectItem>
                    <SelectItem value="providence-ri">Providence, RI</SelectItem>
                    <SelectItem value="garden-grove-ca">Garden Grove, CA</SelectItem>
                    <SelectItem value="chattanooga-tn">Chattanooga, TN</SelectItem>
                    <SelectItem value="oceanside-ca">Oceanside, CA</SelectItem>
                    <SelectItem value="jackson-ms">Jackson, MS</SelectItem>
                    <SelectItem value="fort-lauderdale-fl">Fort Lauderdale, FL</SelectItem>
                    <SelectItem value="santa-rosa-ca">Santa Rosa, CA</SelectItem>
                    <SelectItem value="rancho-cucamonga-ca">Rancho Cucamonga, CA</SelectItem>
                    <SelectItem value="port-st-lucie-fl">Port St. Lucie, FL</SelectItem>
                    <SelectItem value="tempe-az">Tempe, AZ</SelectItem>
                    <SelectItem value="ontario-ca">Ontario, CA</SelectItem>
                    <SelectItem value="vancouver-wa">Vancouver, WA</SelectItem>
                    <SelectItem value="cape-coral-fl">Cape Coral, FL</SelectItem>
                    <SelectItem value="sioux-falls-sd">Sioux Falls, SD</SelectItem>
                    <SelectItem value="springfield-mo">Springfield, MO</SelectItem>
                    <SelectItem value="peoria-az">Peoria, AZ</SelectItem>
                    <SelectItem value="pembroke-pines-fl">Pembroke Pines, FL</SelectItem>
                    <SelectItem value="elk-grove-ca">Elk Grove, CA</SelectItem>
                    <SelectItem value="rockford-il">Rockford, IL</SelectItem>
                    <SelectItem value="palmdale-ca">Palmdale, CA</SelectItem>
                    <SelectItem value="corona-ca">Corona, CA</SelectItem>
                    <SelectItem value="salinas-ca">Salinas, CA</SelectItem>
                    <SelectItem value="pomona-ca">Pomona, CA</SelectItem>
                    <SelectItem value="paterson-nj">Paterson, NJ</SelectItem>
                    <SelectItem value="joliet-il">Joliet, IL</SelectItem>
                    <SelectItem value="kansas-city-ks">Kansas City, KS</SelectItem>
                    <SelectItem value="torrance-ca">Torrance, CA</SelectItem>
                    <SelectItem value="syracuse-ny">Syracuse, NY</SelectItem>
                    <SelectItem value="bridgeport-ct">Bridgeport, CT</SelectItem>
                    <SelectItem value="hayward-ca">Hayward, CA</SelectItem>
                    <SelectItem value="fort-collins-co">Fort Collins, CO</SelectItem>
                    <SelectItem value="escondido-ca">Escondido, CA</SelectItem>
                    <SelectItem value="lakewood-co">Lakewood, CO</SelectItem>
                    <SelectItem value="naperville-il">Naperville, IL</SelectItem>
                    <SelectItem value="dayton-oh">Dayton, OH</SelectItem>
                    <SelectItem value="hollywood-fl">Hollywood, FL</SelectItem>
                    <SelectItem value="sunnyvale-ca">Sunnyvale, CA</SelectItem>
                    <SelectItem value="alexandria-va">Alexandria, VA</SelectItem>
                    <SelectItem value="mesquite-tx">Mesquite, TX</SelectItem>
                    <SelectItem value="hampton-va">Hampton, VA</SelectItem>
                    <SelectItem value="pasadena-ca">Pasadena, CA</SelectItem>
                    <SelectItem value="orange-ca">Orange, CA</SelectItem>
                    <SelectItem value="savannah-ga">Savannah, GA</SelectItem>
                    <SelectItem value="cary-nc">Cary, NC</SelectItem>
                    <SelectItem value="fullerton-ca">Fullerton, CA</SelectItem>
                    <SelectItem value="warren-mi">Warren, MI</SelectItem>
                    <SelectItem value="other">Other (Please specify in address)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger id="budget" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200-300">$200 - $300</SelectItem>
                    <SelectItem value="300-500">$300 - $500</SelectItem>
                    <SelectItem value="500+">$500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Specific Address</Label>
                <Input 
                  id="address" 
                  placeholder="Enter the inspection address" 
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] focus:border-[rgba(42,100,186,1)] bg-white/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="urgency">Timeline</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger id="urgency" className="h-12 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/50">
                    <SelectValue placeholder="When do you need this?" />
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
            </div>
          </CardContent>
        </Card>

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
            onClick={() => navigate("/client-dashboard/marketplace")}
            variant="outline" 
            className="flex-1 h-12 border-[rgba(42,100,186,0.3)] hover:bg-[rgba(42,100,186,0.1)] rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};