// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Flex,
//   Box,
//   Input,
//   Select,
//   Text,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
// } from "@chakra-ui/react";
// import { useState } from "react";

// function App() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [year, setYear] = useState("");
//   const [semester, setSemester] = useState("");
//   const [instances, setInstances] = useState([]);

//   const handleYearChange = (event) => {
//     setYear(event.target.value);
//   };

//   const handleSemesterChange = (event) => {
//     setSemester(event.target.value);
//   };

//   const handleListInstances = async () => {
//     // Replace this with your actual API call
//     const response = await fetch(
//       `http://localhost:8000/api/instances/${year}/${semester}`
//     );
//     const data = await response.json();
//     setInstances(data);
//     console.log(data);
//     onOpen();
//   };

//   return (
//     <div>
//       <Box maxW="md" mx="auto" mt={15}>
//         <h1 align="center" style={{ fontWeight: 'bold' }}>Course Instances</h1>
//       <Flex justifyContent="space-between" alignItems="center" mb={4}>
//         <Input placeholder="Year" value={year} onChange={handleYearChange}width="350px" m="2" />
//         <Select
//           placeholder="Select semester"
//           value={semester}
//           onChange={handleSemesterChange}
//           width="300px"
//         >
//           <option value="1">1</option>
//           <option value="2">2</option>
//         </Select>
//         <Button colorScheme="blue" onClick={handleListInstances} m="5" width="300px">
//           List Instances
//         </Button>
//       </Flex>
//       </Box>
//       <Modal isOpen={isOpen} onClose={onClose} width="700px">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Course Instances</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {instances.length > 0 ? (
//               <Table variant="simple">
//                 <Thead>
//                   <Tr>
//                     <Th>Course Id</Th>
//                     <Th>Year-Sem</Th>
//                     <Th>Code</Th>
//                     <Th>Action</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {instances.map((instance) => (
//                     <Tr key={instance.id}>
//                       <Td>{instance.course}</Td>
//                       <Td>{instance.year}-{instance.semester}</Td>
//                       <Td>{instance.code}</Td>
//                       <Td>
//                         <Flex gap={2}>
//                           <Button
//                             colorScheme="blue"
//                             onClick={() => {
//                               // Implement view details functionality
//                             }}
//                           >
//                             <Text fontSize="sm">View Details</Text>
//                           </Button>
//                           <Button
//                             colorScheme="red"
//                             onClick={() => {
//                               // Implement delete functionality
//                             }}
//                           >
//                             <Text fontSize="sm">Delete</Text>
//                           </Button>
//                         </Flex>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             ) : (
//               <Text>No instances found.</Text>
//             )}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// export default App;

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Box,
  Input,
  Select,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [instances, setInstances] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleListInstances = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/instances/${year}/${semester}`
      );
      const instancesData = response.data;
      console.log("Instances data",instancesData);
      // Fetch course details for each instance
      const instancesWithCourses = await Promise.all(
        instancesData.map(async (instance) => {
          const courseResponse = await axios.get(
            `http://localhost:8000/api/courses/${instance.course}/`
          );
          return {
            ...instance,
            courseTitle: courseResponse.data.title,
            courseCode: courseResponse.data.course_code,
            courseDescription: courseResponse.data.description,
          };
        })
      );

      setInstances(instancesWithCourses);
      onOpen();
      console.log("fulldata",instancesWithCourses);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleViewCourse = async (courseId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/courses/${courseId}/`
      );
      setSelectedCourse(response.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInstance = async (instance) => {
    const { year, semester, course } = instance;
    try {
      await axios.delete(
        `http://localhost:8000/api/instances/${year}/${semester}/${course}/`
      );
      setInstances(instances.filter((inst) => inst.course !== course));
      alert("Instance deleted successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Box maxW="md" mx="auto" mt={15}>
        <h1 align="center" style={{ fontWeight: "bold" }}>
          Course Instances
        </h1>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Input
            placeholder="Year"
            value={year}
            onChange={handleYearChange}
            width="350px"
            m="2"
          />
          <Select
            placeholder="Select semester"
            value={semester}
            onChange={handleSemesterChange}
            width="700px"
            m="2"
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </Select>
          <Button
            colorScheme="blue"
            onClick={handleListInstances}
            m="5"
            width="400px"
          >
            List Instances
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course Instances</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCourse && (
              <VStack align="left" mb={6}>
                <Text>
                  <strong>Course Title:</strong> {selectedCourse.title}
                </Text>
                <Text>
                  <strong>Course Code:</strong> {selectedCourse.course_code}
                </Text>
                <Text>
                  <strong>Course Description:</strong> {selectedCourse.description}
                </Text>
              </VStack>
            )}
            {instances.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Course Title</Th>
                    <Th>Year-Sem</Th>
                    <Th>Code</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {instances.map((instance) => (
                    <Tr key={instance.id}>
                      <Td>{instance.courseTitle}</Td>
                      <Td>{instance.year}-{instance.semester}</Td>
                      <Td>{instance.courseCode}</Td>
                      <Td>
                        <HStack spacing={4}>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleViewCourse(instance.course)}
                          >
                            <Text fontSize="sm">View Details</Text>
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDeleteInstance(instance)}
                          >
                            <Text fontSize="sm">Delete</Text>
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>No instances found.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
