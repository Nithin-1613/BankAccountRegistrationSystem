import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data[0]; // Assuming a user object is returned, adjust as needed
  } catch (error) {
    throw error;
  }
}