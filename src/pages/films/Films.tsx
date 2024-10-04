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
import { useParams, useNavigate } from "react-router-dom";

const Films = () => {
  const [filmData, setfilmData] = useState<Movie>();
  const [characterName, setcharacterName] = useState<String[]>([]);
  const [starshipName, setstarshipName] = useState<String[]>([]);
  const [planetName, setPlanetName] = useState<String[]>([]);
  const [vehicleName, setVehicleName] = useState<String[]>([]);
  const [speciesNames, setSpeciesNames] = useState<string[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  interface Movie {
    name: string;
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string[];
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
  }

  const fetchFilms = async () => {
    try {
      const res = await fetch(`https://swapi.dev/api/films/${id}`);
      const filmData: Movie = await res.json();
      setfilmData(filmData);
    } catch (error) {
      throw error;
    }
  };

  const fetchCharacter = async (characterUrl: string[]) => {
    try {
      const characters = characterUrl.map(
        async (url) => await fetch(url).then((res) => res.json())
      );
      const characterName = await Promise.all(characters);
      console.log("characterName", characterName);
      const charNames = characterName.map((item) => {
        return item.name;
      });
      setcharacterName(charNames);
    } catch (error) {
      throw error;
    }
  };

  const fetchPlanets = async (planetUrl: string[]) => {
    try {
      const planets = planetUrl.map(
        async (url) => await fetch(url).then((res) => res.json())
      );
      const planetData = await Promise.all(planets);
      const planetNames = planetData.map((item) => item.name);
      setPlanetName(planetNames);
    } catch (error) {
      throw error;
    }
  };

  const fetchStarships = async (starshipUrl: string[]) => {
    try {
      const starships = starshipUrl.map(
        async (url) => await fetch(url).then((res) => res.json())
      );
      const starshipsData = await Promise.all(starships);

      const starshipNames = starshipsData.map((item) => {
        return item.name;
      });
      setstarshipName(starshipNames);
    } catch (error) {
      throw error;
    }
  };

  const fetchVehicles = async (vehicleUrl: string[]) => {
    try {
      const vehicles = vehicleUrl.map(
        async (url) => await fetch(url).then((res) => res.json())
      );
      const vehicleData = await Promise.all(vehicles);

      const vehicleNames = vehicleData.map((item) => {
        return item.name;
      });
      setVehicleName(vehicleNames);
      console.log(vehicleName);
    } catch (error) {
      throw error;
    }
  };

  const fetchSpecies = async (speciesUrl: string[]) => {
    try {
      const speciesPromises = speciesUrl.map(
        async (url) => await fetch(url).then((res) => res.json())
      );
      const speciesData = await Promise.all(speciesPromises);

      const speciesName = speciesData.map((item) => {
        return item.name;
      });
      setSpeciesNames(speciesName);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [id]);

  useEffect(() => {
    if (filmData?.characters) {
      fetchCharacter(filmData?.characters);
    }
    if (filmData?.planets) {
      fetchPlanets(filmData.planets);
    }
    if (filmData?.starships) {
      fetchStarships(filmData.starships);
    }
    if (filmData?.vehicles) {
      fetchVehicles(filmData.vehicles);
    }
    if (filmData?.species) {
      fetchSpecies(filmData.species);
    }
  }, [filmData]);

  return (
    <>
      <Group spacing="sm" className="cover-area" style={{ width: "100" }}>
        <Button onClick={() => navigate(-1)} leftIcon={"<-"}>
          Back
        </Button>
      </Group>
      <br />
      <Container size="lg" mt="xl">
        <Title order={1}>
          {filmData?.title} (Episode {filmData?.episode_id})
        </Title>
        <Text size="sm" color="dimmed">
          {filmData?.release_date}
        </Text>
        <Text mt="md" mb="lg" style={{ whiteSpace: "normal" }}>
          {filmData?.opening_crawl.substring(0, 300) + "..."}
        </Text>

        <Divider my="xl" />

        <Grid gutter="xl">
          <Col span={4}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Director</Title>
              <Text>{filmData?.director}</Text>
            </Card>
          </Col>

          <Col span={4}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Producer(s)</Title>
              <Text>{filmData?.producer}</Text>
            </Card>
          </Col>

          <Col span={4}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Release Date</Title>
              <Text>{filmData?.release_date}</Text>
            </Card>
          </Col>
        </Grid>

        <Divider my="xl" />

        <Grid gutter="xl">
          <Col span={4}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Characters</Title>
              <List spacing="sm">
                {characterName.map((name, index) => (
                  <List.Item key={index}>{name}</List.Item>
                ))}
              </List>
            </Card>
          </Col>

          <Col span={4}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Planets</Title>
              <List spacing="sm">
                {planetName.map((planet, index) => (
                  <List.Item key={index}>{planet}</List.Item>
                ))}
              </List>
            </Card>
          </Col>

          <Col span={4}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Starships</Title>
              <List spacing="sm">
                {starshipName.map((starship, index) => (
                  <List.Item key={index}>{starship}</List.Item>
                ))}
              </List>
            </Card>
          </Col>
        </Grid>

        <Grid mt="xl" gutter="xl">
          <Col span={6}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Vehicles</Title>
              <List spacing="sm">
                {vehicleName.map((vehicle, index) => (
                  <List.Item key={index}>{vehicle}</List.Item>
                ))}
              </List>
            </Card>
          </Col>

          <Col span={6}>
            <Card shadow="sm" padding="lg" radius="md">
              <Title order={2}>Species</Title>
              <List spacing="sm">
                {speciesNames?.map((specie, index) => (
                  <List.Item key={index}>{specie}</List.Item>
                ))}
              </List>
            </Card>
          </Col>
        </Grid>
      </Container>
    </>
  );
};

export default Films;
