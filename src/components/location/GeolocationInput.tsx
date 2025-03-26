import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

type GeoLocationInputProps = {
  onGeoLocationChange: (geoLocation: { lng: number; lat: number }) => void;
};

const GeoLocationInput: React.FC<GeoLocationInputProps> = ({
  onGeoLocationChange,
}) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleFetchCoordinates = async () => {
    if (!address) {
      setError("Please enter an address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.maptiler.com/geocode?text=${address}&key=${
          import.meta.env.VITE_MAPTILER_API_KEY
        }`
      );

      const { lng, lat } = response.data.features[0].geometry.coordinates;

      onGeoLocationChange({ lng, lat });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`Failed to fetch coordinates: ${error}`);
    }
  };

  return (
    <div>
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        value={address}
        onChange={handleAddressChange}
        error={!!error}
        helperText={error}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchCoordinates}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Coordinates"}
      </Button>
    </div>
  );
};

export default GeoLocationInput;
