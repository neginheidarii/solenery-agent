import axios from 'axios';

const API_KEY = import.meta.env.VITE_PROPERTY_KEY;

const fetchListingByAddress = async (address1, address2) => {
    const BASE_URL = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address1=${encodeURIComponent(address1)}&address2=${encodeURIComponent(address2)}`;

    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'apikey': API_KEY,
                'accept': 'application/json',
            },
        });

        return response.data.property || [];
    } catch (error) {
        console.error('Error fetching property by address:', error);
        throw error;
    }
};

export default fetchListingByAddress;
