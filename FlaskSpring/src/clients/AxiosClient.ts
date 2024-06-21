import axios from 'axios';
import { HttpClient } from './HttpClient';

export class AxiosClient implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data;
  }
}
