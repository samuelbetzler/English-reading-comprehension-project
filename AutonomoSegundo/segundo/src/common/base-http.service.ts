import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getFullUrl } from '../config/api-urls.config';

@Injectable()
export class BaseHttpService {
  constructor(private http: HttpService) {}

  protected async get(endpoint: string, params: string = '') {
    const url = `${getFullUrl(endpoint)}${params}`;
    try {
      const response = await firstValueFrom(this.http.get(url));
      return response.data;
    } catch (error) {
      this.handleError(error, 'GET', url);
    }
  }

  protected async post(endpoint: string, data: any) {
    const url = getFullUrl(endpoint);
    try {
      const response = await firstValueFrom(this.http.post(url, data));
      return response.data;
    } catch (error) {
      this.handleError(error, 'POST', url);
    }
  }

  protected async put(endpoint: string, id: number, data: any) {
    const url = `${getFullUrl(endpoint)}/${id}`;
    try {
      const response = await firstValueFrom(this.http.put(url, data));
      return response.data;
    } catch (error) {
      this.handleError(error, 'PUT', url);
    }
  }

  protected async delete(endpoint: string, id: number) {
    const url = `${getFullUrl(endpoint)}/${id}`;
    try {
      await firstValueFrom(this.http.delete(url));
    } catch (error) {
      this.handleError(error, 'DELETE', url);
    }
  }

  private handleError(error: any, method: string, url: string) {
    console.error(`[${method}] ${url} failed:`, error.message);
    throw error;
  }
}