import React, { useState } from 'react';
import { createContext } from "react";
import InterviewContext from './InterviewContext';

const InterviewProvider = ({children}) => {
    const [currentInterview, setCurrentInterview] = useState(null);
    const [cameraOn, setCameraOn] = useState(false); // Manage the cameraOn state
  return (
     <InterviewContext.Provider value={{ currentInterview, setCurrentInterview, cameraOn, setCameraOn }}>
      {children}
    </InterviewContext.Provider>
  )
}

export default InterviewProvider
