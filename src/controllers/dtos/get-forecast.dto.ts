import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class GetForecastDTO {
  @IsString()
  @Length(8, 8, { message: 'cep length must be equal to 8' })
  @Matches(/^\d+$/, { message: 'cep must have only digits' })
  @IsNotEmpty()
  cep: string;

  @IsDateString()
  @IsNotEmpty()
  data: string;
}
