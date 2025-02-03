// CarAgeLookup.tsx
import { useState } from 'react';

interface CarAgeLookupProps {
}

const CarAgeLookup: React.FC<CarAgeLookupProps> = () => {
  const [carReg, setCarReg] = useState('');
  const [carAge, setCarAge] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarReg(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Replace with the actual API URL and endpoint
      const response = await fetch(`https://api.example.com/getCarAge?reg=${carReg}`);
      const data = await response.json();

      setCarAge(data.age); 
    } catch (error) {
      setError('Failed to fetch car data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Car Age Lookup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Car Registration"
          value={carReg}
          onChange={handleRegChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Car Age'}
        </button>
      </form>

      {error && <p>{error}</p>}
      {carAge !== null && !loading && (
        <div>
          <h2>Car Age: {carAge} years</h2>
        </div>
      )}
    </div>
  );
};

export default CarAgeLookup;
