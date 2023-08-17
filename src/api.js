import axios from 'axios';

const sendDataToBackend = async (dataArray) => {
  try {
    const response = await axios.post('http://localhost:8000/api/useranswer', { dataArray });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sendDataToBackend;
