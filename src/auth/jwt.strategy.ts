import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AwsCognitoConfig } from '../infrastructure/services/aws-cognito.config';
import { passportJwtSecret } from 'jwks-rsa';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    private logger = new Logger(JwtStrategy.name);
    constructor (awsCognitoConfig: AwsCognitoConfig) {
        super({

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: awsCognitoConfig.clientId,
            issuer: awsCognitoConfig.authority,
            algorithms: ['RS256'],
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${awsCognitoConfig.authority}/.well-known/jwks.json`
            })
        });
        this.awsCognitoConfig = awsCognitoConfig;
    }

    public async validate(payload: any)
    {
        this.logger.log(`payload ${JSON.stringify(payload)}`);

        return {
            idUsuario: payload.sub,
            email: payload.email
        };
    }

}