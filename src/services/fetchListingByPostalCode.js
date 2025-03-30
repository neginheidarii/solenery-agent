import axios from 'axios';

const API_KEY = import.meta.env.VITE_PROPERTY_KEY;

const fetchListingByPostalCode = async (postalCode) => {
    const BASE_URL = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=${postalCode}`;

    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'apikey': API_KEY,
                'accept': 'application/json',
            },
        });

        return response.data.property || [];
    } catch (error) {
        console.error('Error fetching property by postal code:', error);
        throw error;
    }
};

export default fetchListingByPostalCode;
