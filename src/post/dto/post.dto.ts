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

  @IsNotEmpty()
  @IsNumber()
  workspace_id: number;

  @IsNotEmpty()
  @IsString()
  email: string;
}
