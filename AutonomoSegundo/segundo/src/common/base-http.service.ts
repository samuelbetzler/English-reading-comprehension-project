import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { API_URLS } from '../config/api-urls.config';

@Injectable()
export class BaseHttpService {
  constructor(private http: HttpService) {}

  protected async get(endpoint: string, params: string = '') {
    const url = `${API_URLS.BASE_URL}${endpoint}${params}`;
    const response = await firstValueFrom(this.http.get(url));
    return response.data;
  }

  protected async post(endpoint: string, data: any) {
    const url = `${API_URLS.BASE_URL}${endpoint}`;
    const response = await firstValueFrom(this.http.post(url, data));
    return response.data;
  }

  protected async put(endpoint: string, id: number, data: any) {
    const url = `${API_URLS.BASE_URL}${endpoint}/${id}`;
    const response = await firstValueFrom(this.http.put(url, data));
    return response.data;
  }

  protected async delete(endpoint: string, id: number) {
    const url = `${API_URLS.BASE_URL}${endpoint}/${id}`;
    await firstValueFrom(this.http.delete(url));
  }
}