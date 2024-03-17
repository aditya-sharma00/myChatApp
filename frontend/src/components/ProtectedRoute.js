import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Adjust the API endpoint as needed
        setUser(response.data);
      } catch (error) {
        console.error('Authentication failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Make sure to include an empty dependency array to run the effect only once on mount

  useEffect(() => {
    if (!loading) {
      // If the user is not authenticated, redirect to the login page
      if (!user) {
        history.push('/');
      }
    }
  }, [user, loading, history]);

  if (loading) {
    // You might want to show a loading spinner while checking authentication
    return <div>Loading...</div>;
  }

  // Render the protected content if the user is authenticated
  return children;
};

export default ProtectedRoute;
