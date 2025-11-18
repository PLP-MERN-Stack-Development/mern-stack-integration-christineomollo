import { useState, useCallback } from 'react';

export function useApi() {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiFunction) => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const response = await apiFunction();
      setState({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}