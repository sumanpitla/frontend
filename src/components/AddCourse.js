import React, { useState } from 'react';
import { Box, Input, Textarea, Button, FormControl, FormLabel, Heading, VStack } from '@chakra-ui/react';
import axios from 'axios';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
        console.log(title, courseCode, description);
      const response = await axios.post('http://localhost:8000/api/courses/', {
        title,
        course_code: courseCode, // changed to course_code
        description,
      });
      alert('Course added successfully!');
    } catch (error) {
      alert('Failed to add course');
    }
    
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <Heading mb={6} align="center">Add Course</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Title of Course</FormLabel>
          <Input
            placeholder="ex:Introduction to Computer Architecture"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Course Code</FormLabel>
          <Input
            placeholder="ex:CS 102"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="ex:This course provides a basic introduction to the architecture and algorithms of computer systems"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Add Course
        </Button>
      </VStack>
    </Box>
  );
};

export default AddCourse;
