import React from 'react';
import { Container, Title, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container style={{ textAlign: 'center', padding: '2rem' }}>
      <Title order={1} align="center" color="red" mb="sm">
        403 - Access Denied
      </Title>
      <Text size="lg" align="center" mb="md">
        You do not have permission to view this page.
      </Text>
      <Button variant="outline" onClick={handleGoBack} size="md">
        Go Back
      </Button>
    </Container>
  );
};

export default AccessDenied;
