import got from 'got';
import { HttpClient } from './HttpClient';

export class GotClient implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await got(url).json();
    return response;
  }
}
