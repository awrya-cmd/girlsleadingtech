import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

// Types
type City = { name: string; count: number };
type StateData = {
  name: string;
  count: number;
  lat: number;
  lng: number;
  cities: City[];
};

// Data
const indiaData: Record<string, StateData> = {
  "Delhi NCR": { name: "Delhi (NCR)", count: 912, lat: 28.61, lng: 77.21, cities: [{ name: "Delhi/New Delhi", count: 912 }] },
  "Telangana": { name: "Telangana", count: 722, lat: 17.38, lng: 78.49, cities: [{ name: "Hyderabad/Secunderabad", count: 648 }, { name: "Warangal/Hanumakonda", count: 28 }, { name: "Karimnagar", count: 23 }, { name: "Khammam", count: 5 }, { name: "Nalgonda", count: 4 }, { name: "Mahabubnagar", count: 6 }, { name: "Thorrur", count: 6 }, { name: "Sangareddy", count: 5 }, { name: "Nizamabad", count: 3 }, { name: "Palwancha", count: 1 }, { name: "Aswapuram", count: 1 }, { name: "Godavarikhani", count: 1 }, { name: "Medak", count: 1 }] },
  "Maharashtra": { name: "Maharashtra", count: 719, lat: 19.75, lng: 75.71, cities: [{ name: "Pune/Pimpri-Chinchwad", count: 324 }, { name: "Mumbai", count: 162 }, { name: "Nagpur", count: 53 }, { name: "Nashik", count: 51 }, { name: "Navi Mumbai/Dombivli/Kalyan/Ulhasnagar", count: 49 }, { name: "Aurangabad (Chhatrapati Sambhajinagar)", count: 26 }, { name: "Thane", count: 25 }, { name: "Solapur", count: 12 }, { name: "Kolhapur", count: 6 }, { name: "Amravati", count: 5 }, { name: "Dhule", count: 4 }, { name: "Sangli", count: 4 }, { name: "Jalgaon/Bhusawal", count: 2 }, { name: "Chandrapur", count: 2 }, { name: "Latur", count: 2 }, { name: "Akola", count: 2 }, { name: "Gondia", count: 2 }, { name: "Satara/Karad", count: 2 }, { name: "Nanded", count: 2 }, { name: "Airoli", count: 1 }, { name: "Shahapur", count: 1 }, { name: "Alibag", count: 1 }, { name: "Badlapur", count: 1 }, { name: "Lonavla", count: 1 }, { name: "Shirdi", count: 1 }] },
  "Uttar Pradesh": { name: "Uttar Pradesh", count: 674, lat: 26.85, lng: 80.91, cities: [{ name: "Ghaziabad", count: 162 }, { name: "Greater Noida", count: 133 }, { name: "Noida", count: 104 }, { name: "Lucknow", count: 68 }, { name: "Kanpur", count: 49 }, { name: "Meerut/Baraut", count: 45 }, { name: "Prayagraj", count: 43 }, { name: "Varanasi", count: 25 }, { name: "Agra", count: 21 }, { name: "Mathura", count: 18 }, { name: "Saharanpur", count: 11 }, { name: "Gorakhpur", count: 9 }, { name: "Aligarh", count: 6 }, { name: "Jhansi", count: 4 }, { name: "Bulandshahr", count: 5 }, { name: "Hapur", count: 4 }, { name: "Faizabad/Ayodhya", count: 3 }, { name: "Deoria", count: 3 }, { name: "Lakhimpur Kheri", count: 3 }, { name: "Muzaffarnagar", count: 3 }, { name: "Modinagar", count: 3 }, { name: "Baghpat", count: 3 }] },
  "Tamil Nadu": { name: "Tamil Nadu", count: 301, lat: 11.13, lng: 78.66, cities: [{ name: "Chennai", count: 204 }, { name: "Coimbatore", count: 31 }, { name: "Salem", count: 10 }, { name: "Villupuram/Tindivanam", count: 10 }, { name: "Tiruppur", count: 12 }, { name: "Namakkal", count: 6 }, { name: "Madurai", count: 8 }, { name: "Trichy", count: 4 }, { name: "Dindigul", count: 4 }, { name: "Vellore", count: 4 }, { name: "Thanjavur", count: 2 }, { name: "Tirunelveli", count: 2 }] },
  "Karnataka": { name: "Karnataka", count: 298, lat: 15.32, lng: 75.72, cities: [{ name: "Bangalore/Bengaluru", count: 244 }, { name: "Mysore", count: 25 }, { name: "Mangalore", count: 13 }, { name: "Belgaum", count: 5 }, { name: "Davangere", count: 4 }, { name: "Mandya", count: 4 }, { name: "Gulbarga", count: 3 }, { name: "Hubli/Dharwad", count: 3 }, { name: "Manipal", count: 3 }, { name: "Tumkur", count: 3 }, { name: "Shimoga", count: 2 }, { name: "Hospet", count: 2 }, { name: "Udupi", count: 2 }, { name: "Bidar", count: 2 }] },
  "Andhra Pradesh": { name: "Andhra Pradesh", count: 228, lat: 15.91, lng: 79.74, cities: [{ name: "Visakhapatnam/Vizag", count: 57 }, { name: "Vijayawada", count: 52 }, { name: "Bhimavaram", count: 27 }, { name: "Guntur", count: 17 }, { name: "Kakinada", count: 14 }, { name: "Nellore", count: 12 }, { name: "Ongole", count: 10 }, { name: "Rajahmundry", count: 10 }, { name: "Amaravati", count: 8 }, { name: "Anantapur", count: 6 }, { name: "Jaggayyapeta", count: 6 }, { name: "Kadapa/Cuddapah", count: 6 }, { name: "Nandyal", count: 3 }, { name: "Eluru", count: 3 }, { name: "Kurnool", count: 3 }] },
  "Punjab": { name: "Punjab", count: 204, lat: 31.15, lng: 75.34, cities: [{ name: "Mohali/SAS Nagar", count: 68 }, { name: "Patiala", count: 29 }, { name: "Ludhiana", count: 23 }, { name: "Amritsar", count: 14 }, { name: "Zirakpur", count: 14 }, { name: "Batala", count: 5 }, { name: "Rajpura", count: 5 }, { name: "Banur", count: 6 }, { name: "Abohar", count: 4 }, { name: "Phagwara", count: 4 }, { name: "Mandi Gobindgarh", count: 4 }, { name: "Muktsar", count: 4 }, { name: "Dera Bassi", count: 4 }, { name: "Ropar", count: 3 }, { name: "Khanna", count: 3 }, { name: "Jalandhar", count: 3 }, { name: "Hoshiarpur", count: 3 }] },
  "Haryana": { name: "Haryana", count: 166, lat: 29.06, lng: 76.09, cities: [{ name: "Gurgaon/Gurugram", count: 64 }, { name: "Faridabad", count: 33 }, { name: "Panipat", count: 23 }, { name: "Rohtak", count: 16 }, { name: "Ambala", count: 11 }, { name: "Yamunanagar", count: 8 }, { name: "Panchkula", count: 6 }, { name: "Sonipat", count: 6 }, { name: "Karnal", count: 5 }, { name: "Hisar", count: 4 }, { name: "Sirsa", count: 4 }, { name: "Palwal", count: 4 }, { name: "Bhiwani", count: 3 }, { name: "Narnaul", count: 3 }] },
  "Madhya Pradesh": { name: "Madhya Pradesh", count: 139, lat: 23.47, lng: 77.95, cities: [{ name: "Indore", count: 46 }, { name: "Gwalior", count: 37 }, { name: "Bhopal", count: 22 }, { name: "Jabalpur", count: 19 }, { name: "Satna", count: 4 }, { name: "Singrauli", count: 4 }, { name: "Rewa", count: 2 }] },
  "West Bengal": { name: "West Bengal", count: 129, lat: 22.99, lng: 87.85, cities: [{ name: "Kolkata/Barasat", count: 96 }, { name: "Durgapur", count: 7 }, { name: "Howrah", count: 6 }, { name: "Burdwan", count: 5 }, { name: "Barrackpore", count: 3 }, { name: "Haldia", count: 3 }, { name: "Alipurduar", count: 2 }, { name: "Asansol", count: 1 }, { name: "Siliguri", count: 1 }, { name: "Kalyani", count: 1 }] },
  "Rajasthan": { name: "Rajasthan", count: 109, lat: 27.02, lng: 74.22, cities: [{ name: "Jaipur", count: 56 }, { name: "Jodhpur", count: 11 }, { name: "Udaipur", count: 11 }, { name: "Bikaner", count: 7 }, { name: "Kota", count: 6 }, { name: "Bharatpur", count: 5 }, { name: "Ajmer", count: 4 }, { name: "Sawai Madhopur", count: 3 }, { name: "Sri Ganganagar", count: 2 }, { name: "Alwar", count: 2 }, { name: "Nagaur", count: 2 }] },
  "Gujarat": { name: "Gujarat", count: 101, lat: 22.26, lng: 71.19, cities: [{ name: "Rajkot/Gondal", count: 26 }, { name: "Ahmedabad", count: 23 }, { name: "Surat", count: 23 }, { name: "Vadodara", count: 9 }, { name: "Anand", count: 6 }, { name: "Nadiad", count: 4 }, { name: "Valsad", count: 3 }, { name: "Amreli", count: 3 }, { name: "Bhavnagar", count: 3 }, { name: "Surendranagar", count: 2 }, { name: "Kalol", count: 2 }, { name: "Dahod", count: 2 }, { name: "Himatnagar", count: 2 }] },
  "Odisha": { name: "Odisha", count: 68, lat: 20.52, lng: 84.67, cities: [{ name: "Bhubaneswar", count: 51 }, { name: "Rourkela", count: 10 }, { name: "Sambalpur", count: 2 }, { name: "Cuttack", count: 2 }, { name: "Puri", count: 1 }, { name: "Berhampur", count: 1 }, { name: "Baripada", count: 1 }] },
  "Bihar": { name: "Bihar", count: 51, lat: 25.69, lng: 85.14, cities: [{ name: "Patna", count: 28 }, { name: "Darbhanga", count: 8 }, { name: "Muzaffarpur", count: 6 }, { name: "Buxar", count: 3 }, { name: "Bhagalpur", count: 2 }, { name: "Samastipur", count: 1 }, { name: "Munger", count: 1 }, { name: "Hajipur", count: 1 }] },
  "Jharkhand": { name: "Jharkhand", count: 35, lat: 23.61, lng: 85.28, cities: [{ name: "Ranchi", count: 21 }, { name: "Jamshedpur", count: 13 }, { name: "Dhanbad", count: 6 }, { name: "Bokaro", count: 4 }, { name: "Chaibasa", count: 2 }, { name: "Hazaribagh", count: 1 }, { name: "Ramgarh", count: 1 }] },
  "Uttarakhand": { name: "Uttarakhand", count: 31, lat: 30.07, lng: 79.02, cities: [{ name: "Roorkee", count: 13 }, { name: "Dehradun", count: 11 }, { name: "Haridwar", count: 4 }, { name: "Nainital/Rudrapur", count: 3 }, { name: "Kotdwara", count: 1 }, { name: "Vikasnagar", count: 1 }, { name: "Pauri", count: 1 }] },
  "Kerala": { name: "Kerala", count: 26, lat: 10.85, lng: 76.27, cities: [{ name: "Kochi/Ernakulam", count: 17 }, { name: "Thiruvananthapuram", count: 10 }, { name: "Thrissur", count: 4 }, { name: "Kottayam", count: 4 }, { name: "Kannur", count: 4 }, { name: "Alappuzha", count: 3 }, { name: "Kollam", count: 3 }, { name: "Pathanamthitta", count: 2 }, { name: "Kasaragod", count: 1 }] },
  "Himachal Pradesh": { name: "Himachal Pradesh", count: 25, lat: 31.90, lng: 77.11, cities: [{ name: "Hamirpur", count: 9 }, { name: "Una", count: 4 }, { name: "Baddi", count: 4 }, { name: "Mandi", count: 3 }, { name: "Solan", count: 2 }, { name: "Kangra", count: 2 }, { name: "Dharamshala", count: 1 }, { name: "Shimla", count: 1 }] },
  "Assam": { name: "Assam", count: 22, lat: 26.14, lng: 91.74, cities: [{ name: "Guwahati", count: 13 }, { name: "Silchar", count: 4 }, { name: "Dibrugarh", count: 3 }, { name: "Kamrup", count: 1 }, { name: "Nagaon", count: 1 }] },
  "Jammu & Kashmir": { name: "Jammu & Kashmir", count: 15, lat: 33.73, lng: 76.72, cities: [{ name: "Jammu", count: 11 }, { name: "Srinagar", count: 8 }] },
  "Chhattisgarh": { name: "Chhattisgarh", count: 14, lat: 21.27, lng: 81.87, cities: [{ name: "Raipur", count: 11 }, { name: "Bhilai", count: 4 }, { name: "Durg", count: 4 }] },
  "Manipur": { name: "Manipur", count: 4, lat: 24.66, lng: 93.91, cities: [{ name: "Imphal", count: 3 }, { name: "others", count: 1 }] },
  "Puducherry": { name: "Puducherry", count: 4, lat: 11.94, lng: 79.81, cities: [{ name: "Puducherry", count: 4 }] },
  "Tripura": { name: "Tripura", count: 2, lat: 23.94, lng: 91.99, cities: [{ name: "Agartala", count: 2 }] },
  "Andaman & Nicobar": { name: "Andaman & Nicobar", count: 2, lat: 11.67, lng: 92.74, cities: [{ name: "Port Blair", count: 2 }] },
  "Sikkim": { name: "Sikkim", count: 2, lat: 27.53, lng: 88.51, cities: [{ name: "Gangtok", count: 2 }] },
  "Dadra & NH and DD": { name: "Dadra & NH and DD", count: 1, lat: 20.27, lng: 73.02, cities: [{ name: "Silvassa", count: 1 }] }
};

const intlContinents = [
  { name: "South Asia", count: 17, lat: 20, lng: 70, content: "Nepal 6, Pakistan 10, Bangladesh 1" },
  { name: "Southeast Asia", count: 1, lat: 4, lng: 108, content: "Malaysia 1" },
  { name: "Africa", count: 13, lat: 0, lng: 20, content: "South Africa 6, Nigeria 4, Ghana 1, Cameroon 1, Egypt 1" },
  { name: "Europe", count: 8, lat: 50, lng: 10, content: "France/Paris 2, London/UK 2, Germany 1, Spain 1, Denmark 1, Greece 1" },
  { name: "North America", count: 22, lat: 40, lng: -100, content: "USA 21 (Brooklyn/Bronx 7, LA 4, Boston 4, Cherry Hill NJ 1, Cincinnati 1, Gainesville 1, Indianapolis 1, Nashville 1, Oklahoma 1, Point Pleasant Beach NJ 1), Canada (Ottawa) 1" },
  { name: "Middle East", count: 2, lat: 25, lng: 45, content: "Riyadh Saudi Arabia 1, Gaza 1" }
];

export function IndiaCommunityMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const [showIntl, setShowIntl] = useState(false);

  const mapObjectsRef = useRef<{ markers: any[], layers: any[] }>({ markers: [], layers: [] });

  useEffect(() => {
    let leafletScript: HTMLScriptElement;
    let leafletCss: HTMLLinkElement;

    if (!(window as any).L) {
      leafletCss = document.createElement("link");
      leafletCss.rel = "stylesheet";
      leafletCss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(leafletCss);

      leafletScript = document.createElement("script");
      leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      leafletScript.async = true;
      document.body.appendChild(leafletScript);

      leafletScript.onload = () => {
        initMap();
      };
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current) return;
      if (mapInstance) return;

      const L = (window as any).L;

      if ((mapRef.current as any)._leaflet_id) {
        (mapRef.current as any)._leaflet_id = null;
      }

      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
        center: [22.5, 82.5],
        zoom: 4.8,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 10,
        minZoom: 2
      }).addTo(map);

      map.on('focus', () => { map.scrollWheelZoom.enable(); });
      map.on('blur', () => { map.scrollWheelZoom.disable(); });
      map.on('click', () => { map.scrollWheelZoom.enable(); });

      // Initial fitbounds
      map.fitBounds([[6.5, 68], [37.5, 97.5]]);

      setMapInstance(map);
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
        setMapInstance(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance) return;
    const L = (window as any).L;

    // Clear existing markers
    mapObjectsRef.current.markers.forEach((m: any) => mapInstance.removeLayer(m));
    mapObjectsRef.current.markers = [];

    const createBadgeIcon = (count: number, label: string, type: 'state' | 'city' | 'continent', index: number) => {
      let diameter = 14;
      let bg = "#1a1a1a";
      let fontSize = "8px";

      if (type === 'city') {
        diameter = 20;
        bg = "#3a3a3a";
        fontSize = "9px";
      } else if (type === 'continent') {
        diameter = 16;
        fontSize = "9px";
      }

      // Label logic
      let labelStyle = "";
      if (type === 'city') {
        // Alternate based on index: 0 = right, 1 = left, 2 = bottom, 3 = top
        const positions = [
          `top: ${diameter / 2 - 8}px; left: ${diameter + 6}px;`,
          `top: ${diameter / 2 - 8}px; right: ${diameter + 6}px;`,
          `top: ${diameter + 4}px; left: 50%; transform: translateX(-50%);`,
          `bottom: ${diameter + 4}px; left: 50%; transform: translateX(-50%);`
        ];
        const pos = positions[index % 4];

        labelStyle = `
          position: absolute;
          ${pos}
          font-size: 11px;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
          pointer-events: none;
          background: rgba(255,255,255,0.9);
          padding: 2px 5px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        `;
      } else if (type === 'continent') {
        // Continent label beside marker
        labelStyle = `
          position: absolute;
          top: ${diameter / 2 - 8}px;
          left: ${diameter + 6}px;
          font-size: 11px;
          font-weight: 700;
          color: #1a1a1a;
          white-space: nowrap;
          pointer-events: none;
          background: rgba(255,255,255,0.9);
          padding: 2px 6px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        `;
      } else {
        // Crowded states list to stagger labels alternately left/right
        const crowded = ["Delhi (NCR)", "Haryana", "Punjab", "Uttar Pradesh", "Uttarakhand", "Himachal Pradesh"];
        if (crowded.includes(label)) {
          if (index % 2 === 0) {
            // Right offset
            labelStyle = `
              position: absolute;
              top: ${diameter / 2 - 6}px;
              left: ${diameter + 4}px;
              font-size: 9px;
              font-weight: 700;
              color: #1a1a1a;
              white-space: nowrap;
              pointer-events: none;
              text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 0px 1px 0 #fff, 0px -1px 0 #fff, -1px 0px 0 #fff, 1px 0px 0 #fff;
            `;
          } else {
            // Left offset
            labelStyle = `
              position: absolute;
              top: ${diameter / 2 - 6}px;
              right: ${diameter + 4}px;
              font-size: 9px;
              font-weight: 700;
              color: #1a1a1a;
              white-space: nowrap;
              pointer-events: none;
              text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 0px 1px 0 #fff, 0px -1px 0 #fff, -1px 0px 0 #fff, 1px 0px 0 #fff;
            `;
          }
        } else {
          // Default beside
          labelStyle = `
            position: absolute;
            top: ${diameter / 2 - 6}px;
            left: ${diameter + 4}px;
            font-size: 10px;
            font-weight: 700;
            color: #1a1a1a;
            white-space: nowrap;
            pointer-events: none;
            text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 0px 1px 0 #fff, 0px -1px 0 #fff, -1px 0px 0 #fff, 1px 0px 0 #fff;
          `;
        }
      }

      return L.divIcon({
        className: 'custom-leaflet-icon',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; items-center;">
            <div style="
              width: ${diameter}px; 
              height: ${diameter}px; 
              background-color: ${bg}; 
              border-radius: 50%; 
              display: flex; 
              align-items: center; 
              border: 1px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.15);
              transform: translateX(-50%) translateY(-50%);
            ">
              <span style="color: #ffed95; font-size: 11px; font-weight: 900; text-shadow: 1px 1px 0px rgba(0,0,0,1), -1px -1px 0px rgba(0,0,0,1), 1px -1px 0px rgba(0,0,0,1), -1px 1px 0px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,0.8); z-index: 10;">
                ${count}
              </span>
            </div>
            <div style="${labelStyle}">
              ${label}
            </div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
    };

    if (!selectedState) {
      if (showIntl) {
        mapInstance.setMaxBounds(null);
        mapInstance.setMinZoom(2);
        mapInstance.flyToBounds([[-40, -100], [60, 120]], { duration: 1.5 });
      } else {
        mapInstance.setMinZoom(4.8);
        mapInstance.setMaxBounds([[5, 60], [40, 100]]);
        mapInstance.flyToBounds([[6.5, 68], [37.5, 97.5]], { duration: 1.5 });
      }

      if (!showIntl) {
        Object.entries(indiaData).forEach(([key, data], index) => {
          const marker = L.marker([data.lat, data.lng], {
            icon: createBadgeIcon(data.count, data.name, 'state', index)
          }).addTo(mapInstance);

          marker.bindPopup(`
            <div style="text-align: center; font-family: sans-serif; padding: 4px;">
              <strong style="display: block; font-size: 14px; margin-bottom: 4px; color: #1a1a1a;">${data.name}</strong>
              <span style="font-size: 13px; color: #555;">${data.count} members</span>
            </div>
          `);

          marker.on('click', () => {
            setSelectedState(key);
            setShowAllCities(false);
          });

          mapObjectsRef.current.markers.push(marker);
        });
      }

      // Show International Continents if toggled
      if (showIntl) {
        // Show India
        const totalIndia = Object.values(indiaData).reduce((sum, state) => sum + state.count, 0);
        const indiaMarker = L.marker([22.5, 82.5], {
          icon: createBadgeIcon(totalIndia, "India", 'continent', 99)
        }).addTo(mapInstance);
        indiaMarker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="display: block; font-size: 14px; margin-bottom: 6px; color: #1a1a1a;">India</strong>
            <span style="font-size: 13px; color: #555; display: block; line-height: 1.5;">${totalIndia} members across 23+ states</span>
          </div>
        `);
        mapObjectsRef.current.markers.push(indiaMarker);

        intlContinents.forEach((cont, idx) => {
          const marker = L.marker([cont.lat, cont.lng], {
            icon: createBadgeIcon(cont.count, cont.name, 'continent', idx)
          }).addTo(mapInstance);

          marker.bindPopup(`
            <div style="font-family: sans-serif; padding: 4px;">
              <strong style="display: block; font-size: 14px; margin-bottom: 6px; color: #1a1a1a;">${cont.name}</strong>
              <span style="font-size: 13px; color: #555; display: block; line-height: 1.5;">${cont.content}</span>
            </div>
          `);

          mapObjectsRef.current.markers.push(marker);
        });
      }
    } else {
      // Draw City view
      const data = indiaData[selectedState];
      if (data) {
        mapInstance.flyTo([data.lat, data.lng], 6.5, { duration: 1.5 });

        let citiesToRender = data.cities;

        // If > 8 cities and not explicitly showing all, filter to count >= 3
        if (data.cities.length > 8 && !showAllCities) {
          citiesToRender = data.cities.filter(c => c.count >= 3);
        }

        citiesToRender.forEach((city, index) => {
          // Scatter lightly to prevent perfect overlaps
          const scatterLat = data.lat + (Math.sin(index) * 0.5) * (Math.random() + 0.3);
          const scatterLng = data.lng + (Math.cos(index) * 0.5) * (Math.random() + 0.3);

          const marker = L.marker([scatterLat, scatterLng], {
            icon: createBadgeIcon(city.count, city.name.split('/')[0], 'city', index)
          }).addTo(mapInstance);

          marker.bindPopup(`
            <div style="text-align: center; font-family: sans-serif; padding: 4px;">
              <strong style="display: block; font-size: 14px; margin-bottom: 4px; color: #3a3a3a;">${city.name}</strong>
              <span style="font-size: 13px; color: #555;">${city.count} members</span>
            </div>
          `);

          mapObjectsRef.current.markers.push(marker);
        });
      }
    }

  }, [mapInstance, selectedState, showIntl, showAllCities]);

  return (
    <div className="w-full">
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-[420px] md:h-[620px] bg-[#faf5f0] z-0 overflow-hidden"
          style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
        />

        {selectedState && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] flex gap-2">
            <button
              onClick={() => setSelectedState(null)}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition hover:bg-gray-50 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" /> Back to India View
            </button>
          </div>
        )}

        {/* International Toggle overlay */}
        {!selectedState && (
          <div className="absolute top-4 right-4 z-[400]">
            <button
              onClick={() => setShowIntl(!showIntl)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border shadow-sm transition ${showIntl
                ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800'
                : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                }`}
            >
              🌍 International
            </button>
          </div>
        )}
      </div>

      {selectedState && (
        <div className="mt-6 flex flex-col items-center gap-3">
          {indiaData[selectedState].cities.length > 8 && (
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline"
            >
              {showAllCities ? "Show fewer cities" : `Show all ${indiaData[selectedState].cities.length} cities`}
            </button>
          )}
          <button
            onClick={() => setSelectedState(null)}
            className="flex items-center gap-2 rounded-full bg-gray-900 text-white px-6 py-2.5 text-sm font-semibold shadow-md transition hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All States
          </button>
        </div>
      )}

      <style>{`
        .leaflet-container { font-family: inherit; }
        .leaflet-popup-content-wrapper { border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #eee; }
        .leaflet-popup-content { margin: 8px 12px; }
      `}</style>
    </div>
  );
}
