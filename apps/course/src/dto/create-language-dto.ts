import { IsNotEmpty, IsString } from "class-validator";

export class CreateLanguageDto {
  @IsNotEmpty({ message: "Language should not be empty" })
  @IsString({ message: "Language must be a string" })
  languageName: string;
}