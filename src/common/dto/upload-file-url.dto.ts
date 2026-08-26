import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadFileUrlResponse {
  @Field(() => String, {
    description: 'Presigned URL for uploading the file to S3',
  })
  url: string;

  @Field(() => String, {
    description: 'Key/path of the file in the S3 storage',
  })
  key: string;
}
