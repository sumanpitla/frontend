import React, { useState, useEffect } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Heading, VStack, Select } from '@chakra-ui/react';
import axios from 'axios';

const AddInstance = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState(0);
  const [courseId, setCourseId] = useState(0); // this is now set by selecting a course
  const [courses, setCourses] = useState([]); // courses fetched from the API

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []); // fetch courses on mount

  const handleSubmit = async () => {
    try {
      console.log("Course: ", courseId);
      console.log("Year: ", year);
      console.log("SEM: ", semester);
      const response = await axios.post('http://localhost:8000/api/instances/', {
        course: courseId,
        year,
        semester,
      });
      alert('Instance added successfully!');
    } catch (error) {
      alert('Failed to add instance');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} bg="white" variant="solid" borderColor="black "boxShadow="lg">
      <Heading mb={6} align="center">Add Instance</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Course</FormLabel>
          <Select
            placeholder="Select course"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Year of Delivery</FormLabel>
          <Input
            placeholder="e.g. 2023"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Semester</FormLabel>
          <Select
            placeholder="Select Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
          <option value="1">1</option>
          <option value="2">2</option>
          </Select>
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Add Instance
        </Button>
      </VStack>
    </Box>
  );
};

export default AddInstance;
