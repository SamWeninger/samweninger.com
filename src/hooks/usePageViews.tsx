
import { useState, useEffect } from 'react';

interface WindowWithGoatCounter extends Window {
  goatcounter?: {
    get_query: (type: string, callback: (data: any) => void) => void;
  };
}

declare const window: WindowWithGoatCounter;

export const usePageViews = () => {
  const [pageViews, setPageViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch('https://samweninger.goatcounter.com/counter//.json');
        const data = await response.json();
        setPageViews(data.count);
      } catch (error) {
        console.error('Error fetching view count:', error);
      }
    };

    fetchViewCount();
  }, []);

  useEffect(() => {
    // Wait for GoatCounter to load
    const checkGoatCounter = setInterval(() => {
      if (window.goatcounter?.get_query) {
        clearInterval(checkGoatCounter);
        
        // Get total page views using GoatCounter's JavaScript API
        window.goatcounter.get_query('count', (data: any) => {
          const total = data.count.reduce((sum: number, item: any) => sum + item.count, 0);
          setPageViews(total);
        });
      }
    }, 1000);

    // Cleanup interval
    return () => clearInterval(checkGoatCounter);
  }, []);

  return pageViews;
};
