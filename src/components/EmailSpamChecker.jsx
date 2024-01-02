import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Container } from '@mui/material';

function EmailSpamChecker() {
  const [emailText, setEmailText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [qualityScore, setQualityScore] = useState(null);

  const spamWords = ['free', 'offer', 'winner']; // Add more spammy words here
  const calculateScore = (text) => {
    // Simple scoring logic, can be improved
    let score = 100;
    spamWords.forEach((word) => {
      if (text.toLowerCase().includes(word)) {
        score -= 10; // Decrease score for each spam word found
      }
    });
    return Math.max(score, 0); // Ensure score is not negative
  };

  const highlightSpamWords = (text) => {
    let highlighted = text;
    spamWords.forEach((word) => {
      const regex = new RegExp(word, 'gi');
      highlighted = highlighted.replace(regex, `<mark>${word}</mark>`);
    });
    return highlighted;
  };

  useEffect(() => {
    // Trigger email checking when the email text changes
    checkEmail();
  }, [emailText]);

  const checkEmail = () => {
    const score = calculateScore(emailText);
    setQualityScore(score);
    const highlighted = highlightSpamWords(emailText);
    setHighlightedText(highlighted);
  };

  return (
    <Container maxWidth="xl" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 >Spam Checker</h1>
      <p>Copy/Past an email message to detect and remove <span style={{ color: 'blue' }}>spam words.</span></p>
      <Box sx={{ maxWidth: 700, mx: 'auto', my: 4 }}
        display="flex"
        // height="100px"
        boxShadow={3} 
      >
        <TextField
          label="Email Text"
          multiline
          rows={15}
          fullWidth
          variant="outlined"
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          border = 'none'
        />
        {qualityScore !== null && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Email Quality Score: {qualityScore}
          </Typography>
        )}
        {highlightedText && (
          <Typography
            variant="body1"
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        )}
      </Box>
    </Container>
  );
}

export default EmailSpamChecker;
