import { HttpClient } from '../clients/HttpClient';

export class DataService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  async fetchData(url: string): Promise<any> {
    return this.client.get(url);
  }
}
