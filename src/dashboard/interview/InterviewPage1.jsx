
import React, { useEffect, useState, useRef, useContext, use } from "react";
import { Container, Grid, Box, Avatar, Typography, Button, Paper, Stack } from "@mui/material";
import Webcam from "react-webcam";
import Header from "../component/Header";
import bot_logo from "../../../public/bot_logo.svg";
import InterviewContext from "../../contexts/InterviewContext";
import { db } from "../../../util/db";
import { MockInterview } from "../../../util/schema";
import { eq } from "drizzle-orm";
import { FaAnglesRight } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';


const InterviewPage1 = () => {
    const navigate = useNavigate();
    const { interviewId } = useParams(); // Get the interviewId from the URL





    const handleStartClick = () => {
        navigate(`/interview/${interviewId}/start`); // Navigate to the desired path
    };

    
 const { cameraOn, setCameraOn, currentInterview, setCurrentInterview } = useContext(InterviewContext);
    const webcamRef = useRef(null);
    const [interviewData, setInterview] = useState(null);

    const handleCameraToggle = () => {
        setCameraOn((prev) => !prev);
    };


    const getInterview = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, currentInterview));
        console.log(result);

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);


        setInterview(result[0]);
    };


    useEffect(() => {
        return () => {
            if (webcamRef.current && webcamRef.current.stream) {
                webcamRef.current.stream.getTracks().forEach(track => track.stop());
            }
            console.log(currentInterview);

            getInterview();
        };
    }, []);



    return (
        <Container maxWidth="xl" disableGutters>
            <Header />
            <Box
                sx={{
                    flexGrow: 1,
                    height: '75vh',
                    bgcolor: '#0000',
                    color: '#ffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid container sx={{ height: '90%', maxWidth: '1400px', boxShadow: 0 }}>

                    {/* ===== Left Panel ===== */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            p: 5,
                            borderRight: '1px solid #2e2e2e',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: '#121212',
                            color: '#ffffff',
                        }}
                    >
                        {/* Top Heading */}
                       <Typography
    variant="h5"
    sx={{
        fontWeight: 700,
        mb: 4,
        letterSpacing: 0.5,
        color: '#ffffff',
        backgroundColor: 'transparent', // remove background
        borderRadius: 0,
    }}
>
    Are you ready ?
</Typography>

                        {/* Job Info Box */}
 <Box
    sx={{
        p: 4,
        border: '1px solid #444',
        backgroundColor: '#181818',
        textAlign: 'left',
        fontSize: '1rem',
        lineHeight: 1.8,
        color: '#e0e0e0',
        borderRadius: 0, // no round corners
        boxShadow: '0 0 10px rgba(255,255,255,0.05)',
        maxWidth:"500px"
    }}
>
                            <Typography sx={{ fontWeight: 600 }}>
                                Position: {interviewData?.jobPosition || 'Job Role'}
                            </Typography>
                            <Typography>
                                Description: {interviewData?.jobDescription || 'No description provided.'}
                            </Typography>
                            <Typography>
                                Years of Experience: {interviewData?.jobExperience || 'Not specified'} years
                            </Typography>
                        </Box>

                        {/* Bottom Note */}
                        <Box
                            sx={{
                                mt: 5,
                                px: 3,
                                py: 2,
                                border: '1px dashed yellow',
                                backgroundColor: '#181818',
                                color: '#b39ddb',
                                textAlign: 'center',
                                fontSize: '0.9rem',
                                borderRadius: 0, // also sharp
                            }}
                        >
                            <Typography variant="body2" sx={{ color: 'yellow' }}>
                                Note: Enable your webcam to begin the interview
                            </Typography>
                        </Box>
                    </Grid>


                    {/* ===== Right Panel ===== */}
                    <Grid item xs={12} md={6} sx={{ p: 4 }}>
                        <Stack spacing={4} alignItems="center">
                            {/* Webcam Circle */}
                            <Box
                                sx={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '2px solid #8b5cf6',
                                }}
                            >
                                {cameraOn ? (
                                    <Webcam
                                        mirrored={true}
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={{
                                            width: 200,
                                            height: 200,
                                            facingMode: 'user',
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            bgcolor: '#111',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ color: '#8b5cf6' }}>
                                            Camera Off
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                            <Box>

                                <Typography sx={{ color: '#ccc', fontWeight: 500 }}>
                                    Please enable <strong>Webcam</strong> to proceed
                                </Typography>


                            </Box>
                            {/* Camera Toggle Buttons */}
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    onClick={handleCameraToggle}
                                    size="medium"
                                    sx={{
                                        backgroundColor: '#8b5cf6',
                                        color: 'white',
                                        borderRadius: 2,
                                        px: 3,
                                        fontSize: '14px', // Adjust the font size here
                                        '&:hover': {
                                            backgroundColor: '#7c3aed',
                                        },
                                    }}
                                >
                                    {cameraOn ? 'Stop Camera' : 'Start Camera'}
                                </Button>

                                {cameraOn && (
                                    <Button
                                        variant="outlined"
                                          onClick={handleStartClick}

                                        size="medium"
                                        sx={{
                                            border: '2px solid',
                                            borderColor: '#8b5cf6',
                                            color: '#ffffff',
                                            backgroundColor: 'transparent',
                                            borderRadius: 2,
                                            px: 4,
                                            fontWeight: 600,
                                            letterSpacing: 1,
                                            textTransform: 'uppercase',
                                            transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, color 0.4s ease',
                                            boxShadow: '0 0 8px rgba(139, 92, 246, 0.2)',
                                            backdropFilter: 'blur(2px)',
                                            '&:hover': {
                                                borderColor: '#a78bfa',
                                                color: '#ffffff',
                                                background: 'linear-gradient(90deg, #a78bfa, #8b5cf6)',
                                                boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)',
                                            },
                                        }}
                                    >
                                        Start
                                        <FaAnglesRight style={{ marginLeft: '8px' }} /> {/* Adjust this value as needed */}
                                    </Button>
                                )}
                            </Stack>


                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default InterviewPage1
