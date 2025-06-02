import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Layout from './dashboard/Layout';
import { Box, Grid, Paper } from '@mui/material';
import './App.css'
import InterviewPage from './dashboard/interview/InterviewPage';
import InterviewProvider from "./contexts/InterviewProvider";
import InterviewPage1 from "./dashboard/interview/InterviewPage1";

import Feedback from "./dashboard/interview/Feedback";
import Upgrade from "./dashboard/component/Upgrade";

// function CenteredAuthPage({ type }) {


//   return (
//     <Grid container sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
//       <Grid item xs={11} sm={8} md={5} lg={4}>
//         <Paper
//           sx={{
           
//           }}
//         >
//           <Box sx={{ width: '100%' }}>
//             {type === 'sign-in' ? (
//               <SignIn routing="path" path="/sign-in"  />
//             ) : (
//               <SignUp routing="path" path="/sign-up"  />
//             )}
//           </Box>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }



const darkAppearance = {
  baseTheme: "dark",
  variables: {
    colorBackground: "#0B0B0C",
    colorPrimary: "#A78BFA",
    colorText: "#EDEDED",
    colorTextSecondary: "#AAAAAA",
    colorInputBackground: "#1A1A1D",
    colorInputText: "#EDEDED",
    colorInputBorder: "#2D2D2D",
    colorAlphaShade: "#2D2D2D",
    colorDanger: "#EF4444",
    borderRadius: "8px",
  },
  elements: {
    socialButtonsBlockButton: {
      color: "#ffffff",
      "&:hover": {
        color: "#ffffff",
      },
    },
    socialButtonsBlockButtonText: {
      color: "#ffffff",
    },
    socialButtonsProvider__facebook: {
      color: "#ffffff",
      "& .cl-socialButtonsBlockButtonText": {
        color: "#ffffff",
      },
    },
    socialButtonsProvider__google: {
      color: "#ffffff",
      "& .cl-socialButtonsBlockButtonText": {
        color: "#ffffff",
      },
    },
    socialButtons: {
      "& .cl-socialButtons__button": {
        color: "#ffffff",
      },
      "& .cl-socialButtons__buttonText": {
        color: "#ffffff",
      },
    },
  },
};

function CenteredAuthPage({ type }) {
  return (
    <Grid container sx={{ height: '100vh' }} justifyContent="center" alignItems="center">
    <Grid item xs={11} sm={8} md={5} lg={4}>
      <Paper
        sx={{
         
          boxShadow: '0px 0px 20px 4px rgba(167, 139, 250, 0.25)', // Light purple glow
          backgroundColor: '#1A1A1D', // Optional: matches dark theme
          borderRadius: 3,
        }}
      >
        <Box sx={{ width: '100%' }}>
          {type === 'sign-in' ? (
            <SignIn routing="path" path="/sign-in" appearance={darkAppearance} />
          ) : (
            <SignUp routing="path" path="/sign-up" appearance={darkAppearance} />
          )}
        </Box>
      </Paper>
    </Grid>
  </Grid>
  );
}





function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Layout />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      >
  
    </Route>

    <Route path="interview/:interviewId" element={<InterviewPage1 />} />
      <Route path="interview/:interviewId/start" element={<InterviewPage />} />
        <Route path="interview/:interviewId/feedback" element={<Feedback />} />


      <Route path="/upgrade" element={<Upgrade/>}/>
      < Route path="/sign-in" element={<CenteredAuthPage type="sign-in" />} />
      <Route path="/sign-up" element={<CenteredAuthPage type="sign-up" />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    
    
    
    </Routes>
  );
}

export default App;
