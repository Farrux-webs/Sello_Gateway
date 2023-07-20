import { ApiProperty } from "@nestjs/swagger";
import type { SignInRequest, SignInResponse } from "@clients";

export class SignInDto implements SignInRequest {
    @ApiProperty({
        example: '*********'
    })
    password: string

    @ApiProperty({
        example: 'farruxravshanbekov8@gmail.com'
    })
    email: string
}

export class SignInResponseDto implements SignInResponse {
    @ApiProperty({
        example: 'Bearer token...'
    })
    accessToken: string

    @ApiProperty({
        example: 'token....'
    })
    refreshToken: string
}