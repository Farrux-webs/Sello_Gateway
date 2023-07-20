import { Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { ConfigService } from "@nestjs/config"

@Global()
@Module({   
    exports: [UserService],
    providers: [UserService]
})
export class UserModule {}