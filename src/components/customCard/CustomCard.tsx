import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Text, Button, Grid, Badge, Group, Divider } from "@mantine/core";

interface CustomCardProps {
  type: "film" | "vehicle" | "starship";
}

interface Film {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  url: string;
}

interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  url: string;
}

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  url: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ type }) => {
  const [data, setData] = useState<Film[] | Vehicle[] | Starship[]>([]);
  const navigate = useNavigate();

  const apiUrl =
    type === "film"
      ? "https://swapi.dev/api/films/"
      : type === "vehicle"
      ? "https://swapi.dev/api/vehicles/"
      : "https://swapi.dev/api/starships/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setData(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [apiUrl, data]);

  const handleItemClick = (url: string) => {
    const id = url.split("/").filter(Boolean).pop();
    if (type === "film") {
      navigate(`/resource/films/${id}`);
    } else if (type === "vehicle") {
      navigate(`/resource/vehicles/${id}`);
    } else if (type === "starship") {
      navigate(`/resource/starships/${id}`);
    }
  };

  return (
    <>
      <Group spacing="sm" className="cover-area" style={{ width: "100" }}>
        <Button onClick={() => navigate(-1)} leftIcon={"<-"}>
          Back
        </Button>
      </Group>
      <br/>
      <Grid grow>
        {data.map((item, index) => (
          <Grid.Col span={4} key={index}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="lg" weight={500} mb="xs">
                {type === "film"
                  ? (item as Film).title
                  : type === "vehicle"
                  ? (item as Vehicle).name
                  : (item as Starship).name}
              </Text>
              {type === "film" && (
                <>
                  <Text size="sm" color="dimmed">
                    Episode: {(item as Film).episode_id} | Director:{" "}
                    {(item as Film).director}
                  </Text>
                  <Text size="sm" color="dimmed" mt="xs">
                    Release Date: {(item as Film).release_date}
                  </Text>
                </>
              )}
              {type === "vehicle" && (
                <>
                  <Text size="sm" color="dimmed">
                    Model: {(item as Vehicle).model} | Manufacturer:{" "}
                    {(item as Vehicle).manufacturer}
                  </Text>
                  <Text size="sm" color="dimmed" mt="xs">
                    Cost: {(item as Vehicle).cost_in_credits}
                  </Text>
                </>
              )}
              {type === "starship" && (
                <>
                  <Text size="sm" color="dimmed">
                    Model: {(item as Starship).model} | Manufacturer:{" "}
                    {(item as Starship).manufacturer}
                  </Text>
                  <Text size="sm" color="dimmed" mt="xs">
                    Cost: {(item as Starship).cost_in_credits}
                  </Text>
                </>
              )}
              <Button
                onClick={() =>
                  handleItemClick((item as Film | Vehicle | Starship).url)
                }
                mt="md"
                fullWidth
              >
                View Details
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default CustomCard;
