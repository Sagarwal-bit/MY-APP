import './Dashboard.css';

export function Dashboard({ destination, country, userName, placeDetails }) {
  return (
    <div className="p-4 bg-secondary min-vh-100">
      <h1 className="h4 fw-bold mb-4">
        Hello {userName || 'Traveler'}! Ready for the trip?
      </h1>
      <div className="mb-4">
        <h2 className="h5 fw-semibold">Your Upcoming Trip</h2>
        <div className="card bg-dark text-white border-dark mt-2">
          <div className="card-body">
            <h3 className="card-title h6 fw-bold">
              {destination && country
                ? `${destination}, ${country}`
                : destination || 'No destination selected'}
            </h3>
            <p className="card-text">
              {placeDetails?.description?.includes('No detailed information')
                ? `We couldn't find details for "${destination}" in ${country}. Please try a different destination, such as ${
                    country.toLowerCase() === 'india'
                      ? 'Delhi or Mumbai'
                      : country.toLowerCase() === 'australia'
                      ? 'Sydney or Melbourne'
                      : 'Tokyo or Kyoto'
                  }.`
                : placeDetails?.description || 'No description available.'}
            </p>
            <p className="card-text">
              Weather: {placeDetails?.weather || 'Not available'}
            </p>
            <p className="card-text">
              Currency: {placeDetails?.currency || 'Not available'}
            </p>
            <p className="card-text">
              Flight Details: {placeDetails?.flightDetails || 'Not available'}
            </p>
            <p className="card-text">
              Accommodation: {placeDetails?.accommodation || 'Not available'}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="h5 fw-semibold">Attractions</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
          {placeDetails && placeDetails.attractions?.length > 0 ? (
            placeDetails.attractions.map((attraction, index) => (
              <div key={index} className="col">
                <div className="card bg-dark text-white border-dark">
                  <div className="card-body">
                    <h3 className="card-title fw-bold">{attraction}</h3>
                    <p className="card-text">Day {index + 1}: Dec 0{index + 1}, 2025</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No attractions available for this destination.</p>
          )}
        </div>
      </div>
    </div>
  );
}