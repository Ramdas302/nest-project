"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupLoginModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const signup_login_controller_1 = require("./signup-login.controller");
const signup_login_service_1 = require("./signup-login.service");
const users_entity_1 = require("./users.entity");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./jwt.strategy");
let SignupLoginModule = class SignupLoginModule {
};
SignupLoginModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_entity_1.UsersEntity]), passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    secret: `${process.env.JWT_SECRET}.env`,
                }),
                inject: [config_1.ConfigService],
            })],
        controllers: [signup_login_controller_1.SignupLoginController],
        providers: [signup_login_service_1.SignupLoginService, jwt_strategy_1.JwtStrategy],
    })
], SignupLoginModule);
exports.SignupLoginModule = SignupLoginModule;
//# sourceMappingURL=signup-login.module.js.map