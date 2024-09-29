import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WorkspaceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  owner: number;
}
