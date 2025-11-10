import { Link } from 'react-router-dom';

const ErrorState = ({ message }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{message}</h2>
      <Link to="/restaurants" className="btn-primary">
        Back to Restaurants
      </Link>
    </div>
  </div>
);

export default ErrorState;