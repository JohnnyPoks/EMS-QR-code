import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class RegisterAdminDto {
  @IsString()
  @IsNotEmpty()
  actual_name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^.{6,}$/, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^((\+|00)?237)?([62](2|3|[5-9])[0-9]{7})$/, {
    message: 'Invalid telephone number',
  })
  telephone: string;
}
