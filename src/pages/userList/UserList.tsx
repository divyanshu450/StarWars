import { useState, useEffect } from "react";
import { Table, Pagination, Loader, Badge } from "@mantine/core";
//import { ArrowUp, ArrowDown } from 'feather-icons-react';
import resourcelistAPI from "../../api/resourcelistAPI";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "../../components/shared/Icons";

function ResourceList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof Character | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 15;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await resourcelistAPI(currentPage);
        if (response && response.data) {
          setData(response.data.results);
          setTotalPages(Math.ceil(response.data.count / itemsPerPage));
        }
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const sortData = (column: keyof Character) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortColumn(column);
    setSortDirection(direction);
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300vh", 
          width: "300vw", 
        }}
      >
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  interface Character {
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

  console.log("SETDATA: ", data);
  const rows = data.map((person: Character, index) => (
    <tr key={index} onClick={() => navigate(`/user/${index + 1}`)}>
      <td>
        {person.name} <Badge color="violet">admin</Badge>
      </td>
      <td>{person.height}</td>
      <td>{person.mass}</td>
      <td>{person.hair_color}</td>
      <td>{person.skin_color}</td>
      <td>{person.eye_color}</td>
      <td>{person.birth_year}</td>
      <td>{person.gender}</td>
      {/* <td>{person.species.length > 0 ? person.species.join(", ") : "N/A"}</td> */}
    </tr>
  ));

  return (
    <>
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th onClick={() => sortData("name")}>
              {/* <HomeIcon /> */}
              Name
            </th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair Color</th>
            <th>Skin Color</th>
            <th>Eye Color</th>
            <th>Birth Year</th>
            <th>Gender</th>
            {/* <th>Species</th> */}
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        total={totalPages}
        color="#836ebb"
        mt="md"
      />
    </>
  );
}

export default ResourceList;
