
import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { supabase } from "@/integrations/supabase/client";

interface LocationSectionProps {
  address: string;
  coordinates: [number, number];
}

const mapContainerStyle = {
  width: "100%",
  height: "300px"
};

export const LocationSection = ({ address, coordinates }: LocationSectionProps) => {
  const [latitude, longitude] = coordinates;
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const center = {
    lat: latitude,
    lng: longitude
  };

  useEffect(() => {
    async function fetchGoogleMapsApiKey() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('get-google-maps-key', {
          method: 'GET'
        });

        if (error) {
          console.error("Error fetching Google Maps API key:", error);
          setError("Failed to load map. Please try again later.");
        } else if (data && data.apiKey) {
          setApiKey(data.apiKey);
        }
      } catch (err) {
        console.error("Exception fetching Google Maps API key:", err);
        setError("Failed to load map. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGoogleMapsApiKey();
  }, []);
  
  return (
    <section>
      <h2 className="text-lg font-medium text-[rgba(13,38,75,1)] uppercase mb-4">LOCATION</h2>
      <Card className="overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-medium text-[rgba(42,100,186,1)]">Destination details</h3>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{address}</span>
          </div>
        </div>
        <div className="relative h-[300px] bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-gray-500">Loading map...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <MapPin className="h-8 w-8 mx-auto text-red-400 mb-2" />
                <p className="text-gray-700">{error}</p>
              </div>
            </div>
          )}
          
          {apiKey && !isLoading && !error && (
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          )}
        </div>
      </Card>
    </section>
  );
};
