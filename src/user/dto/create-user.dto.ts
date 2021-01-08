import { IsEmail, IsHash, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    
    @Length(1, 20)
    name: string;

    @Length(5, 20)     //lenth 데코레이터는 기본적으로 해당 필드가 string인지도 검사해준다
    username: string;

    @Length(8, 20)      //비밀번호의 길이가 8~20자 이내이며
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)    //알파벳 소문자, 대문자, 숫자, 특수문자가 조합되었는지 확인한다
    password: string;   //client는 평문으로 된 비밀번호를 SSL 레이어를 거쳐 보낸다고 가정한다

    @IsEmail()
    emailAddress: string;
}