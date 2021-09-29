import { Test, TestingModule } from '@nestjs/testing';
import { TODO } from './model';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;
  const expectedFinalTODOs = ['1', '2', '3', '5', '6'];
  const expectedCompletedTODOs = ['2', '3'];
  const idForTODOs = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
    // Clear test file
    service.db.data = [];
    await service.db.write();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  describe('init', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('getAll should return an empty array', async () => {
      const resTodos: TODO[] = await service.getAll();
      expect(resTodos).toEqual([]);
    });
  });

  describe('createTODO', () => {
    it("it should work and return the full created TODO '1'", async () => {
      const content = '1';
      const resTodo: TODO = await service.createTODO(content);
      idForTODOs[content] = resTodo.id;
      expect(resTodo).toBeDefined();
      expect(resTodo.content).toEqual(content);
      expect(resTodo.completed).toBeFalsy();
      expect(resTodo.id).toBeGreaterThan(0);
    });
    it("it shouldn't be able to create the same TODO twice", async () => {
      const content = '1';
      await expect(service.createTODO(content)).rejects.toThrow();
    });
    it("it shouldn't be able to create an empty TODO", async () => {
      const content = '';
      await expect(service.createTODO(content)).rejects.toThrow();
    });
    it("it should work and return the full created TODO '2'", async () => {
      const content = '2';
      const resTodo: TODO = await service.createTODO(content);
      idForTODOs[content] = resTodo.id;
      expect(resTodo).toBeDefined();
      expect(resTodo.content).toEqual(content);
      expect(resTodo.completed).toBeFalsy();
      expect(resTodo.id).toBeGreaterThan(0);
    });
    it("it should work and return the full created TODO '3'", async () => {
      const content = '3';
      const resTodo: TODO = await service.createTODO(content);
      idForTODOs[content] = resTodo.id;
      expect(resTodo).toBeDefined();
      expect(resTodo.content).toEqual(content);
      expect(resTodo.completed).toBeFalsy();
      expect(resTodo.id).toBeGreaterThan(0);
    });
    it("it should work and return the full created TODO '4'", async () => {
      const content = '4';
      const resTodo: TODO = await service.createTODO(content);
      idForTODOs[content] = resTodo.id;
      expect(resTodo).toBeDefined();
      expect(resTodo.content).toEqual(content);
      expect(resTodo.completed).toBeFalsy();
      expect(resTodo.id).toBeGreaterThan(0);
    });
    it("it should work and return the full created TODO '5'", async () => {
      const content = '5';
      const resTodo: TODO = await service.createTODO(content);
      idForTODOs[content] = resTodo.id;
      expect(resTodo).toBeDefined();
      expect(resTodo.content).toEqual(content);
      expect(resTodo.completed).toBeFalsy();
      expect(resTodo.id).toBeGreaterThan(0);
    });
    it("it should work and return the full created TODO '6'", async () => {
      const content = '6';
      const resTodo: TODO = await service.createTODO(content);
      idForTODOs[content] = resTodo.id;
      expect(resTodo).toBeDefined();
      expect(resTodo.content).toEqual(content);
      expect(resTodo.completed).toBeFalsy();
      expect(resTodo.id).toBeGreaterThan(0);
    });
  });

  describe('deleteTODO', () => {
    it("should delete the TODO '4'", async () => {
      const content = '4';
      const resTodo: string = await service.deleteTODO(idForTODOs[content]);
      expect(resTodo).toEqual('TODO Deleted');
    });
    it("should fail trying to delete again the TODO '4'", async () => {
      const content = '4';
      await expect(service.deleteTODO(idForTODOs[content])).rejects.toThrow();
    });
  });

  describe('completeTODO', () => {
    it("should mark as done the TODO '2'", async () => {
      const content = '2';
      const resTodo: string = await service.completeTODO(idForTODOs[content]);
      expect(resTodo).toEqual('TODO Completed');
    });
    it("should fail trying to mark as done again the TODO '2'", async () => {
      const content = '2';
      await expect(service.completeTODO(idForTODOs[content])).rejects.toThrow();
    });
    it("should mark as done the TODO '3'", async () => {
      const content = '3';
      const resTodo: string = await service.completeTODO(idForTODOs[content]);
      expect(resTodo).toEqual('TODO Completed');
    });
    it("should fail trying to mark as done again the TODO '3'", async () => {
      const content = '3';
      await expect(service.completeTODO(idForTODOs[content])).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should return the expected final array of TODOs', async () => {
      const resTodos: TODO[] = await service.getAll();
      const todosContent = resTodos.map((t) => t.content);
      const completedTodosContent = resTodos
        .filter((t) => t.completed)
        .map((t) => t.content);
      expect(todosContent).toEqual(expectedFinalTODOs);
      expect(completedTodosContent).toEqual(expectedCompletedTODOs);
    });
  });
});
