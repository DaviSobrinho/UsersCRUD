import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET, // Obtém a secret do ambiente
};

export const jwtConstantsFactory = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
});