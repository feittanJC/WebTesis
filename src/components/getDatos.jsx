import { useState, useEffect } from 'react'

export default function useApiData(apiUrl) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl);
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [apiUrl]);  // La dependencia aquí asegura que useEffect se ejecute solo cuando cambia la URL de la API
  
    return { data, loading, error };
  }
  