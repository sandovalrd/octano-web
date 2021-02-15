import axios from "axios";
import axiosInstance from "./axiosInstance";
import apiURL from "./axiosConfig";

const httpRequests = {
  getToken: async () => {
    // const authBaseUrl = apiURL;
    try {
      const response = await axios.post(`${apiURL}/api/auth`, {
        password: 123456,
      });
      return response;
    } catch (err) {
      throw err;
    }
  },

  getPlayers: async () => {
    const url = `${apiURL}/api/players`;
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMoves: async () => {
    const url = `${apiURL}/api/moves`;
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMoveConfig: async () => {
    const url = `${apiURL}/api/moves/config`;
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMoves: async () => {
    const url = `${apiURL}/api/moves`;
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMovesConfg: async () => {
    const url = `${apiURL}/api/moves/config`;
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getGames: async () => {
    const url = `${apiURL}/api/games`;
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  addPlayers: async (name) => {
    const url = `${apiURL}/api/players`;
    try {
      const response = await axiosInstance.post(url, {
        name,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  addMoveConfig: async (move, skills) => {
    const url = `${apiURL}/api/moves/config`;
    try {
      const response = await axiosInstance.post(url, {
        move_id: move.id,
        move: move.name,
        skills: skills.name,
        skills_id: skills.id,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  addMove: async (name) => {
    const url = `${apiURL}/api/moves`;
    try {
      const response = await axiosInstance.post(url, {
        name,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updatePlayers: async (name, id) => {
    const url = `${apiURL}/api/players/${id}`;
    try {
      const response = await axiosInstance.put(url, {
        name,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateGame: async (players, id) => {
    const url = `${apiURL}/api/games/play/${id}`;
    try {
      const response = await axiosInstance.put(url, {
        players,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  newGame: async (players) => {
    const url = `${apiURL}/api/games/start`;
    try {
      const response = await axiosInstance.post(url, {
        players,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default httpRequests;
