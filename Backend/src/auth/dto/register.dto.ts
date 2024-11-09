import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  actual_name: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsInt()
  @IsNotEmpty()
  admin_id: number;
}
