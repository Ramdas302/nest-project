import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  Response,
  Headers,
  HttpStatus, UseGuards
} from '@nestjs/common';
import { SignupLoginService } from '../signup-login/signup-login.service';
import { UsersDTO } from './users.dto';
@Controller('api')
export class SignupLoginController {
  constructor(private usersService: SignupLoginService) { }

  @Post('/users/signup')
  async createUsers(@Body() data: UsersDTO, @Response() res) {
    try {
      const user = await this.usersService.create(data);
      if (user) {
        res.send({
          statusCode: 200,
          message: 'create user successfully',
          user: user
        })
        
      } else {
        res.send({
          statusCode: 200,
          user: []
        })
      }
    } catch (error) {
      res.send({
        statusCode: 400,
        message: error,
      })
    }
  }

  @Post('/users/login')
  async loginUsers(@Body() data: UsersDTO, @Response() res) {
    try {
      const user = await this.usersService.login(data, res);
      if (user) {
        res.send({
          statusCode: 200,
          message: 'user successsfully fetch',
          user: user
        })
        
      } else {
        res.send({
          statusCode: 401,
          message: 'email and password invalid',
          user: []
        })
      }
    } catch (error) {
      res.send({
        statusCode: 400,
        message: error,
      })
    }
  }

  @Post('/random-joke')
  async randomjoke(@Request() req, @Response() res) {
    try {
      const response = await this.usersService.randomjoke(req, res);
      if (response) {
        res.send({
          statusCode: 200,
          message: 'jokes',
          data: response
        })
      } else {
        res.send({
          statusCode: 200,
          data: []
        })
      }
    } catch (error) {
      res.send({
        statusCode: 400,
        message: error,
      })
    }

  }

  @Post('/users/me')
  async readUser(@Request() req, @Response() res) {
    try {
      const data = await this.usersService.getuser(req, res);
      if (data) {
        res.send({
          statusCode: 200,
          message: 'user successsfully fetch',
          user: data
        })
      } else {
        res.send({
          statusCode: 200,
          user: []
        })
      }
    } catch (error) {
      res.send({
        statusCode: 400,
        message: error,
      })
    }
  }


  @Post('/users/RefreshToken')
  async refreshtoken(@Request() req, @Response() res) {
    try {
      const data = await this.usersService.refreshtoken(req, res);
   if(data){
        res.send({
          statusCode: 200,
          message: 'access token genarate successfully'
        })
      }else{
        res.send({
          statusCode: 400,
          message: 'access token not genarate'
        })
      }
    } catch (error) {
      res.send({
        statusCode: 400,
        message: error,
      })
    }
  }

  @Post('/users/logout')
  async logout(@Request() req, @Response() res) {
    try {
      var user = await this.usersService.logout(req, res);
      res.send({
        statusCode: 200,
        message: 'user successfully logout',
      })

    } catch (error) {
      res.send({
        statusCode: 400,
        message: error,
      })
    }
  }
}
