import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignupLoginService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async create(data: UsersDTO) {
    const hash = await bcrypt.hash(data.password, 10)
    var userdata = {
      "first_name": data.first_name,
      "last_name": data.last_name,
      "email": data.email,
      "password": hash
    }
    return await this.usersRepository.save(userdata);
  }

  async login(data: UsersDTO, res) {
    var userdata = await this.usersRepository.findOne({ where: { email: data.email } });
    if (!userdata) {
      return userdata
    } else {
      const result = await bcrypt.compare(data.password, userdata.password);
      if (result === false) {
        return result
      } else {
        const access_token = this.jwtService.sign({ user_id:  userdata.id},{ expiresIn: 30 });
        const refresh_token = this.jwtService.sign({ user_id:  userdata.id});
        res.cookie("accessToken", access_token,{ httpOnly: true });
        res.cookie("refreshToken", refresh_token,{ httpOnly: true })
        return {
          user_email: userdata.email,
          userId: userdata.id,
        };
      }

    }
  }

  async randomjoke(req, res) {
    var response = await axios.get("https://api.chucknorris.io/jokes/random");
    return response.data.value;
  }


  async getuser(req, res) {
    var token = req.cookies.accessToken
    var status = false;
    if (token != null && token != undefined && token != "") {
    var data = await this.jwtService.verify(token);
    var userId = data.userId;
    console.log(req.userId)
    return await this.usersRepository.findOne({ where: { id: userId } });
    }else{
      return status;
    }
  }

  async logout(req, res) {
    var accessToken = req.cookies.accessToken
    var status = false
    if (accessToken != null && accessToken != undefined && accessToken != "") {
      await res.clearCookie('accessToken');
      var status = true;
      return status;
    } 
  }

  async refreshtoken(req, res) {
    var refreshToken = req.cookies.refreshToken
    var status = false;
    if (refreshToken != null && refreshToken != undefined && refreshToken != "") {
      var data = await this.jwtService.verify(refreshToken);
      req.userId = data.id;
      const access_token = this.jwtService.sign({ user_id: data.id},{ expiresIn: 30 });
      res.cookie("accessToken", access_token,{ httpOnly: true });
       var status = true;
       return status
    }
  }
}

