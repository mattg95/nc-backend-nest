import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { HeadersDto } from '../dto/headers.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const headers = req.headers;

    const dtoInstance = plainToInstance(HeadersDto, headers);
    const errors = validateSync(dtoInstance, {
      whitelist: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    next();
  }
}
