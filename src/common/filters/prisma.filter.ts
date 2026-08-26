import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { GraphQLError } from 'graphql';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  catch(
    exception:
      Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const gqlHost = GqlArgumentsHost.create(host);
    const isGraphQL = !!gqlHost.getInfo();

    if (isGraphQL) {
      if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        if (exception.code === 'P2002') {
          return new GraphQLError(
            'Unique constraint failed on the fields: ' +
              ((exception.meta?.target as string[]) || []).join(', '),
            {
              extensions: { code: 'CONFLICT', status: HttpStatus.CONFLICT },
            },
          );
        }
        if (exception.code === 'P2025') {
          return new GraphQLError('Record not found', {
            extensions: { code: 'NOT_FOUND', status: HttpStatus.NOT_FOUND },
          });
        }
      }

      return new GraphQLError(exception.message, {
        extensions: { code: 'BAD_REQUEST', status: HttpStatus.BAD_REQUEST },
      });
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (!response || typeof response.status !== 'function') {
      throw exception;
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Unique constraint failed',
        });
      }
    }

    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
