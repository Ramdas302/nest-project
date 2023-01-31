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
exports.SignupLoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("axios");
const users_entity_1 = require("./users.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let SignupLoginService = class SignupLoginService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async create(data) {
        const hash = await bcrypt.hash(data.password, 10);
        var userdata = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email": data.email,
            "password": hash
        };
        return await this.usersRepository.save(userdata);
    }
    async login(data, res) {
        var userdata = await this.usersRepository.findOne({ where: { email: data.email } });
        if (!userdata) {
            return userdata;
        }
        else {
            const result = await bcrypt.compare(data.password, userdata.password);
            if (result === false) {
                return result;
            }
            else {
                const access_token = this.jwtService.sign({ user_id: userdata.id }, { expiresIn: 30 });
                const refresh_token = this.jwtService.sign({ user_id: userdata.id });
                res.cookie("accessToken", access_token, { httpOnly: true });
                res.cookie("refreshToken", refresh_token, { httpOnly: true });
                return {
                    user_email: userdata.email,
                    userId: userdata.id,
                };
            }
        }
    }
    async randomjoke(req, res) {
        var response = await axios_1.default.get("https://api.chucknorris.io/jokes/random");
        return response.data.value;
    }
    async getuser(req, res) {
        var token = req.cookies.accessToken;
        var status = false;
        if (token != null && token != undefined && token != "") {
            var data = await this.jwtService.verify(token);
            var userId = data.userId;
            console.log(req.userId);
            return await this.usersRepository.findOne({ where: { id: userId } });
        }
        else {
            return status;
        }
    }
    async logout(req, res) {
        var accessToken = req.cookies.accessToken;
        var status = false;
        if (accessToken != null && accessToken != undefined && accessToken != "") {
            await res.clearCookie('accessToken');
            var status = true;
            return status;
        }
    }
    async refreshtoken(req, res) {
        var refreshToken = req.cookies.refreshToken;
        var status = false;
        if (refreshToken != null && refreshToken != undefined && refreshToken != "") {
            var data = await this.jwtService.verify(refreshToken);
            req.userId = data.id;
            const access_token = this.jwtService.sign({ user_id: data.id }, { expiresIn: 30 });
            res.cookie("accessToken", access_token, { httpOnly: true });
            var status = true;
            return status;
        }
    }
};
SignupLoginService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], SignupLoginService);
exports.SignupLoginService = SignupLoginService;
//# sourceMappingURL=signup-login.service.js.map