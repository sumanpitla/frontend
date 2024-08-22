import React, { useState, useEffect} from 'react';
import { Box,  Heading,Text, Button, Icon, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

const ListAllcourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/courses');
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8000/api/courses/${courseId}/`);
      setCourses(courses.filter((course) => course.id !== courseId));
      alert('Course deleted successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleViewCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
    onOpen();
    // Navigate to course details page
    // You can use a library like react-router-dom to handle navigation
    // For example:
    // import { useHistory } from 'react-router-dom';
    // const history = useHistory();
    // history.push(`/courses/${courseId}`);
  };

  return (
    <>
    <Box maxW="md" mx="auto" mt={15} >
      <Heading mb={6} align="center">Courses</Heading>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <Table>
          <Thead>
            <Tr bg="blue.200">
              <Th>Course Title</Th>
              <Th>Course ID</Th>
              <Th>Course Code</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course) => (
              <Tr key={course.id}>
                <Td>{course.title}</Td>
                <Td>{course.id}</Td>
                <Td>{course.course_code}</Td>
                <Td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleViewCourse(course.id)}
                  >
                    <Icon viewBox="0 0 24 24" size={20}>
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C1.55 16.09 7 19.5 12 19.5C17 19.5 22.27 16.09 23 12C22.27 7.61 17 4.5 12 4.5Z" />
                    </Icon>
                    View
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Icon viewBox="0 0 24 24" size={20}>
                      <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V20H19V4Z" />
                    </Icon>
                    Delete
                  </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>


   {/* pop up window for tovveiw the course details */}
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCourse && (
              <div>
                <p>Course Id:{selectedCourse.id}</p>
                <p>Course Code: {selectedCourse.course_code}</p>
                <p>Course Name: {selectedCourse.title}</p>
                <p>Course Description: {selectedCourse.description}</p>
                {/* Add more course details as needed */}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListAllcourses;