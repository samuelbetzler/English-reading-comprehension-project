import { AxiosClient } from './clients/AxiosClient';
import { GotClient } from './clients/GotClient';
import { DataService } from './services/DataService';

const flaskUrl = 'http://127.0.0.1:5000/quiz/';
const springBootUrl = 'http://localhost:8080/api/quizzes';

const axiosClient = new AxiosClient();
const gotClient = new GotClient();

const axiosDataService = new DataService(axiosClient);
const gotDataService = new DataService(gotClient);

const fetchAndLogData = async () => {
  try {
    console.log('Fetching data using Axios client...');
    const flaskDataWithAxios = await axiosDataService.fetchData(flaskUrl);
    console.log('Data from Flask (Axios):', flaskDataWithAxios);

    const springBootDataWithAxios = await axiosDataService.fetchData(springBootUrl);
    console.log('Data from Spring Boot (Axios):', springBootDataWithAxios);
  } catch (error) {
    console.error('Error fetching data with Axios client:', error);
  }

  try {
    console.log('Fetching data using Got client...');
    const flaskDataWithGot = await gotDataService.fetchData(flaskUrl);
    console.log('Data from Flask (Got):', flaskDataWithGot);

    const springBootDataWithGot = await gotDataService.fetchData(springBootUrl);
    console.log('Data from Spring Boot (Got):', springBootDataWithGot);
  } catch (error) {
    console.error('Error fetching data with Got client:', error);
  }
};

fetchAndLogData();
