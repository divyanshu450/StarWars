import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Col,
  Card,
  List,
  Button,
  Divider,
  Group,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

const Vehicles = () => {
  const [vehicleData, setVehicle] = useState<Vehicle>();
  const [filmTitles, setFilmTitles] = useState<string[]>([]);
  const [pilotNames, setPilotNames] = useState<string[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  interface Vehicle {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: string;
    crew: string;
    edited: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: string[];
    films: string[];
    url: string;
    vehicle_class: string;
  }

  const fetchData = async () => {
    try {
      const res = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
      const vehicle: Vehicle = await res.json();
      setVehicle(vehicle);
      console.log("veh: ", vehicleData)
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchFilmTitles = async (filmUrls: string[]) => {
    try {
      const filmRequests = filmUrls.map((url) =>
        fetch(url).then((res) => res.json())
      );
      const films = await Promise.all(filmRequests);
      const titles = films.map((film) => film.title);
      setFilmTitles(titles);
    } catch (error) {
      console.error("Error fetching film titles:", error);
    }
  };

  const fetchPilotNames = async (pilotUrls: string[]) => {
    try {
      const pilotRequests = pilotUrls.map((url) =>
        fetch(url).then((res) => res.json())
      );
      const pilots = await Promise.all(pilotRequests);
      const names = pilots.map((pilot) => pilot.name);
      setPilotNames(names);
    } catch (error) {
      console.error("Error fetching pilot names:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(()=>{
    if (vehicleData?.films) {
      fetchFilmTitles(vehicleData?.films);
    }
    if (vehicleData?.pilots) {
      fetchPilotNames(vehicleData?.pilots);
    }
  }, [vehicleData])

  return (
    <>
    <Group spacing="sm" className="cover-area" style={{ width: "100" }}>
      <Button onClick={() => navigate(-1)} leftIcon={"<-"}>
        Back
      </Button>
    </Group>
    <br />
    <Container size="lg" mt="xl">
      <Title order={1}>{vehicleData?.name}</Title>
      <Text size="sm" color="dimmed">
        Model: {vehicleData?.model}
      </Text>

      <Divider my="xl" />

      <Grid gutter="xl">
        <Col span={6}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={2}>Details</Title>
            <Text>
              <strong>Manufacturer:</strong> {vehicleData?.manufacturer}
            </Text>
            <Text>
              <strong>Cost:</strong> {vehicleData?.cost_in_credits}
            </Text>
            <Text>
              <strong>Length:</strong> {vehicleData?.length} meters
            </Text>
            <Text>
              <strong>Max Speed:</strong> {vehicleData?.max_atmosphering_speed}{" "}
              km/h
            </Text>
            <Text>
              <strong>Crew:</strong> {vehicleData?.crew}
            </Text>
            <Text>
              <strong>Passengers:</strong> {vehicleData?.passengers}
            </Text>
            <Text>
              <strong>Cargo Capacity:</strong> {vehicleData?.cargo_capacity} kg
            </Text>
            <Text>
              <strong>Consumables:</strong> {vehicleData?.consumables}
            </Text>
            <Text>
              <strong>Vehicle Class:</strong> {vehicleData?.vehicle_class}
            </Text>
          </Card>
        </Col>

        <Col span={6}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={2}>Pilots</Title>
            <List spacing="sm">
            {pilotNames.length > 0
                ? pilotNames.map((pilot, index) => (
                    <List.Item key={index}>{pilot}</List.Item>
                  ))
                : "No pilots available..."}
            </List>
          </Card>
        </Col>
      </Grid>

      <Grid mt="xl">
        <Col span={12}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={2}>Featured In</Title>
            <Text>{filmTitles.length > 0
                ? filmTitles.join(", ")
                : "No films available"}</Text>
          </Card>
        </Col>
      </Grid>

    </Container>
    </>
  );
};

export default Vehicles;