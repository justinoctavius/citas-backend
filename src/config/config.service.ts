import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;

  constructor() {
    this.envConfig = dotenv.config().parsed;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
