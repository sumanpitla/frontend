import React from 'react';
import { Box, Button, Heading, VStack ,Grid} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" p={10}>
      <Heading mb={8}>Welcome to Course Management -IIT Bomabay</Heading>
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
      <Box boxSize={300} textAlign="center">
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <Button colorScheme="blue" width="200px" onClick={() => navigate('/add-course')}>
          Add Course
        </Button>
        <Button colorScheme="blue" width="200px" onClick={() => navigate('/add-instance')}>
          Add Instance
        </Button>
        <Button colorScheme="blue" width="200px" onClick={() => navigate('/list-courses')}>
          List All the Courses
        </Button>
        <Button colorScheme="blue" width="200px" onClick={() => navigate('/list-instances')}>
          List Instances
        </Button>
      </Grid>
      </Box>
      </Box>
      {/* <VStack spacing={6}>
        <Button colorScheme="blue" size="lg" width="200px" onClick={() => navigate('/add-course')}>
          Add Course
        </Button>
        <Button colorScheme="blue" size="lg" width="200px" onClick={() => navigate('/add-instance')}>
          Add Instance
        </Button>
        <Button colorScheme="blue" size="lg" width="200px" onClick={() => navigate('/list-courses')}>
          List All the Courses
        </Button>
        <Button colorScheme="blue" size="lg" width="200px"  onClick={() => navigate('/list-instances')}>
          List Instances
        </Button>
      </VStack> */}
    </Box>
  );
}

export default HomePage;
