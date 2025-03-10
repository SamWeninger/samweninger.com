import React, { useEffect, useState } from 'react';
import './ViewCountPopup.css';
import eyeIcon from './eyeIcon.png';

const ViewCountPopup = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch('https://samweninger.goatcounter.com/counter//.json');
        const data = await response.json();
        setViewCount(data.count);
      } catch (error) {
        console.error('Error fetching view count:', error);
      }
    };

    fetchViewCount();
  }, []);

  if (!isVisible || viewCount === null) return null;

  return (
    <div className="view-count-popup">
      <img src={eyeIcon} alt="Eye Icon" className="eye-icon" />
      <span>{viewCount}</span>
      <button className="close-button" onClick={() => setIsVisible(false)}>x</button>
    </div>
  );
};

export default ViewCountPopup; 