// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Container, Grid, Box, Avatar, Typography, Button, Paper, Stack } from "@mui/material";
// import Webcam from "react-webcam";
// import Header from "../component/Header";
// import bot_logo from "../../../public/bot_logo.svg";
// import InterviewContext from "../../contexts/InterviewContext";
// import { db } from "../../../util/db";
// import { MockInterview } from "../../../util/schema";
// import { eq } from "drizzle-orm";
// import { useNavigate } from "react-router-dom";
// import { json } from "drizzle-orm/gel-core";
// import { set } from "date-fns";
// function InterviewPage() {
//  const { cameraOn, setCameraOn, currentInterview, setCurrentInterview } = useContext(InterviewContext);
//    const webcamRef = useRef(null);
//   const [interviewData, setInterview] = useState(null);
//   const [questions, setQuestions] = useState(null); 
//   const navigate = useNavigate();


//   const getInterview = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, currentInterview));
//     // console.log(result);
//     const jsonMockResp = JSON.parse(result[0].jsonMockResp);
//     console.log(jsonMockResp);

//     setInterview(result[0]);
//     setQuestions(jsonMockResp);





//   };
// useEffect(() => {
//   console.log("questions:", questions);
// }, [questions]);

// useEffect(() => {
//   getInterview();
//   return () => {
//     if (webcamRef.current && webcamRef.current.stream) {
//       webcamRef.current.stream.getTracks().forEach(track => track.stop());
//     }
//     console.log(currentInterview);


//   };
// }, []);

//   return (
//     <Container maxWidth="xl" disableGutters>
//       <Header />
//       <Box
//         sx={{
//           flexGrow: 1,
//           height: '75vh',
//           bgcolor: '#0000',
//           color: '#ffff',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Grid container sx={{ height: '90%', maxWidth: '1400px', boxShadow: 0 }}>

//           {/* ===== Left Panel ===== */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               p: 4,
//               borderRight: '1px solid #333',
//               height: '100%', // Ensure full height
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             <Stack alignItems="center" spacing={3} sx={{ flexGrow: 1, minHeight: 0 }}>


//               {/* Scrollable Bot Responses */}
//             <Box
//   sx={{
//     width: '100%',
//     flexGrow: 1,
//     overflowY: 'auto',
//     pr: 1,
//   }}
// >
//   <Stack spacing={2} sx={{ width: '100%' }}>
//     {/* Greeting Message */}
//     <Stack direction="row" spacing={2} alignItems="flex-start">
//       <Avatar
//         alt="Logo"
//         src={bot_logo}
//         sx={{ width: 30, height: 30 }}
//         imgProps={{ style: { objectFit: 'contain' } }}
//       />
//       <Paper
//         elevation={3}
//         sx={{
//           p: 1.5,
//           bgcolor: '#1e1e1e',
//           color: '#fff',
//           borderRadius: 2,
//           wordWrap: 'break-word',
//           overflowWrap: 'break-word',
//           width: '100%',
//           maxWidth: '500px',
//         }}
//       >
//         <Typography variant="body2">
//           Hi! Thanks for joining. Let's begin the interview.
//         </Typography>
//       </Paper>
//     </Stack>

//     {/* Questions and Answers */}
//     {questions.map((item, i) => (
//       <React.Fragment key={i}>
//         {/* Bot question */}
//         <Stack direction="row" spacing={2} alignItems="flex-start">
//           <Avatar
//             alt="Logo"
//             src={bot_logo}
//             sx={{ width: 30, height: 30 }}
//             imgProps={{ style: { objectFit: 'contain' } }}
//           />
//           <Paper
//             elevation={3}
//             sx={{
//               p: 1.5,
//               bgcolor: '#1e1e1e',
//               color: '#fff',
//               borderRadius: 2,
//               wordWrap: 'break-word',
//               overflowWrap: 'break-word',
//               width: '100%',
//               maxWidth: '500px',
//             }}
//           >
//             <Typography variant="body2">{item.question}</Typography>
//           </Paper>
//         </Stack>



//       </React.Fragment>
//     ))}

//      <Stack direction="row" spacing={2} alignItems="flex-start">
//       <Avatar
//         alt="Logo"
//         src={bot_logo}
//         sx={{ width: 30, height: 30 }}
//         imgProps={{ style: { objectFit: 'contain' } }}
//       />
//       <Paper
//         elevation={3}
//         sx={{
//           p: 1.5,
//           bgcolor: '#1e1e1e',
//           color: '#fff',
//           borderRadius: 2,
//           wordWrap: 'break-word',
//           overflowWrap: 'break-word',
//           width: '100%',
//           maxWidth: '500px',
//         }}
//       >
//         <Typography variant="body2">
//           Thanks for your time. That concludes the interview. Have a great day!
//         </Typography>
//       </Paper>
//     </Stack>

//   </Stack>
// </Box>
















//             </Stack>
//           </Grid>

//           {/* ===== Right Panel ===== */}
//           <Grid item xs={12} md={6} sx={{ p: 4 }}>
//             <Stack spacing={4} alignItems="center">
//               {/* Webcam Circle */}
//               <Box
//                 sx={{
//                   width: 200,
//                   height: 200,
//                   borderRadius: '50%',
//                   overflow: 'hidden',
//                   border: '2px solid #8b5cf6',
//                 }}
//               >
//                 {cameraOn ? (
//                   <Webcam
//                   mirrored={true}
//                     audio={true}

//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={{
//                       width: 200,
//                       height: 200,
//                       facingMode: 'user',
//                     }}
//                     style={{ width: '100%', height: '100%' }}
//                   />
//                 ) : (
//                   <Box
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       bgcolor: '#111',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Typography variant="caption" sx={{ color: '#8b5cf6' }}>
//                       Camera Off
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//                 <Box>

//                   <Typography>  Job Role : {interviewData?.jobPosition}</Typography>
//                   <Typography>  Year of Experience :  {interviewData?.jobExperience}</Typography>


//                 </Box>
//               {/* Camera Toggle Buttons */}
//               <Stack direction="row" spacing={2}>


//                 <Button
//                 onClick={()=>{navigate(`/dashboard`)}}
//                   variant="outlined"
//                   sx={{
//                     borderColor: '#8b5cf6',
//                     color: '#8b5cf6',
//                     borderRadius: 2,
//                     px: 3,
//                     '&:hover': {
//                       borderColor: '#7c3aed',
//                       color: '#7c3aed',
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </Stack>


//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>

//   );
// }

// export default InterviewPage;






















// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Container, Grid, Box, Avatar, Typography, Button, Paper, Stack } from "@mui/material";
// import Webcam from "react-webcam";
// import Header from "../component/Header";
// import bot_logo from "../../../public/bot_logo.svg";
// import InterviewContext from "../../contexts/InterviewContext";
// import { db } from "../../../util/db";
// import { MockInterview } from "../../../util/schema";
// import { eq } from "drizzle-orm";
// import { useNavigate } from "react-router-dom";
// import { BsFillRecordCircleFill } from "react-icons/bs";
// import useSpeechToText from "react-hook-speech-to-text";  // Importing the speech-to-text hook
// import { FaMicrophone } from "react-icons/fa";






// function InterviewPage() {
//   const { cameraOn, setCameraOn, currentInterview, setCurrentInterview } = useContext(InterviewContext);
//   const webcamRef = useRef(null);
//   const [interviewData, setInterview] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const navigate = useNavigate();
//   const [userAnswer, setUserAnswer] = useState('');





//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false
//   });


//   // useEffect(() => {
//   //   console.log("Speech Recognition Error:", error);
//   // }, [error]);


//  useEffect(() => {
//   results.map((result) => {
//     setUserAnswer(prevAns => prevAns + result?.transcript);
//   });
// }, [results]);


//   // useEffect(() => {
//   //   console.log("Speech Results:", results);
//   //   console.log("Interim Result:", interimResult);
//   //   console.log("Is Recording:", isRecording);
//   // }, [results, interimResult, isRecording]);


//   const getInterview = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, currentInterview));

//     const jsonMockResp = JSON.parse(result[0].jsonMockResp);
//     setInterview(result[0]);
//     setQuestions(jsonMockResp);
//   };

//   useEffect(() => {
//     getInterview();
//     return () => {
//       if (webcamRef.current && webcamRef.current.stream) {
//         webcamRef.current.stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);


//   return (
//     <Container maxWidth="xl" disableGutters>
//       <Header />
//       <Box
//         sx={{
//           flexGrow: 1,
//           height: '75vh',
//           bgcolor: '#0000',
//           color: '#ffff',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Grid container sx={{ height: '90%', maxWidth: '1400px', boxShadow: 0 }}>

//           {/* ===== Left Panel ===== */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               p: 4,
//               borderRight: '1px solid #333',
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//           >
//             <Stack alignItems="center" spacing={3} sx={{ flexGrow: 1, minHeight: 0 }}>
//               {/* Scrollable Bot Responses */}
//               <Box
//                 sx={{
//                   width: '100%',
//                   flexGrow: 1,
//                   overflowY: 'auto',
//                   pr: 1,
//                 }}
//               >
//                 <Stack spacing={2} sx={{ width: '100%' }}>
//                   {/* Greeting Message */}
//                   <Stack direction="row" spacing={2} alignItems="flex-start">
//                     <Avatar
//                       alt="Logo"
//                       src={bot_logo}
//                       sx={{ width: 30, height: 30 }}
//                       imgProps={{ style: { objectFit: 'contain' } }}
//                     />
//                     <Paper
//                       elevation={3}
//                       sx={{
//                         p: 1.5,
//                         bgcolor: '#1e1e1e',
//                         color: '#fff',
//                         borderRadius: 2,
//                         wordWrap: 'break-word',
//                         overflowWrap: 'break-word',
//                         width: '100%',
//                         maxWidth: '500px',
//                       }}
//                     >
//                       <Typography variant="body2">
//                         Hi! Thanks for joining. Let's begin the interview.
//                       </Typography>
//                     </Paper>
//                   </Stack>

//                   {/* Questions and Answers */}
//                   {questions.map((item, i) => (
//                     <React.Fragment key={i}>
//                       {/* Bot question */}
//                       <Stack direction="row" spacing={2} alignItems="flex-start">
//                         <Avatar
//                           alt="Logo"
//                           src={bot_logo}
//                           sx={{ width: 30, height: 30 }}
//                           imgProps={{ style: { objectFit: 'contain' } }}
//                         />
//                         <Paper
//                           elevation={3}
//                           sx={{
//                             p: 1.5,
//                             bgcolor: '#1e1e1e',
//                             color: '#fff',
//                             borderRadius: 2,
//                             wordWrap: 'break-word',
//                             overflowWrap: 'break-word',
//                             width: '100%',
//                             maxWidth: '500px',
//                           }}
//                         >
//                           <Typography variant="body2">{item.question}</Typography>
//                         </Paper>
//                       </Stack>
//                     </React.Fragment>
//                   ))}

//                   {/* Closing Message */}
//                   <Stack direction="row" spacing={2} alignItems="flex-start">
//                     <Avatar
//                       alt="Logo"
//                       src={bot_logo}
//                       sx={{ width: 30, height: 30 }}
//                       imgProps={{ style: { objectFit: 'contain' } }}
//                     />
//                     <Paper
//                       elevation={3}
//                       sx={{
//                         p: 1.5,
//                         bgcolor: '#1e1e1e',
//                         color: '#fff',
//                         borderRadius: 2,
//                         wordWrap: 'break-word',
//                         overflowWrap: 'break-word',
//                         width: '100%',
//                         maxWidth: '500px',
//                       }}
//                     >
//                       <Typography variant="body2">
//                         Thanks for your time. That concludes the interview. Have a great day!
//                       </Typography>
//                     </Paper>
//                   </Stack>
//                 </Stack>
//               </Box>
//             </Stack>
//           </Grid>

//           {/* ===== Right Panel ===== */}
//           <Grid item xs={12} md={6} sx={{ p: 4 }}>
//             <Stack spacing={4} alignItems="center">
//               {/* Webcam Circle */}
//               <Box
//                 sx={{
//                   width: 200,
//                   height: 200,
//                   borderRadius: '50%',
//                   overflow: 'hidden',
//                   border: '2px solid #8b5cf6',
//                 }}
//               >
//                 {cameraOn ? (
//                   <Webcam
//                     mirrored={true}
//                     audio={false}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={{
//                       width: 200,
//                       height: 200,
//                       facingMode: 'user',
//                     }}
//                     style={{ width: '100%', height: '100%' }}
//                   />
//                 ) : (
//                   <Box
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       bgcolor: '#111',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <Typography variant="caption" sx={{ color: '#8b5cf6' }}>
//                       Camera Off
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>

//               {/* Job Role and Experience */}
//               <Box>
//                 <Typography>Job Role : {interviewData?.jobPosition}</Typography>
//                 <Typography>Year of Experience : {interviewData?.jobExperience}</Typography>
//               </Box>

//               {/* Speech-to-Text Buttons */}

//               <Stack direction={"row"} spacing={2}>



//                 <Button
//                   variant="contained"
//                   size="medium"
//                   onClick={isRecording ? stopSpeechToText : startSpeechToText}
//                   sx={{
//                     backgroundColor: '#8b5cf6',
//                     color: 'white',
//                     borderRadius: 2,
//                     px: 2,
//                     fontSize: '14px',
//                     textTransform: 'none', // Optional: to preserve "Record" casing
//                     '&:hover': {
//                       backgroundColor: '#7c3aed',
//                     },
//                   }}
//                 >




//                   <Box display="flex" alignItems="center" gap={1}>
//                     {isRecording ? (
//                       <>
//                        <BsFillRecordCircleFill />
                      
//                         <span>Listening...</span>
//                       </>
//                     ) : (
//                       <>
//                          <FaMicrophone />
//                         <span>Record</span>
//                       </>
//                     )}
//                   </Box>




//                 </Button>











//                 {/* Cancel Button */}
//                 <Button
//                   onClick={() => {
//                     navigate(`/dashboard`);
//                   }}
//                   variant="outlined"
//                   sx={{
//                     borderColor: '#8b5cf6',
//                     color: '#8b5cf6',
//                     borderRadius: 2,
//                     px: 3,
//                     '&:hover': {
//                       borderColor: '#7c3aed',
//                       color: '#7c3aed',
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </Stack>

             
//                <div>
//       <h1>Recording: {isRecording.toString()}</h1>
//       <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
//         {isRecording ? 'Stop Recording' : 'Start Recording'}
//       </button>
//       <ul>
//         {results.map((result) => (
//           <li key={result.timestamp}>{result.transcript}</li>
//         ))}
//         {interimResult && <li>{interimResult}</li>}
//       </ul>
//     </div>
//             </Stack>

//       <Button
//                   variant="contained"
//                   size="medium"
//                   onClick={() => console.log(userAnswer)
//                   }
//                   sx={{
//                     backgroundColor: '#8b5cf6',
//                     color: 'white',
//                     borderRadius: 2,
//                     px: 2,
//                     fontSize: '14px',
//                     textTransform: 'none', // Optional: to preserve "Record" casing
//                     '&:hover': {
//                       backgroundColor: '#7c3aed',
//                     },
//                   }}
//                 >
                  
//                   Show Answer
// </Button>





//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }

// export default InterviewPage;

 import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Container, Grid, Box, Avatar, Typography, Button, Paper, Stack, CircularProgress
} from "@mui/material";
import Webcam from "react-webcam";
import Header from "../component/Header";
import bot_logo from "../../../public/bot_logo.svg";
import InterviewContext from "../../contexts/InterviewContext";
import { db } from "../../../util/db";
import { MockInterview, UserAnswers } from "../../../util/schema";
import { eq } from "drizzle-orm";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import useSpeechToText from "react-hook-speech-to-text";
import { ToastContainer, toast } from 'react-toastify';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useUser } from "@clerk/clerk-react";




const api = import.meta.env.VITE_GEMINI_API;

const genAI = new GoogleGenerativeAI(api);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1.2,
    topK: 40,
    topP: 0.9,
  },
});

class ShuffleCycler {
  constructor(items) {
    this.items = [...items];
    this.currentIndex = 0;
    this.shuffle();
  }
  shuffle() {
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
  }
  next() {
    if (this.currentIndex >= this.items.length) {
      this.currentIndex = 0;
      this.shuffle();
    }
    return this.items[this.currentIndex++];
  }
}

const preLineCycler = new ShuffleCycler([
  "Alright, next one.",
  "Here's another question for you.",
  "Okay, let's move on.",
  "This one's interesting.",
  "Let me ask you this.",
  "Let's keep it going.",
  "Hope you're ready for the next one.",
  "Moving forward, tell me this.",
  "Now, consider this.",
  "What about this one?"
]);

const reactionCycler = new ShuffleCycler([
  "Yeah, that's a good point.",
  "Nice explanation.",
  "Sounds like you’ve handled that well.",
  "I see, that makes sense.",
  "Interesting perspective.",
  "Thanks for sharing that.",
  "That's a valuable insight.",
  "Great, appreciate your input.",
  "You explained that clearly.",
  "That helps me understand better."
]);

function InterviewPage() {
  const { cameraOn, currentInterview } = useContext(InterviewContext);
  const webcamRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);
  const [interviewData, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [tempAnswer, setTempAnswer] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasConcluded, setHasConcluded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
    const { isSignedIn, user } = useUser();
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  function cleanJsonString(text) {
    let cleaned = text.replace(/```(json)?/g, "").trim();
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1) {
      cleaned = cleaned.substring(firstBracket, lastBracket + 1);
    }
    return cleaned;
  }

  const deleteInterview = async () => {
    try {
      await db.delete(MockInterview).where(eq(MockInterview.mockId, currentInterview));
      navigate("/dashboard");
      toast.success("Interview ended and deleted successfully.");
    } catch (err) {
      console.error("Failed to delete interview:", err);
      toast.error("Error deleting interview. Please try again.");
    }
  };

  useEffect(() => {
    if (!isRecording) return;

    let combined = '';
    results.forEach(result => {
      combined += result?.transcript + ' ';
    });
    setTempAnswer(combined.trim());
  }, [results, isRecording]);

  useEffect(() => {
    async function fetchInterview() {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, currentInterview));
      if (result.length) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setInterview(result[0]);
        setQuestions(jsonMockResp);
        setAnswers(new Array(jsonMockResp.length).fill(''));
      }
    }
    fetchInterview();

    return () => {
      if (webcamRef.current?.stream) {
        webcamRef.current.stream.getTracks().forEach(track => track.stop());
      }
      speechSynthesisRef.current.cancel();
    };
  }, [currentInterview]);

  useEffect(() => {
    if (questions.length > 0 && !hasStarted && !hasConcluded) {
      (async () => {
        setHasStarted(true);
        setDisplayedMessages([{ type: 'greeting', text: "Hi! Thanks for joining. Let's begin the interview." }]);
        await speak("Hi! Thanks for joining. Let's begin the interview.");
        setCurrentQuestionIndex(0);
      })();
    }
  }, [questions, hasStarted, hasConcluded]);

  const speak = (text) => {
    return new Promise((resolve) => {
      const synth = speechSynthesisRef.current;
      if (!text) return resolve();

      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => { setIsSpeaking(false); resolve(); };
      utterance.onerror = () => { setIsSpeaking(false); resolve(); };

      synth.speak(utterance);
    });
  };

  useEffect(() => {
    async function handleQuestionChange() {
      if (currentQuestionIndex === -1 || currentQuestionIndex >= questions.length || hasConcluded) {
        return;
      }

      const preLine = currentQuestionIndex === 0 ? "Here is the first question:" : preLineCycler.next();
      const questionText = `${preLine} ${questions[currentQuestionIndex].question}`;
      setDisplayedMessages(prev => [...prev, { type: 'question', text: questionText, question: questions[currentQuestionIndex].question }]);
      await speak(questionText);
    }
    handleQuestionChange();
  }, [currentQuestionIndex, questions, hasConcluded]);

  useEffect(() => {
    if (!isRecording && hasStarted && tempAnswer.trim()) {
      if (tempAnswer.trim().length < 10) {
        // toast.warn("Answer too short, please try again or check your mic");
        setTempAnswer('');
        return;
      }
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = tempAnswer.trim();
      setAnswers(updatedAnswers);
      setTempAnswer('');
    }
  }, [isRecording, tempAnswer, currentQuestionIndex, answers, hasStarted]);

  const toggleRecording = () => {
    if (isSpeaking) {
      toast.info("Please wait, bot is speaking.");
      return;
    }
    if (isRecording) {
      stopSpeechToText();
      // if (tempAnswer.length < 10) {
      //   toast.warn("Answer too short, please try again or check your mic");
      // }
    } else {
      setTempAnswer('');
      startSpeechToText();
    }
  };

  const nextQuestion = async () => {
    if (isSpeaking) {
      toast.info("Please wait, bot is speaking.");
      return;
    }
    if (!answers[currentQuestionIndex]) {
      toast.warn("Please record and save your answer first.");
      return;
    }
    const reaction = reactionCycler.next();
    setDisplayedMessages(prev => [...prev, { type: 'reaction', text: reaction }]);
    await speak(reaction);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const conclusionText = "Thanks for your time. That concludes the interview. Have a great day!";
      setDisplayedMessages(prev => [...prev, { type: 'closing', text: conclusionText }]);
      await speak(conclusionText); // Wait for conclusion to finish speaking
      setHasConcluded(true);
      setIsLoading(true); // Set loading state after conclusion is spoken

      let prompt = 
        "Please evaluate the following interview answers. For each question, rate the user's response on a scale from 1 to 10 and provide constructive feedback on how they could improve.\n\n";

      questions.forEach((q, idx) => {
        const userAnswer = answers[idx] || "No answer provided";
        prompt += `Question ${idx + 1}: ${q.question}\n`;
        prompt += `Answer: ${userAnswer}\n`;
        prompt += `Rating (1-10):\n`;
        prompt += `Feedback:\n\n`;
      });

      prompt += "Please provide detailed, clear, and encouraging feedback for each answer, focusing on clarity, relevance, and completeness. And area of improvement if any in just 2 to 3 lines in Json format with rating field, feedback and question number field all the details should be on those field and overall an array consists of json with the required fields. Make sure you ignore the repeated answer if it is present.";

      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanText = cleanJsonString(text);
        const jsonData = JSON.parse(cleanText);

        const resp = await db.insert(UserAnswers).values({
          mockIdRef: currentInterview,
          question: JSON.stringify(questions),
          feedback: JSON.stringify(jsonData),
          createdBy:  user.emailAddresses[0].emailAddress,
        });

        console.log(resp);
        
        if (resp) {
          navigate(`/interview/${currentInterview}/feedback`);
        } else {
          console.log("Error saving");
          toast.error("Error saving feedback. Please try again.");
        }
      } catch (err) {
        console.error("Error generating feedback:", err);
        toast.error("Error generating feedback. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const showAnswers = () => {
    console.log("User Answers:", answers);
    toast.success("Answers logged in console.");
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Header />
      <Box sx={{ flexGrow: 1, height: '75vh', bgcolor: '#0000', color: '#ffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CircularProgress sx={{ color: '#8b5cf6' }} />
            <Typography sx={{ mt: 2, color: '#fff' }}>Wait... Redirecting to Feedback</Typography>
          </Box>
        ) : (
          <Grid container sx={{ height: '90%', maxWidth: '1400px' }}>
            <Grid item xs={12} md={6} sx={{ p: 4, borderRight: '1px solid #333', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Stack alignItems="center" spacing={3} sx={{ flexGrow: 1, minHeight: 0 }}>
                <Box sx={{ width: '100%', flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                  <Stack spacing={2} sx={{ width: '100%' }}>
                    {displayedMessages.map((message, index) => (
                      <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                        <Avatar alt="Logo" src={bot_logo} sx={{ width: 30, height: 30 }} imgProps={{ style: { objectFit: 'contain' } }} />
                        <Paper elevation={3} sx={{ p: 1.5, bgcolor: '#1e1e1e', color: '#fff', borderRadius: 2, width: '100%', maxWidth: '500px' }}>
                          <Typography variant="body2">
                            {message.type === 'question' ? message.question : message.text}
                          </Typography>
                        </Paper>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6} sx={{ p: 4 }}>
              <Stack spacing={4} alignItems="center">
                <Box sx={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', border: '2px solid #8b5cf6' }}>
                  {cameraOn ? (
                    <Webcam
                      mirrored={true}
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{ facingMode: "user" }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box sx={{ width: '100%', height: '100%', bgcolor: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', padding: 2 }}>
                      Camera Off
                    </Box>
                  )}
                </Box>

                <Button
                  variant={isRecording ? "contained" : "outlined"}
                  color={isRecording ? "error" : "primary"}
                  startIcon={<FaMicrophone />}
                  onClick={toggleRecording}
                  disabled={isSpeaking}
                  sx={{ borderRadius: 4, px: 4 }}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={nextQuestion}
                    disabled={isSpeaking || !answers[currentQuestionIndex] || currentQuestionIndex >= questions.length}
                    sx={{ borderRadius: 4, px: 4 }}
                  >
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
                  </Button>

                  <Button
                    variant="contained"
                    onClick={deleteInterview}
                    sx={{ borderRadius: 4, px: 4, bgcolor: 'red', color: 'white', '&:hover': { bgcolor: '#c62828' } }}
                  >
                    End
                  </Button>
                </Stack>

                <Button
                  variant="outlined"
                  onClick={showAnswers}
                  sx={{ borderRadius: 4, px: 4 }}
                >
                  Show Answers
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
}

export default InterviewPage;