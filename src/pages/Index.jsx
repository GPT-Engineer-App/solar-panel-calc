import { useState } from "react";
import { Box, Button, Container, Divider, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, Stack, Text, useToast } from "@chakra-ui/react";
import { FaSolarPanel, FaCalculator } from "react-icons/fa";

const Index = () => {
  const [area, setArea] = useState("");
  const [sunlightHours, setSunlightHours] = useState("");
  const [result, setResult] = useState(null);
  const toast = useToast();

  const calculateSolarPanels = () => {
    if (!area || !sunlightHours) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const areaNum = parseFloat(area);
    const sunlightHoursNum = parseFloat(sunlightHours);
    const efficiency = 0.18; // Average efficiency of a solar panel
    const wattPerSqM = 150; // Average wattage per square meter

    const totalWattage = areaNum * wattPerSqM;
    const dailyOutput = totalWattage * sunlightHoursNum * efficiency;
    const annualOutput = dailyOutput * 365;

    setResult({
      dailyOutput: dailyOutput.toFixed(2),
      annualOutput: annualOutput.toFixed(2),
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Solar Panel Design Calculator <FaSolarPanel />
          </Heading>
          <Text fontSize="lg">Calculate the potential solar energy output based on panel area and average sunlight hours.</Text>
        </Box>

        <Divider />

        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="area">Area in square meters</FormLabel>
            <NumberInput min={0} onChange={(valueString) => setArea(valueString)}>
              <NumberInputField id="area" placeholder="Enter area in square meters" />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="sunlightHours">Average sunlight hours per day</FormLabel>
            <NumberInput min={0} max={24} onChange={(valueString) => setSunlightHours(valueString)}>
              <NumberInputField id="sunlightHours" placeholder="Enter average sunlight hours" />
            </NumberInput>
          </FormControl>

          <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={calculateSolarPanels}>
            Calculate
          </Button>
        </Stack>

        {result && (
          <Box mt={4}>
            <Text fontSize="xl" fontWeight="bold">
              Results:
            </Text>
            <Text>Daily Output: {result.dailyOutput} kWh</Text>
            <Text>Annual Output: {result.annualOutput} kWh</Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default Index;
