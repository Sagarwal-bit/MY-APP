import './Navbar.css';

export function Navbar({ theme, setTheme }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand fs-4 fw-bold">Travel App</span>
        <div className="navbar-nav ms-auto">
          <button className="nav-link btn text-white">Home</button>
          <button className="nav-link btn text-white">Trips</button>
          <button className="nav-link btn text-white">Profile</button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="nav-link btn text-white"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
}