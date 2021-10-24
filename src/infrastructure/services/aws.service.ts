import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService
{    
    private configService: ConfigService;
    private logger = new Logger(AwsService.name);
    private readonly region: string;
    private readonly accessKeyId: string;
    private readonly secretAccessKey: string;
    private readonly awsBucket: string;

    constructor(configService: ConfigService) {
        this.configService = configService;
        this.region = this.configService.get<string>('AWS_DEFAULT_REGION');
        this.accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
        this.secretAccessKey = this.configService.get<string>('AWS_SECRET_KEY');
        this.awsBucket = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    }

    public async uploadArquivo (file: any, idJogador: string) {
        const credentials = new AWS.Credentials({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey
        });

        const s3 = new AWS.S3({
            region: this.region,
            credentials: credentials
        });

        const fileExtension = file.originalname.split('.')[1];
        const urlKey = `${idJogador}.${fileExtension}`;
        this.logger.log(urlKey);

        const params = {
            Body: file.buffer,
            Bucket: this.awsBucket,
            Key: urlKey
        };

        return s3.putObject(params).promise()
            .then(
                data => {
                    return {
                        url: `https://${this.awsBucket}.s3-${this.region}.amazonaws.com/${urlKey}`
                    }
                },
                err => {
                    this.logger.error(err);
                    return err;
                }
            );
    }

}