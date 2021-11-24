import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AwsS3Config
{

    private readonly configService : ConfigService;
    public region: string
    public accessKeyId: string
    public secretAccessKey: string
    public awsBucket: string

    constructor (configService : ConfigService) {
        this.configService = configService;
        this.region = this.configService.get<string>('AWS_DEFAULT_REGION');
        this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
        this.secretAccessKey = this.configService.get<string>('AWS_SECRET_KEY');
        this.awsBucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    }


}