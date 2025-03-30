import React, { useState } from "react";
import fetchListingByPostalCode from "../services/fetchListingByPostalCode";
import fetchListingByAddress from "../services/fetchListingByAddress";
import fetchEnergyUsage from "../services/ fetchEnergyUsage";

const ListingComponent = () => {
  // State variables to manage the search type, postal code, address, property details, energy usage, loading state, and error message
  const [searchType, setSearchType] = useState("postalCode");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState({ line1: "", line2: "" });
  const [property, setProperty] = useState(null);
  const [energyUsage, setEnergyUsage] = useState(null);
  const [showEnergyUsage, setShowEnergyUsage] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProperty(null);
    setEnergyUsage(null);
    setLoading(true); // Show loading indicator

    try {
      let result;
      if (searchType === "postalCode") {
        // Fetch property by postal code
        result = await fetchListingByPostalCode(postalCode);
        if (result && result.length > 0) {
          const firstProperty = result[0];

          // Fetch full details using the address
          const detailedProperty = await fetchListingByAddress(
            firstProperty.address?.line1,
            `${firstProperty.address?.locality}, ${firstProperty.address?.countrySubd}`
          );
          const selectedProperty = detailedProperty[0] || firstProperty;
          setProperty(selectedProperty);

          // Fetch Energy Usage
          const energyData = await fetchEnergyUsage(
            selectedProperty.address?.oneLine,
            selectedProperty.address?.locality,
            selectedProperty.address?.countrySubd,
            selectedProperty.address?.postal1
          );
          setEnergyUsage(energyData);
        } else {
          setError("No properties found with the given postal code.");
        }
      }
    } catch (err) {
      setError(
        "Please enter a valid US postal code (e.g., 12345) or a full address",
        err
      );
    } finally {
      setLoading(false); // Hide loading indicator after fetch
    }
  };

  // Calculate estimated number of windows based on size
  const calculateEstimatedWindows = () => {
    const totalSqFt = property?.building?.size?.universalSize || 0;
    return Math.round(totalSqFt / 200);
};


  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f1bf14] to-[#fae8b0]">
      {/* Fixed Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#f1bf14] to-[#fae8b0]"></div>
      <div className="relative z-10 overflow-auto min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6 mt-10">
          Discover Your Future Home: Search Property Details with Ease
        </h1>
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mx-auto my-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Property Search
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Radio Buttons */}
            <div className="flex gap-6 justify-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="postalCode"
                  checked={searchType === "postalCode"}
                  onChange={() => setSearchType("postalCode")}
                  className="form-radio text-blue-500"
                />
                <span className="text-gray-700">Search by Postal Code</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="address"
                  checked={searchType === "address"}
                  onChange={() => setSearchType("address")}
                  className="form-radio text-blue-500"
                />
                <span className="text-gray-700">Search by Address</span>
              </label>
            </div>

            {/* Input Fields */}
            {searchType === "postalCode" ? (
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter Postal Code"
                className="w-full sm:w-3/4 md:w-1/2 px-4 py-2 mx-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <>
                <input
                  type="text"
                  value={address.line1}
                  onChange={(e) =>
                    setAddress({ ...address, line1: e.target.value })
                  }
                  placeholder="Address Line 1 (e.g., 4529 Winona Court)"
                  className="w-full sm:w-3/4 md:w-1/2 mx-4  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  value={address.line2}
                  onChange={(e) =>
                    setAddress({ ...address, line2: e.target.value })
                  }
                  placeholder="Address Line 2 (e.g., Denver, CO)"
                  className="w-full sm:w-3/4 md:w-1/2 px-4  mx-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-1/3 bg-black text-white py-2 rounded-lg border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out mx-auto"
            >
              Search
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center mt-4">
              <div className="inline-block w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-800">Loading, please wait...</p>
            </div>
          )}

          {/* Display Property Details */}
          {property && (
            <div className="mt-6 bg-white/70 backdrop-blur-lg border border-black/10 p-6 rounded-2xl shadow-lg text-black">
              <h2 className="text-2xl font-bold text-black mb-4 border-b border-black/10 pb-2">
                🏡 Property Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg text-start  p-4 rounded-lg mt-4 text-start">
                <p>
                  <span className="font-semibold">📍 Address:</span>{" "}
                  {property.address?.oneLine}
                </p>
                <p>
                  <span className="font-semibold">🌆 City:</span>{" "}
                  {property.address?.locality}
                </p>
                <p>
                  <span className="font-semibold">🏛️ State:</span>{" "}
                  {property.address?.countrySubd}
                </p>
                <p>
                  <span className="font-semibold">📮 Postal Code:</span>{" "}
                  {property.address?.postal1}
                </p>
                <p>
                  <span className="font-semibold">🌎 Country:</span>{" "}
                  {property.address?.country}
                </p>
              </div>
              <hr />
              {/* Estimated number of windows */}
              {property?.building?.size?.universalSize && (
                <p className="mt-2 text-lg">
                  <span className="font-semibold">🪟 Estimated Windows:</span>{" "}
                  {calculateEstimatedWindows()}
                </p>
              )}
              {/* Square footage */}
              {property.building?.size?.universalSize && (
                <p className="mt-2 text-lg">
                  <span className="font-semibold">📏 Size:</span>{" "}
                  {property.building.size.universalSize} sqft
                </p>
              )}
            </div>
          )}

          {/* Button to toggle energy usage */}
          {property && (
            <button
              className="mt-4 bg-black text-white py-2 px-4 rounded-lg border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out"
              onClick={() => setShowEnergyUsage((prevState) => !prevState)}
            >
              {showEnergyUsage ? "Hide Energy Usage" : "Show Energy Usage"}
            </button>
          )}

          {/* Energy Usage Details */}
          {showEnergyUsage && energyUsage && (
            <div className="mt-6 bg-white/70 backdrop-blur-lg border border-black/10 p-6 rounded-2xl shadow-lg text-black">
              <h2 className="text-2xl font-bold text-black mb-4 border-b border-black/10 pb-2">
                ⚡ Energy Usage
              </h2>
              <div className="text-lg text-start">
                <p>
                  <span className="font-semibold">💰 Average Cost:</span> $
                  {energyUsage.avg_cost} per unit
                </p>
                <p>
                  <span className="font-semibold">🔋 Estimated Usage:</span>{" "}
                  {energyUsage.est_usage} kWh
                </p>
                <p>
                  <span className="font-semibold">
                    📆 Estimated Monthly Bills:
                  </span>{" "}
                  ${energyUsage.est_bill_amount.min} - $
                  {energyUsage.est_bill_amount.max}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingComponent;
