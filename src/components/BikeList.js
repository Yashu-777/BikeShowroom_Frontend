import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function BikeList() {
  const [bikes, setBikes] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch bikes from your backend API
    axios.get('http://localhost:4000/api/bikes')
      .then((res) => {
        setBikes(res.data);
        console.log('Fetched bikes data:', res.data);
      })
      .catch((error) => {
        console.error('Error fetching bikes:', error);
      });
  }, []);


  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);

    // Perform the search and update searchResults here
    const filteredBikes = bikes.filter(
      (bike) =>
        bike.brand.toLowerCase().includes(value.toLowerCase()) ||
        bike.model.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredBikes);
  };

  const handleSelectBike = (bike) => {
    setSelectedBike(bike);
    setSearchInput(`${bike.brand} - ${bike.model}`);
    setSearchResults([]);
  };

  const handleSearchButtonClick = () => {
    // Redirect to the bike details page when the "Search" button is clicked
    if (selectedBike) {
      navigate(`/bikes/${selectedBike._id}`);
    }
  };


 return (
    <div>
      <div className="bg-image-container">
        <div className="bg-image" style={{ backgroundImage: `url('/images/bike.jpg')` }}>
          <div><h2 className="h2">RIDE THE BIKE OF YOUR DREAM!!</h2></div>
          <div className="search-container">
  <div className="input-container">
    <input
      type="text"
      placeholder="Search for a bike..."
      value={searchInput}
      onChange={handleSearchInputChange}
    />
    {searchResults.length > 0 && (
      <div className="search-results">
        <ul>
          {searchResults.map((bike) => (
            <li key={bike._id} onClick={() => handleSelectBike(bike)}>
              {bike.brand} - {bike.model}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
  <button className="search-button" onClick={handleSearchButtonClick}>
    Search
  </button>
</div>



        </div>
      </div>

      <div className="row">
        {bikes.map((bike) => (
          <div className="col-md-3" key={bike._id}>
            <div className="card">
              <img src={bike.imageblack} className="card-img-top" alt={bike.brand} />
              <div className="card-body">
                <h5 className="card-title">
                  {bike.brand} - {bike.model}
                </h5>
                <p className="card-text">Price: ${bike.price}</p>
                <Link to={`/bikes/${bike._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BikeList;
