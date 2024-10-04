import axios from "axios";

const resourcelistAPI = async (page: any) => {
  try {
    const usersResponse = await axios.get(
      `https://swapi.dev/api/people/?page=${page}`
    );
    return usersResponse;
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export default resourcelistAPI;
