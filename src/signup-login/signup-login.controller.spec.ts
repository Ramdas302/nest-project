import { Test, TestingModule } from '@nestjs/testing';
import { SignupLoginController } from './signup-login.controller';

describe('SignupLoginController', () => {
  let controller: SignupLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignupLoginController],
    }).compile();

    controller = module.get<SignupLoginController>(SignupLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
