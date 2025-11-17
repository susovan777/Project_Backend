import axios from 'axios';
import { Endpoint } from '../config/endpoint';

const API_URL = `${Endpoint.BACKEND}/api/profiles`;

const getAllProfiles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createProfile = async (profileData) => {
  const response = await axios.post(API_URL, profileData);
  return response.data;
};

export default { getAllProfiles, createProfile };
