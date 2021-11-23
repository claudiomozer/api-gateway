import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AwsCognitoConfig
{

    private readonly configService : ConfigService;
    public userPoolId: string
    public clientId: string
    public region: string
    public authority: string

    constructor (configService : ConfigService) {
        this.configService = configService;
        this.userPoolId = this.configService.get<string>('COGNITO_USER_POOL');
        this.clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
        this.region = this.configService.get<string>('AWS_DEFAULT_REGION');
        this.authority = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;
    }


}