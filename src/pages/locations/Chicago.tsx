import React from 'react';
import LocationPage from '../../components/seo/LocationPage';

const ChicagoPage = () => (
  <LocationPage
    city="Chicago"
    state="Illinois"
    zipCodes={[
      "60601", "60602", "60603", "60604", "60605", "60606", "60607", "60608",
      "60609", "60610", "60611", "60612", "60613", "60614", "60615", "60616",
      "60617", "60618", "60619", "60620", "60621", "60622", "60623", "60624",
      "60625", "60626", "60628", "60629", "60630", "60631", "60632", "60633"
    ]}
    nearbyAreas={[
      "Aurora, IL", "Rockford, IL", "Joliet, IL", "Naperville, IL",
      "Schaumburg, IL", "Evanston, IL", "Des Plaines, IL", "Arlington Heights, IL",
      "Gary, IN", "Hammond, IN", "Milwaukee, WI", "Kenosha, WI"
    ]}
  />
);

export default ChicagoPage;
