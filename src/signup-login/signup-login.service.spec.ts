import { Test, TestingModule } from '@nestjs/testing';
import { SignupLoginService } from './signup-login.service';

describe('SignupLoginService', () => {
  let service: SignupLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignupLoginService],
    }).compile();

    service = module.get<SignupLoginService>(SignupLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
