import { useState } from 'react';
import { validDestinations } from '../context/placeUtils';
import './Onboarding.css';

export function Onboarding({ onContinue }) {
  const [country, setCountry] = useState('');
  const [destination, setDestination] = useState('');
  const [userName, setUserName] = useState('');
  const [duration, setDuration] = useState('');
  const [companions, setCompanions] = useState('Solo');

  // Placeholder for destination input based on selected country
  const getDestinationPlaceholder = () => {
    if (!country) return 'Enter Destination';
    switch (country.toLowerCase()) {
      case 'india':
        return 'e.g., Delhi or Mumbai';
      case 'australia':
        return 'e.g., Sydney or Melbourne';
      case 'japan':
        return 'e.g., Tokyo or Kyoto';
      default:
        return 'Enter Destination';
    }
  };

  // Validate destination based on selected country
  const isValidDestination = () => {
    if (!country || !destination) return false;
    const countryKey = country.toLowerCase();
    const destinationKey = destination.toLowerCase().replace(/\s+/g, '');
    return validDestinations[countryKey]?.includes(destinationKey);
  };

  const handleContinue = () => {
    if (!isValidDestination()) {
      alert(
        `Please enter a valid destination for ${country}. For example: ${getDestinationPlaceholder().replace(
          'e.g., ',
          ''
        )}`
      );
      return;
    }
    onContinue(country, destination, userName);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-secondary p-4">
      <h1 className="h3 fw-bold mb-4">Plan Your Journey, Your Way!</h1>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label">What is your name?</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="form-control bg-dark text-white border-dark"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Which country would you like to visit?</label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setDestination(''); // Reset destination when country changes
            }}
            className="form-select bg-dark text-white border-dark"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Where would you like to go?</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder={getDestinationPlaceholder()}
            className="form-control bg-dark text-white border-dark"
          />
          {country && (
            <small className="form-text text-muted">
              Suggested destinations: {getDestinationPlaceholder().replace('e.g., ', '')}
            </small>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">How long will you stay?</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="form-select bg-dark text-white border-dark"
          >
            <option>Select Duration</option>
            <option>1 Night</option>
            <option>2 Nights</option>
            <option>3 Nights</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Who are you traveling with?</label>
          <div className="d-flex gap-2">
            {['Solo', 'Couple', 'Family', 'Friends'].map((option) => (
              <button
                key={option}
                onClick={() => setCompanions(option)}
                className={`btn ${companions === option ? 'btn-primary' : 'btn-secondary'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleContinue}
          className="btn btn-primary w-100"
        >
          Continue
        </button>
      </div>
    </div>
  );
}