import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "\nGenerate Travel Plan for Location: Las Vegas, for 3 Days for Couple with mode of transport as car,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with mode of transport as car,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Bellagio\",\n      \"hotelAddress\": \"3600 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": {\n        \"min\": 200,\n        \"max\": 500\n      },\n      \"hotelImageUrl\": \"https://example.com/bellagio.jpg\", \n      \"geoCoordinates\": {\n        \"latitude\": 36.1146,\n        \"longitude\": -115.1729\n      },\n      \"rating\": 4.5,\n      \"description\": \"Luxury hotel with iconic fountains and fine dining.\"\n    },\n    {\n      \"hotelName\": \"The Venetian Resort Las Vegas\",\n      \"hotelAddress\": \"3355 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": {\n        \"min\": 180,\n        \"max\": 450\n      },\n      \"hotelImageUrl\": \"https://example.com/venetian.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1215,\n        \"longitude\": -115.1726\n      },\n      \"rating\": 4.6,\n      \"description\": \"Opulent resort themed after Venice, Italy, with canals and gondolas.\"\n    },\n    {\n      \"hotelName\": \"The Cosmopolitan of Las Vegas\",\n      \"hotelAddress\": \"3708 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": {\n        \"min\": 150,\n        \"max\": 350\n      },\n      \"hotelImageUrl\": \"https://example.com/cosmopolitan.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1155,\n        \"longitude\": -115.1719\n      },\n      \"rating\": 4.4,\n      \"description\": \"Stylish and modern hotel with a vibrant atmosphere and trendy restaurants.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"plan\": [\n        {\n          \"placeName\": \"High Roller Observation Wheel\",\n          \"placeDetails\": \"Enjoy breathtaking views of the Las Vegas Strip.\",\n          \"placeImageUrl\": \"https://example.com/highroller.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.115,\n            \"longitude\": -115.1716\n          },\n          \"ticketPricing\": 30,\n          \"rating\": 4.8,\n          \"timeToVisit\": \"Late afternoon for sunset views (approx. 2 hours)\"\n        },\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"Watch the mesmerizing synchronized water, music, and light show.\",\n          \"placeImageUrl\": \"https://example.com/bellagiofountains.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1147,\n            \"longitude\": -115.173\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.9,\n          \"timeToVisit\": \"Evening (allow 1 hour for multiple shows)\"\n        },\n        {\n          \"placeName\": \"Dinner at a Fine Dining Restaurant\",\n          \"placeDetails\": \"Choose from various upscale restaurants on the Strip.\",\n          \"placeImageUrl\": \"https://example.com/restaurant.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": null, \n            \"longitude\": null\n          },\n          \"ticketPricing\": \"Varies\",\n          \"rating\": null,\n          \"timeToVisit\": \"8:00 PM onwards\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Grand Canyon National Park (West Rim)\",\n          \"placeDetails\": \"Take a day trip to the breathtaking Grand Canyon (requires a car).\",\n          \"placeImageUrl\": \"https://example.com/grandcanyon.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0544,\n            \"longitude\": -114.0708\n          },\n          \"ticketPricing\": \"Varies depending on tour chosen\",\n          \"rating\": 5,\n          \"timeToVisit\": \"Early morning to mid-afternoon (6-8 hours trip including travel time)\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Seven Magic Mountains\",\n          \"placeDetails\": \"Visit this colorful art installation south of Las Vegas.\",\n          \"placeImageUrl\": \"https://example.com/sevenmagicmountains.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.0604,\n            \"longitude\": -114.9938\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeToVisit\": \"Morning (1-2 hours)\"\n        },\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Experience the vibrant atmosphere of Downtown Las Vegas.\",\n          \"placeImageUrl\": \"https://example.com/fremontstreet.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1699,\n            \"longitude\": -115.1398\n          },\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.2,\n          \"timeToVisit\": \"Late afternoon/early evening (2-3 hours)\"\n        },\n        {\n          \"placeName\": \"Pool time at your hotel or a dayclub\",\n          \"placeDetails\": \"Relax and enjoy the Las Vegas sunshine.\",\n          \"placeImageUrl\": \"https://example.com/pool.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": null, \n            \"longitude\": null\n          },\n          \"ticketPricing\": \"Varies, many hotels include pool access\",\n          \"rating\": null,\n          \"timeToVisit\": \"Midday\"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Note:**  This JSON uses placeholder URLs for images. You'll need to replace these with actual image URLs.  Prices are estimates and can vary greatly depending on the season and availability.  Travel times are estimates and may be affected by traffic.  Consider using a mapping service to get accurate travel times on the day of your trip.  Always check official websites for the most up-to-date pricing and information.\n"},
          ],
        },
      ],
    });
  

    export const sendMessage = async (prompt) => {
      const response = await chatSession.sendMessage({ text: prompt });
      return response; // Adjust as needed based on API response structure
  };


