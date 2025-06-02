import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Rating,
  Skeleton,
  Stack,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Header from "../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../../util/db";
import { UserAnswers, MockInterview } from "../../../util/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";

const Feedback = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { interviewId } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const [interviewData, setInterview] = useState(null);

  const handleDone = () => {
    navigate("/dashboard");
  };

  const getFeedback = async () => {
    try {
      const feedbackResult = await db
        .select()
        .from(UserAnswers)
        .where(eq(UserAnswers.mockIdRef, interviewId));

      const interviewResult = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (interviewResult.length > 0) {
        setInterview(interviewResult[0]);
      }

      if (feedbackResult.length > 0) {
        const raw = feedbackResult[0];
        const parsedQuestions = JSON.parse(raw.question);
        const parsedFeedback = JSON.parse(raw.feedback);

        const combinedData = parsedQuestions.map((q, index) => ({
          question: q.question,
          improvement: parsedFeedback[index]?.feedback || "No feedback provided.",
          rating: parsedFeedback[index]?.rating || 0,
        }));

        setFeedbackData({
          questions: combinedData,
        });
      }
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  if (!feedbackData || !interviewData) {
    return (
      <Container maxWidth="xl" disableGutters>
        <Header />
        <Container maxWidth="md" sx={{ minHeight: "100vh", py: 6 }}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mt: 4,
              borderRadius: 4,
              bgcolor: "#1e1e1e",
              color: "#ffffff",
            }}
          >
            <Skeleton variant="text" width="60%" height={40} sx={{ mx: "auto", mb: 2 }} />
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Skeleton variant="text" width="40%" height={30} sx={{ mx: "auto" }} />
              <Skeleton variant="text" width="30%" height={20} sx={{ mx: "auto" }} />
            </Box>
            <Divider sx={{ mb: 3, bgcolor: "#444" }} />
            <Stack spacing={4}>
              {[1, 2].map((_, index) => (
                <Card
                  key={index}
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "#2a2a2a",
                    color: "#e0e0e0",
                  }}
                >
                  <CardContent>
                    <Skeleton variant="text" width="90%" height={30} sx={{ mb: 1.5 }} />
                    <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Paper>
          <Skeleton
            variant="rectangular"
            width={120}
            height={40}
            sx={{ mt: 4, mx: "auto", borderRadius: 2 }}
          />
        </Container>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" disableGutters>
      <Header />
      <Container maxWidth="md" sx={{ minHeight: "100vh", py: 6 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 4,
            bgcolor: "#1e1e1e",
            color: "#ffffff",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "center", color: "#f5f5f5" }}
          >
            Technical Interview Feedback
          </Typography>
          <Box sx={{ textAlign: "center", mb: 4, color: "#bbbbbb" }}>
            <Typography variant="h6">
              Candidate: <strong>{user.fullName}</strong>
            </Typography>
            <Typography variant="subtitle1">
              Role: <strong>{interviewData?.jobPosition}</strong>
            </Typography>
          </Box>
          <Divider sx={{ mb: 3, bgcolor: "#444" }} />
          <Stack spacing={4}>
            {feedbackData.questions.map((item, index) => (
              <Card
                key={index}
                elevation={3}
                sx={{
                  borderRadius: 3,
                  bgcolor: "#2a2a2a",
                  color: "#e0e0e0",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(255,255,255,0.05)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>
                    <strong>Q{index + 1}:</strong> {item.question}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontStyle: "italic", color: "#aaaaaa" }}
                  >
                    <strong>Improvement Suggestion:</strong> {item.improvement}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" sx={{ color: "#dddddd" }}>
                      <strong>Rating:</strong>
                    </Typography>
                    <Rating
                      value={item.rating}
                      max={10}
                      readOnly
                      size="small"
                      sx={{ color: "#fbc02d" }}
                    />
                    <Typography variant="body2" sx={{ color: "#999" }}>
                      ({item.rating}/10)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>
        <Button
          variant="contained"
          onClick={handleDone}
          sx={{
            mt: 4,
            display: "block",
            mx: "auto",
            backgroundColor: "#8b5cf6",
            ":hover": {
              backgroundColor: "#7c3aed",
            },
            color: "#ffffff",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Done
        </Button>
      </Container>
    </Container>
  );
};

export default Feedback;