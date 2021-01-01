import { IsString } from "class-validator";

export class CreateBoardDto {

    @IsString()
    readonly author: string;

    @IsString()
    readonly title: string;

    @IsString()
    readonly content: string;
}