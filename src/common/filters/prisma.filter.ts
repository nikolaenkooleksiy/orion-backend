import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        return response.status(status).json({
          statusCode: status,
          message: 'Record with this unique field already exists',
        });
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        return response.status(status).json({
          statusCode: status,
          message: 'Record not found',
        });
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
