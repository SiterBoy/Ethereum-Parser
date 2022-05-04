import { Injectable } from '@nestjs/common';
import { fetch, RequestInit } from 'undici';

@Injectable()
export class HttpService {
  async request<T>(url: string, options?: RequestInit) {
    try {
      const result = await fetch(url, options);
      return (await result.json()) as T;
    } catch (error) {
      console.log(error);
    }
  }
}
