import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

// BFF service: forwards calls to the WSO2 API Gateway, which routes
// either to the Micro Integrator (orchestrated flows) or directly to
// the microservice (proxy endpoints). The BFF composes read payloads
// and exposes a cohesive API to its frontend client.

@Injectable()
export class BffService {
  private client: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get<string>('APIM_GATEWAY_URL', 'https://localhost:8243'),
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async forward(method: string, path: string, token: string, body?: any, params?: any) {
    try {
      const res = await this.client.request({
        method, url: path, data: body, params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      const status = err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const body = err.response?.data || { error: err.message };
      throw new HttpException(body, status);
    }
  }

  // Composes an aggregated response by calling multiple endpoints in parallel.
  async composeParallel(calls: Promise<any>[]) {
    const results = await Promise.allSettled(calls);
    return results.map((r, i) => ({
      ok: r.status === 'fulfilled',
      data: r.status === 'fulfilled' ? r.value : null,
      error: r.status === 'rejected' ? (r.reason as any)?.message : null,
    }));
  }
}
