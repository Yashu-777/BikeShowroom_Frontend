import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function BikeList() {
  const [bikes, setBikes] = useState([]);

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

  return (
    <div>
      <h2>Available Bikes</h2>
      <div className="row">
        {bikes.map((bike) => (
          <div className="col-md-3 mb-5" key={bike._id}>
            <div className="card">
              <img
                src={bike.imageblack}
                className="card-img-top"
                alt={bike.brand}
              />
              <div className="card-body">
                <h5 className="card-title">{bike.brand} - {bike.model}</h5>
                <p className="card-text">Price: ₹ {bike.price}</p>
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
