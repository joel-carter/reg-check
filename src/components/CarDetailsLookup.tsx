import { useState } from 'react';

const CarDetailsLookup: React.FC = () => {
  const [carReg, setCarReg] = useState('');
  const [carData, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarReg(event.target.value.toUpperCase()); // Convert input to uppercase
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setCarData(null);

    const apiUrl = 'https://uat.driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';
    const apiKey = 'nFt3U5myDA34LcczTgx4s50zBp7vIDRQ9a95w8Dp'; // Replace with env variable

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ registrationNumber: carReg }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch car data');
      }

      const data = await response.json();
      setCarData(data);
    } catch (error) {
      setError('Failed to retrieve car details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateCarAge = (yearOfManufacture: number) => {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfManufacture;
  };

  return (
    <div>
      <h1>Car Details Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Car Registration"
          value={carReg}
          onChange={handleRegChange}
          maxLength={10}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Car Details'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {carData && !loading && (
        <div>
          <h2>Car Details</h2>
          <p><strong>Registration:</strong> {carData.registrationNumber}</p>
          <p><strong>Make:</strong> {carData.make}</p>
          <p><strong>Colour:</strong> {carData.colour}</p>
          <p><strong>Fuel Type:</strong> {carData.fuelType}</p>
          <p><strong>Engine Capacity:</strong> {carData.engineCapacity} cc</p>
          <p><strong>CO2 Emissions:</strong> {carData.co2Emissions} g/km</p>
          <p><strong>Type Approval:</strong> {carData.typeApproval}</p>
          <p><strong>Year of Manufacture:</strong> {carData.yearOfManufacture}</p>
          <p><strong>Car Age:</strong> {calculateCarAge(carData.yearOfManufacture)} years</p>
          <p><strong>MOT Status:</strong> {carData.motStatus}</p>
          <p><strong>MOT Expiry Date:</strong> {carData.motExpiryDate}</p>
          <p><strong>Tax Status:</strong> {carData.taxStatus}</p>
          <p><strong>Tax Due Date:</strong> {carData.taxDueDate}</p>
          <p><strong>Revenue Weight:</strong> {carData.revenueWeight} kg</p>
          <p><strong>Wheelplan:</strong> {carData.wheelplan}</p>
          <p><strong>Marked for Export:</strong> {carData.markedForExport ? 'Yes' : 'No'}</p>
          <p><strong>Month of First Registration:</strong> {carData.monthOfFirstRegistration}</p>
          <p><strong>Date of Last V5C Issued:</strong> {carData.dateOfLastV5CIssued}</p>
        </div>
      )}
    </div>
  );
};

export default CarDetailsLookup;
