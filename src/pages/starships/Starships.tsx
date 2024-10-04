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

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
}

const Starships = () => {
  const [starshipData, setstarshipData] = useState<Starship>();
  const [filmTitles, setFilmTitles] = useState<string[]>([]);
  const [pilotNames, setPilotNames] = useState<string[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
      const starshipData: Starship = await res.json();
      setstarshipData(starshipData);
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

  useEffect(() => {
    if (starshipData?.films) {
      fetchFilmTitles(starshipData.films);
    }
    if (starshipData?.pilots) {
      fetchPilotNames(starshipData.pilots);
    }
  }, [starshipData]);

  return (
    <>
    <Group spacing="sm" className="cover-area" style={{ width: "100" }}>
      <Button onClick={() => navigate(-1)} leftIcon={"<-"}>
        Back
      </Button>
    </Group>
    <br />
    <Container size="lg" mt="xl">
      <Title order={1}>{starshipData?.name}</Title>
      <Text size="sm" color="dimmed">
        Model: {starshipData?.model}
      </Text>

      <Divider my="xl" />

      <Grid gutter="xl">
        <Col span={6}>
          <Card shadow="sm" padding="lg" radius="md">
            <Title order={2}>Details</Title>
            <Text>
              <strong>Manufacturer:</strong> {starshipData?.manufacturer}
            </Text>
            <Text>
              <strong>Cost:</strong> {starshipData?.cost_in_credits} credits
            </Text>
            <Text>
              <strong>Length:</strong> {starshipData?.length} meters
            </Text>
            <Text>
              <strong>Max Speed:</strong> {starshipData?.max_atmosphering_speed}{" "}
              km/h
            </Text>
            <Text>
              <strong>Crew:</strong> {starshipData?.crew}
            </Text>
            <Text>
              <strong>Passengers:</strong> {starshipData?.passengers}
            </Text>
            <Text>
              <strong>Cargo Capacity:</strong> {starshipData?.cargo_capacity} kg
            </Text>
            <Text>
              <strong>Consumables:</strong> {starshipData?.consumables}
            </Text>
            <Text>
              <strong>Hyperdrive Rating:</strong>{" "}
              {starshipData?.hyperdrive_rating}
            </Text>
            <Text>
              <strong>MGLT:</strong> {starshipData?.MGLT}
            </Text>
            <Text>
              <strong>Starship Class:</strong> {starshipData?.starship_class}
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
            <Text>
              {filmTitles.length > 0
                ? filmTitles.join(", ")
                : "No films available"}
            </Text>
          </Card>
        </Col>
      </Grid>

    </Container>
    </>
  );
};

export default Starships;
