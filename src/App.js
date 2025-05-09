import { useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { fetchPlaceDetails } from './context/placeUtils';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [destination, setDestination] = useState('');
  const [country, setCountry] = useState('');
  const [userName, setUserName] = useState('');
  const [placeDetails, setPlaceDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async (country, destination, name) => {
    if (!country.trim() || !destination.trim() || !name.trim()) {
      alert('Please enter your name, select a country, and enter a destination before continuing.');
      return;
    }

    setLoading(true);
    setCountry(country);
    setDestination(destination);
    setUserName(name);

    try {
      const details = await fetchPlaceDetails(country, destination);
      setPlaceDetails(details);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Error fetching place details:', error);
      setPlaceDetails({
        description: 'Unable to fetch details at this time.',
        attractions: [],
        weather: 'Not available',
        currency: 'Not available',
        flightDetails: 'Flight details not available',
        accommodation: 'Accommodation details not available',
      });
      setCurrentPage('dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}>
        <Navbar theme={theme} setTheme={setTheme} />
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading place details...</p>
          </div>
        ) : currentPage === 'onboarding' ? (
          <Onboarding onContinue={handleContinue} />
        ) : (
          <Dashboard
            destination={destination}
            country={country} // Pass country to Dashboard
            userName={userName}
            placeDetails={placeDetails}
          />
        )}
        <button
          onClick={() => setCurrentPage(currentPage === 'onboarding' ? 'dashboard' : 'onboarding')}
          className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle"
          style={{ padding: '10px 20px' }}
        >
          {currentPage === 'onboarding' ? 'Go to Dashboard' : 'Go to Onboarding'}
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;