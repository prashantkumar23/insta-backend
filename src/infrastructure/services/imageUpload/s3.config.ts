import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Configuration {
  constructor(
    private _config: ConfigService
  ) { }
  private readonly accessKeyId: string = this._config.get("AWS_S3_ACCESS_KEY_ID")
  private readonly secretAccessKey: string = this._config.get("AWS_S3_SECRET_ACCESS_KEY")
  private readonly region: string = this._config.get("AWS_S3_BUCKET_REGION")
  private readonly bucketName: string = this._config.get("AWS_S3_BUCKET_NAME")

  getAccessKey(): string {
    return this.accessKeyId
  }

  getSecretAccessKey(): string {
    return this.secretAccessKey
  }

  getRegion(): string {
    return this.region
  }

  getBucketName(): string {
    return this.bucketName
  }
}
