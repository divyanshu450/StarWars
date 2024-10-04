import {
  Card,
  Text,
  Button,
  Group,
  Grid,
  Col,
  Avatar,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MovieIcon,
  StarshipIcon,
  VehicleIcon,
} from "../../components/shared/Icons";

interface User {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

function User() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<User>();

  async function fetchUser() {
    try {
      const res = await fetch(`https://swapi.dev/api/people/${id}`);
      const user: User = await res.json();
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <>
      <Group spacing="sm" className="cover-area" style={{ width: "100" }}>
        <Button onClick={() => navigate(-1)} leftIcon={"<-"}>
          Back
        </Button>
      </Group>
      <br/>
      <Grid grow>
        <Grid.Col span={12}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="resource-container"
          >
            <Grid mt="md">
              <Col span={2}>
                <Avatar
                  radius={"50%"}
                  style={{
                    height: "100%",
                    width: "100%",
                    border: "1px solid grey",
                  }}
                  size="xl"
                >
                  {user?.name.charAt(0)}
                </Avatar>
              </Col>
              <Col span={10}>
                <Text size="lg" weight={500}>
                  {user?.name}
                </Text>
                <Text size="sm" color="dimmed">
                  Height: {user?.height} cm
                </Text>
                <Text size="sm" color="dimmed">
                  Mass: {user?.mass} kg
                </Text>
                <Text size="sm" color="dimmed">
                  Hair Color: {user?.hair_color}
                </Text>
                <Text size="sm" color="dimmed">
                  Skin Color: {user?.skin_color}
                </Text>
                <Text size="sm" color="dimmed">
                  Eye Color: {user?.eye_color}
                </Text>
                <Text size="sm" color="dimmed">
                  Birth Year: {user?.birth_year}
                </Text>
                <Text size="sm" color="dimmed">
                  Gender: {user?.gender}
                </Text>
                <Text size="sm" color="dimmed">
                  Homeworld: {user?.homeworld}
                </Text>
              </Col>
            </Grid>
          </Card>
        </Grid.Col>

        {/* Films Card */}
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="resource-container">
            <Group position="apart" style={{ alignItems: "center" }}>
              <Group position="left" style={{ alignItems: "center" }}>
                <MovieIcon/>
              </Group>
              <Text size="lg" weight={800} style={{ marginBottom: 0 }}>
                FILMS
              </Text>
            </Group>
            <Group position="right" mt="md">
              <Text size="xl" weight={800}>
                {user?.films.length}
              </Text>
            </Group>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => navigate(`/resource/films`)}
            >
              More Details
            </Button>
          </Card>
        </Grid.Col>

        {/* Vehicles Card */}
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="resource-container">
            <Group position="apart" style={{ alignItems: "center" }}>
              <Group position="left" style={{ alignItems: "center" }}>
                <VehicleIcon />
              </Group>
              <Text size="lg" weight={800} style={{ marginBottom: 0 }}>
                VEHICLES
              </Text>
            </Group>
            <Group position="right" mt="md">
              <Text size="xl" weight={800}>
                {user?.vehicles.length}
              </Text>
            </Group>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => navigate(`/resource/vehicles`)}
            >
              More Details
            </Button>
          </Card>
        </Grid.Col>

        {/* Starships Card */}
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder className="resource-container">
            <Group position="apart" style={{ alignItems: "center" }}>
              <Group position="left" style={{ alignItems: "center" }}>
                <StarshipIcon/>
              </Group>
              <Text size="lg" weight={800} style={{ marginBottom: 0 }}>
                STARSHIPS
              </Text>
            </Group>
            <Group position="right" mt="md">
              <Text size="xl" weight={800}>
                {user?.starships.length}
              </Text>
            </Group>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => navigate(`/resource/starships`)}
            >
              More Details
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default User;





// import {
//   Card,
//   Image,
//   Text,
//   Badge,
//   Button,
//   Group,
//   Grid,
//   Col,
//   Avatar,
// } from "@mantine/core";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { MovieIcon, StarshipIcon, VehicleIcon } from "../../components/shared/Icons";
// // import "./resource.scss";

// interface User {
//   name: string;
//   height: string;
//   mass: string;
//   hair_color: string;
//   skin_color: string;
//   eye_color: string;
//   birth_year: string;
//   gender: string;
//   homeworld: string;
//   films: string[];
//   species: string[];
//   vehicles: string[];
//   starships: string[];
//   created: string;
//   edited: string;
//   url: string;
// }

// function User() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [user, setUser] = useState<User>();

//   async function fetchUser() {
//     try {
//       const res = await fetch(`https://swapi.dev/api/people/${id}`);
//       const user: User = await res.json();
//       setUser(user);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <>
//       <Group spacing="sm" className="cover-area" style={{ width: "100" }}>
//         <Button onClick={() => navigate(-1)} leftIcon={"<-"}>
//           Back
//         </Button>
//       </Group>
//       <Grid grow>
//         <Grid.Col span={12}>
//           <Card
//             shadow="sm"
//             padding="lg"
//             radius="md"
//             withBorder
//             className="resource-container"
//           >
//             <Grid mt="md">
//               <Col span={2}>
//                 <Avatar
//                   radius={"50%"}
//                   style={{
//                     height: "100%",
//                     width: "100%",
//                     border: "1px solid grey",
//                   }}
//                   size="xl"
//                 >
//                   {user?.name.charAt(0)}
//                 </Avatar>
//               </Col>
//               <Col span={10}>
//                 <Text size="lg" weight={500}>
//                   {user?.name}
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Height: {user?.height} cm
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Mass: {user?.mass} kg
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Hair Color: {user?.hair_color}
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Skin Color: {user?.skin_color}
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Eye Color: {user?.eye_color}
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Birth Year: {user?.birth_year}
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Gender: {user?.gender}
//                 </Text>
//                 <Text size="sm" color="dimmed">
//                   Homeworld: {user?.homeworld}
//                 </Text>
//               </Col>
//             </Grid>
//           </Card>
//         </Grid.Col>
//         <Grid.Col span={4}>
//           {" "}
//           <Card
//             shadow="sm"
//             padding="lg"
//             radius="md"
//             withBorder
//             className="resource-container"
//           >
//             <Grid mt="md">
//               <Col span={12}>
//                 <Text size="lg" weight={800}>
//                   {"FILMS"}
//                 </Text>
//                 <MovieIcon />
//                 <Text size="lg" weight={800}>
//                   {user?.films.length}
//                 </Text>
//               </Col>
//             </Grid>
//             <Button
//               variant="light"
//               color="blue"
//               fullWidth
//               mt="md"
//               radius="md"
//               onClick={() => navigate(`/resource/films`)}
//             >
//               More Details
//             </Button>
//           </Card>
//         </Grid.Col>
//         <Grid.Col span={4}>
//           {" "}
//           <Card
//             shadow="sm"
//             padding="lg"
//             radius="md"
//             withBorder
//             className="resource-container"
//           >
//             <Grid mt="md">
//               <Col span={12}>
//                 <Text size="lg" weight={800}>
//                   {"VEHICLES"}
//                 </Text>
//                 <VehicleIcon />
//                 <Text size="lg" weight={800}>
//                   {user?.vehicles.length}
//                 </Text>
//               </Col>
//             </Grid>

//             <Button variant="light" color="blue" fullWidth mt="md" radius="md"  onClick={() => navigate('/resource/vehicles')}>
//               More Details
//             </Button>
//           </Card>
//         </Grid.Col>
//         <Grid.Col span={4}>
//           <Card
//             shadow="sm"
//             padding="lg"
//             radius="md"
//             withBorder
//             className="resource-container"
//           >
//             <Grid mt="md">
//               <Col span={12}>
//                 <Text size="lg" weight={800}>
//                   {"Starships"}
//                 </Text>
//                 <StarshipIcon />
//                 <Text size="lg" weight={800}>
//                   {user?.starships.length}
//                 </Text>
//               </Col>
//             </Grid>

//             <Button variant="light" color="blue" fullWidth mt="md" radius="md"  onClick={() => navigate('/resource/starships')}>
//               More Details
//             </Button>
//           </Card>
//         </Grid.Col>
//       </Grid>
//     </>
//   );
// }

// export default User;
