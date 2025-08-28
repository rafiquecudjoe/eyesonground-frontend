import React from 'react';
import LocationPage from '../../components/seo/LocationPage';

const LosAngelesPage = () => (
  <LocationPage
    city="Los Angeles"
    state="California"
    zipCodes={[
      "90001", "90002", "90003", "90004", "90005", "90006", "90007", "90008",
      "90010", "90011", "90012", "90013", "90014", "90015", "90016", "90017",
      "90018", "90019", "90020", "90021", "90022", "90023", "90024", "90025",
      "90026", "90027", "90028", "90029", "90031", "90032", "90033", "90034"
    ]}
    nearbyAreas={[
      "Santa Monica, CA", "Beverly Hills, CA", "West Hollywood, CA", "Pasadena, CA",
      "Glendale, CA", "Burbank, CA", "Long Beach, CA", "Anaheim, CA",
      "Irvine, CA", "Torrance, CA", "Inglewood, CA", "Culver City, CA"
    ]}
  />
);

export default LosAngelesPage;
