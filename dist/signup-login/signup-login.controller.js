"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupLoginController = void 0;
const common_1 = require("@nestjs/common");
const signup_login_service_1 = require("../signup-login/signup-login.service");
let SignupLoginController = class SignupLoginController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUsers(data, res) {
        try {
            const user = await this.usersService.create(data);
            if (user) {
                res.send({
                    statusCode: 200,
                    message: 'create user successfully',
                    user: user
                });
            }
            else {
                res.send({
                    statusCode: 200,
                    user: []
                });
            }
        }
        catch (error) {
            res.send({
                statusCode: 400,
                message: error,
            });
        }
    }
    async loginUsers(data, res) {
        try {
            const user = await this.usersService.login(data, res);
            if (user) {
                res.send({
                    statusCode: 200,
                    message: 'user successsfully fetch',
                    user: user
                });
            }
            else {
                res.send({
                    statusCode: 401,
                    message: 'email and password invalid',
                    user: []
                });
            }
        }
        catch (error) {
            res.send({
                statusCode: 400,
                message: error,
            });
        }
    }
    async randomjoke(req, res) {
        try {
            const response = await this.usersService.randomjoke(req, res);
            if (response) {
                res.send({
                    statusCode: 200,
                    message: 'jokes',
                    data: response
                });
            }
            else {
                res.send({
                    statusCode: 200,
                    data: []
                });
            }
        }
        catch (error) {
            res.send({
                statusCode: 400,
                message: error,
            });
        }
    }
    async readUser(req, res) {
        try {
            const data = await this.usersService.getuser(req, res);
            if (data) {
                res.send({
                    statusCode: 200,
                    message: 'user successsfully fetch',
                    user: data
                });
            }
            else {
                res.send({
                    statusCode: 200,
                    user: []
                });
            }
        }
        catch (error) {
            res.send({
                statusCode: 400,
                message: error,
            });
        }
    }
    async refreshtoken(req, res) {
        try {
            const data = await this.usersService.refreshtoken(req, res);
            if (data) {
                res.send({
                    statusCode: 200,
                    message: 'access token genarate successfully'
                });
            }
            else {
                res.send({
                    statusCode: 400,
                    message: 'access token not genarate'
                });
            }
        }
        catch (error) {
            res.send({
                statusCode: 400,
                message: error,
            });
        }
    }
    async logout(req, res) {
        try {
            var user = await this.usersService.logout(req, res);
            res.send({
                statusCode: 200,
                message: 'user successfully logout',
            });
        }
        catch (error) {
            res.send({
                statusCode: 400,
                message: error,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)('/users/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignupLoginController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Post)('/users/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignupLoginController.prototype, "loginUsers", null);
__decorate([
    (0, common_1.Post)('/random-joke'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignupLoginController.prototype, "randomjoke", null);
__decorate([
    (0, common_1.Post)('/users/me'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignupLoginController.prototype, "readUser", null);
__decorate([
    (0, common_1.Post)('/users/RefreshToken'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignupLoginController.prototype, "refreshtoken", null);
__decorate([
    (0, common_1.Post)('/users/logout'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SignupLoginController.prototype, "logout", null);
SignupLoginController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [signup_login_service_1.SignupLoginService])
], SignupLoginController);
exports.SignupLoginController = SignupLoginController;
//# sourceMappingURL=signup-login.controller.js.map