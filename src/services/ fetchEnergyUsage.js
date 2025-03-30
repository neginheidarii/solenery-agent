
// Importing the necessary environment variables
const API_URL = "https://apis.wattbuy.com/v3/electricity/estimation";
const API_KEY = import.meta.env.VITE_UTILITY_RATE_KEY;

const fetchEnergyUsage = async (address, city, state, zip) => {
    try {
        const response = await fetch(
            // Constructing the API URL with query parameters
            `${API_URL}?address=${address}&city=${city}&state=${state}&zip=${zip}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "x-api-key": API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching energy usage:", error);
        return null;
    }
};

export default fetchEnergyUsage;
