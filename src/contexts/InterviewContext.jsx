
import React from 'react'
import { createContext } from "react";

const InterviewContext = createContext({
    currentInterview: null,
    setCurrentInterview: () => {},

    cameraOn: false, // Add the cameraOn state
    setCameraOn: () => {} // Add the setCameraOn function
})




export default InterviewContext
