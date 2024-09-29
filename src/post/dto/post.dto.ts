import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
