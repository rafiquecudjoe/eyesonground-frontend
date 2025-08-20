
export interface ServiceDetails {
  id: string;
  title: string;
  status: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  psiInformation: {
    category: string;
    subCategory: string;
    details: string;
    agentName: string;
  };
  quote: string;
  description: string;
  timeAndDate: {
    date: string;
    time: string;
    duration: string;
    mile: string;
  };
  images: string[];
  video: string;
}

export const getServiceById = (id: string): ServiceDetails => {
  return {
    id,
    title: "Spark plug change (Automobile)",
    status: "completed",
    location: {
      address: "21, brooks street 425 US",
      coordinates: [40.7128, -74.0060],
    },
    psiInformation: {
      category: "Automobile",
      subCategory: "Car repair",
      details: "Repair Car plug and fix tyres",
      agentName: "John Christian Doe"
    },
    quote: "3,542.7 USD",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    timeAndDate: {
      date: "12 September 2024",
      time: "10:45am",
      duration: "5 hours 43 min",
      mile: "50"
    },
    images: [
      "/lovable-uploads/540ff7d2-8e2a-426a-ba3d-28bfaa58fa37.png",
      "/lovable-uploads/8448fbfa-57c3-4abf-bfb2-bf269d1e0b0c.png"
    ],
    video: "https://example.com/video.mp4"
  };
};
