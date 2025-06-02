import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import { config } from "dotenv";
import Robot from "../../../src/Robot.svg"
import { FaRocket } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';

import { useUser } from '@clerk/clerk-react';

import css from "../../../public/css.png"
import html from "../../../public/html.png"
import js from "../../../public/js.png"
import php from "../../../public/php.png"
import { db } from '../../../util/db';
import { MockInterview } from '../../../util/schema';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { UserAnswers } from '../../../util/schema';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';

import { eq } from "drizzle-orm";


import InterviewContext from '../../contexts/InterviewContext';

const Welcome = () => {

  

    const demoData = [
    {
      id: 1,
      jobPosition: 'SDE',
      jobExperience: '2',
      question: '10',
      createdAt: '2025-05-30T10:00:00',
      feedback: 'This is the feedback for the interview of job role SDE',
    },
    {
      id: 2,
      jobPosition: 'Backend Developer',
      jobExperience: '3',
      question: '15',
      createdAt: '2025-05-29T15:30:00',
      feedback: 'This is the feedback for the interview of job role Backend Developer',
    },
    {
      id: 3,
      jobPosition: 'Full Stack Engineer',
      jobExperience: '4',
      question: '20',
      createdAt: '2025-05-28T09:15:00',
      feedback: 'This is the feedback for the interview of job role Full Stack Engineer',
    },
  ];

  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const api = import.meta.env.VITE_GEMINI_API


  const{ currentInterview, setCurrentInterview } = React.useContext(InterviewContext);


  const genAI = new GoogleGenerativeAI(api);



    const [feedbackData, setFeedbackData] = useState(null);
    const [interviewData, setInterview] = useState([]);
  
  const getFeedback = async ()=>{
    try {
      const feedbackResult = await db
      .select()
      .from(UserAnswers)
      .where(eq(UserAnswers.createdBy, user.emailAddresses[0].emailAddress))

      console.log(feedbackResult[0]);

       const interviewResult = await db
              .select()
              .from(MockInterview)
              .where(eq(MockInterview.createdBy,user.emailAddresses[0].emailAddress ));
      
       if (interviewResult.length > 0) {
       setInterview(interviewResult); 

        console.log(interviewResult);
        
      }

      if (feedbackResult.length > 0) {
        setFeedbackData(feedbackResult[0]);
        console.log(feedbackResult);
        
      }


      


    } catch (error) {
      console.error(error);

    }
  }


   useEffect(() => {
     getFeedback();
   }, []);













  function cleanJsonString(text) {
    let cleaned = text.replace(/```(json)?/g, "").trim();
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1) {
      cleaned = cleaned.substring(firstBracket, lastBracket + 1);
    }
    return cleaned;
  }

  const model = genAI.getGenerativeModel(
    {
      model: "gemini-1.5-flash",


      generationConfig: {
        temperature: 1.2,   // Increase for more variety
        topK: 40,
        topP: 0.9,
      },

    },

  );



  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    description: '',
    experience: '',
    question: '',
  });

  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [jsonResponse, setJsonResponse] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const errors = {};

    if (!formData.position.trim()) errors.position = 'Job Position is required';
    if (!formData.description.trim()) errors.description = 'Job Description is required';
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (!formData.question.trim()) errors.question = 'Number of questions is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true); // start loader

    try {
      const prompt = `
        Job position: ${formData.position}. 
        Job description: ${formData.description}. 
        Years of experience: ${formData.experience}.
        Based on this information, give me ${formData.question} technical and behavioural interview questions with answers in JSON array format.
        Each object must have fields 'question' and 'answer'.
        Ensure the total number of questions is precisely ${formData.question}, with no additional questions.
        Only return pure JSON array, no extra text or markdown.
      `;

      const result = await model.generateContent(prompt).catch((err) => {
        throw new Error(`Gemini API error: ${err.message}`);
      });

      const response = await result.response;
      const text = await response.text();

      const cleanText = cleanJsonString(text);
      const jsonData = JSON.parse(cleanText);

      setJsonResponse(cleanText);
      console.log(jsonData);

      if (cleanText) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: cleanText,
          jobPosition: formData.position,
          jobDescription: formData.description,
          jobExperience: formData.experience,
          question: formData.question,
          createdBy: user.primaryEmailAddress.emailAddress,

        }).returning({ mockId: MockInterview.mockId });
        // console.log(resp);
        
        if(resp){
          setOpen(false);
          setCurrentInterview(resp[0]?.mockId);
          navigate(`/interview/${resp[0]?.mockId}`);

          

        }



      } else {
        console.log("No response");
      }

    } catch (error) {
      console.error("Error:", error.message);
    }

    setLoading(false); // stop loader
    setFormData({
      position: '',
      description: '',
      experience: '',
      question: '',
    });
    setFormErrors({});
    handleClose();
  };


  const floatingIconStyle = (position, offset, left, color) => ({
    position: 'absolute',
    [position]: offset,
    left: left,
    transform: 'translateX(-50%)',
    width: '50px',
    backgroundColor: color,
    borderRadius: '10px',
    padding: '5px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 0,
    animation: 'vibrateFloat 6s ease-in-out infinite',
  });

  return (



    <Container>
    <Box
      sx={{
        minHeight: '20vh',
        color: 'white',
        py: 6,
        px: 2,
        borderRadius: '50px',
        marginTop: '1rem',
        background: 'linear-gradient(270deg, #0f0c29, #302b63, #24243e)',
        backgroundSize: '600% 600%',
        animation: 'gradientMove 10s ease infinite',
        '@keyframes gradientMove': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Box flex="1" minWidth="300px" pr={4}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Nail Your Next Interview Like a Pro
            </Typography>
            <Typography variant="h6" color="gray" gutterBottom>
              Train with AI, get feedback, and land your dream job.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<FaRocket />}
              onClick={handleOpen}
              sx={{
                mt: 3,
                px: 4,
                backgroundColor: '#8b5cf6',
                color: 'white',
                borderRadius: '30px',
                textTransform: 'none',
                fontWeight: 'bold',
                transition: 'transform 0.2s ease-in-out, background-color 0.2s',
                '&:hover': {
                  backgroundColor: '#7c3aed',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Start Intervu!
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth
              maxWidth="sm"
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: '#000000',
                    color: 'white',
                    border: '1px solid #8b5cf6',
                    borderRadius: 3,
                  },
                },
              }}
            >
              <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Fill the Required Details
              </DialogTitle>
              <DialogContent>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  label="Job Position (Eg:SDE)"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  error={!!formErrors.position}
                  helperText={formErrors.position}
                  variant="outlined"
                  InputProps={{ sx: { color: 'white' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  label="Job Description (Eg: Java, Python)"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  multiline
                  rows={5}
                  variant="outlined"
                  InputProps={{ sx: { color: 'white' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  label="Number of job experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  type="number"
                  error={!!formErrors.experience}
                  helperText={formErrors.experience}
                  variant="outlined"
                  InputProps={{ sx: { color: 'white' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  label="Number of question you want to practice"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  type="number"
                  error={!!formErrors.question}
                  helperText={formErrors.question}
                  variant="outlined"
                  InputProps={{ sx: { color: 'white' } }}
                  InputLabelProps={{ sx: { color: '#aaa' } }}
                />
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button onClick={handleClose} variant="outlined" sx={{ borderColor: '#8b5cf6', color: 'white' }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{ backgroundColor: '#8b5cf6', color: 'white', '&:hover': { backgroundColor: '#7c3aed' } }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
                </Button>

              </DialogActions>
            </Dialog>
          </Box>

          <Box flex="1" display="flex" justifyContent="center" alignItems="center" position="relative" minWidth="300px">
            <img
              src={Robot}
              alt="Robot"
              style={{ width: '200px', maxWidth: '100%', zIndex: 1 }}
            />
            <img src={html} alt="HTML" style={floatingIconStyle('bottom', '100px', '30%', 'orange')} />
            <img src={css} alt="CSS" style={floatingIconStyle('top', '20px', '25%', 'lightgreen')} />
            <img src={js} alt="JS" style={floatingIconStyle('bottom', '20px', '75%', 'gold')} />
            <img src={php} alt="PHP" style={floatingIconStyle('top', '100px', '80%', 'pink')} />
          </Box>
        </Box>
</Container>

      </Box>










<Container maxWidth="lg" sx={{ mt: 8 }}>





  {interviewData.length > 0 && (
          <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
            History
          </Typography>
        )}
  <Grid container spacing={4}>
    {interviewData.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          sx={{
            backgroundColor: '#121212',
            color: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #8b5cf6',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
            width: '100%',
            maxWidth: '300px',
            minWidth: '300px',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#8b5cf6',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white">
                  H
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold">
                {item.jobPosition}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: '#ccc' }} />
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                {format(new Date(item.createdAt), 'MMM d, yyyy')}
              </Typography>
              {/* <StarIcon sx={{ fontSize: 16, ml: 2, mr: 1, color: '#ccc' }} />
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                {item.question || '0'}/100
              </Typography> */}
            </Box>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontStyle: 'italic',
                color: '#ccc',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2, // Show only 2 lines
                WebkitBoxOrient: 'vertical',
              }}
            >
              {JSON.parse(item.jsonMockResp)?.[0]?.answer ||
                'This is the feedback for the interview of job role ' + item.jobPosition}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <CodeIcon sx={{ color: '#8b5cf6' }} />
                <WebIcon sx={{ color: '#8b5cf6' }} />
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  borderRadius: '20px',
                  textTransform: 'none',
                }}

                onClick={()=>{
                  navigate(`/interview/${item.mockId}/feedback`)
                }}


                
              >
                View Feedback
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>





    </Container>




  )
}

export default Welcome;