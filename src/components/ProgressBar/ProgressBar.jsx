import React from 'react';
import './ProgressBar.css';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-text">
        {current} / {total}
      </span>
    </div>
  );
}

export default ProgressBar;