import React from 'react';
import LocationPage from '../../components/seo/LocationPage';

const NewYorkCityPage = () => (
  <LocationPage
    city="New York City"
    state="New York"
    zipCodes={[
      "10001", "10002", "10003", "10004", "10005", "10006", "10007", "10009",
      "10010", "10011", "10012", "10013", "10014", "10016", "10017", "10018",
      "10019", "10020", "10021", "10022", "10023", "10024", "10025", "10026",
      "10027", "10028", "10029", "10030", "10031", "10032", "10033", "10034"
    ]}
    nearbyAreas={[
      "Brooklyn, NY", "Queens, NY", "Bronx, NY", "Staten Island, NY",
      "Jersey City, NJ", "Newark, NJ", "Yonkers, NY", "Mount Vernon, NY",
      "White Plains, NY", "New Rochelle, NY", "Hoboken, NJ", "Weehawken, NJ"
    ]}
  />
);

export default NewYorkCityPage;
