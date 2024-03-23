import { AutoMap } from "@automapper/classes";
import { IsString, IsObject, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { partnerDto } from "./partner.dto"

export class emailDto {
  @AutoMap()
  @IsNotEmpty({ message: "Receiver should not be empty" })
  @IsString()
  readonly receiver?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Type should not be empty" })
  @IsString()
  readonly type?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Action should not be empty" })
  @IsString()
  readonly action?: string;

  @AutoMap()
  @IsNotEmpty({ message: "Partner should not be empty" })
  @IsObject()
  readonly partner?: partnerDto;

  @IsOptional()
  readonly reasons?: string[];

  @IsOptional()
  readonly updatedAt:Date;

  @IsOptional()
  readonly createdAt: Date;
}
