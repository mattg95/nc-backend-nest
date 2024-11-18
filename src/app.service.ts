import { Injectable } from '@nestjs/common';
import * as Endpoints from './endpoints.json';

@Injectable()
export class AppService {
  getAllEndpoints(): string {
    return JSON.stringify(Endpoints, null, '\t');
  }
}
