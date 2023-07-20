import { ApiProperty } from "@nestjs/swagger";
import type { SignUpRequest, SignUpResponse } from "@clients";

export class SignUpDto implements SignUpRequest {
    @ApiProperty({
        example: 'johnwick123'
    })
    username: string

    @ApiProperty({
        example: '*********'
    })
    password: string

    @ApiProperty({
        example: 'farruxravshanbekov8@gmail.com'
    })
    email: string
}

export class SignUpResponseDto implements SignUpResponse {
    @ApiProperty({
        example: 'Bearer token...'
    })
    accessToken: string

    @ApiProperty({
        example: 'token....'
    })
    refreshToken: string
}