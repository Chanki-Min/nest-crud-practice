import { IsString, MaxLength } from "class-validator";

export class CreateBoardDto {

    @MaxLength(50)
    readonly title: string;

    @IsString()
    readonly content: string;
}