import { Injectable, Logger } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import { AwsS3Config } from "./aws-s3.config";

@Injectable()
export class AwsS3Service
{    
    private awsS3Config: AwsS3Config;
    private logger = new Logger(AwsS3Service.name);

    constructor(awsS3Config: AwsS3Config) {
        this.awsS3Config = awsS3Config;
    }

    public async uploadArquivo (file: any, idJogador: string) {
        const credentials = new AWS.Credentials({
            accessKeyId: this.awsS3Config.accessKeyId,
            secretAccessKey: this.awsS3Config.secretAccessKey
        });

        const s3 = new AWS.S3({
            region: this.awsS3Config.region,
            credentials: credentials
        });

        const fileExtension = file.originalname.split('.')[1];
        const urlKey = `${idJogador}.${fileExtension}`;
        this.logger.log(urlKey);

        const params = {
            Body: file.buffer,
            Bucket: this.awsS3Config.awsBucket,
            Key: urlKey
        };

        try {
            const result = await s3.putObject(params).promise();
            this.logger.log(`result ${JSON.stringify(result)}`);
            return {
                url: `https://${this.awsS3Config.awsBucket}.s3-${this.awsS3Config.region}.amazonaws.com/${urlKey}`
            }
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

}