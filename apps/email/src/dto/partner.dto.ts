import { AutoMap } from "@automapper/classes";
import { IsString, IsNotEmpty } from 'class-validator';

export class partnerDto {
  @AutoMap()
  @IsNotEmpty({ message: "FirstName should not be empty" })
  @IsString()
  readonly firstName?: string;

  @AutoMap()
  @IsNotEmpty({ message: "LastName should not be empty" })
  @IsString()
  readonly lastName?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Name should not be empty" })
  @IsString()
  readonly name?: string;
}
