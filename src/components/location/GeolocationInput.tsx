import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

type GeoLocationInputProps = {
  onGeoLocationChange: (location: string) => void;
};

const GeoLocationInput = ({ onGeoLocationChange }: GeoLocationInputProps) => {
  const [coordinates, setCoordinates] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCoordinates = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const geoLocationString = `${latitude}, ${longitude}`;

          setCoordinates(geoLocationString);
          onGeoLocationChange(geoLocationString);
          try {
            const response = await fetch(
              `  https://api.maptiler.com/geocoding/reverse.json?lat=${latitude}&lon=${longitude}&key=l9gXBSMsOfVFUnvd7Hh6`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.features?.length > 0) {
              setCoordinates(`Coordinates: ${geoLocationString}`);
            } else {
              setCoordinates(`Coordinates: ${geoLocationString}`);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setError("Error fetching address. Try again later.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Error getting location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
      setLoading(false);
    }
  };

  return (
    <div>
      <TextField
        label="Coordinates"
        value={coordinates}
        onChange={(e) => setCoordinates(e.target.value)}
        variant="outlined"
        fullWidth
        disabled={loading}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetCoordinates}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Coordinates"}
      </Button>

      {error && (
        <Typography color="error" variant="body2" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
    </div>
  );
};
export default GeoLocationInput;
