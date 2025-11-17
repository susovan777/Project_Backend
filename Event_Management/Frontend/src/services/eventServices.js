import axios from 'axios';
import { Endpoint } from '../config/endpoint';

const API_URL = `${Endpoint.BACKEND}/api/events`;

const createEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const getAllEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export default { getAllEvents, createEvent };
