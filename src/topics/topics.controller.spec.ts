import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

class MockTopicsService {}

describe('TopicsController', () => {
  let controller: TopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers: [{ provide: TopicsService, useClass: MockTopicsService }],
    }).compile();

    controller = module.get<TopicsController>(TopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
