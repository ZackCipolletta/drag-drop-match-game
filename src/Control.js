import React, { useState } from 'react';
import DragCard from './DragCard';
import { Grid, Paper } from '@mui/material';
import Landing from './Landing';

function Control() {
  const [showDragCard, setShowDragCard] = useState(false);

  const handleClick = () => {
    setShowDragCard(!showDragCard);
  };

  return (
    <React.Fragment>
      <div>
        Hello!
        <button onClick={handleClick} className="btn btn-primary" style={{ marginTop: "-10px" }}>
          {showDragCard ? "Return to list of products" : "Show DragCard"}
        </button>
      </div>
      {showDragCard ? <DragCard /> : <Landing />}
    </React.Fragment>
  );
}

export default Control;
