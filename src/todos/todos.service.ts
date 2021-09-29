import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todosDB } from '../helpers/config';
import DB from '../api/db';
import { TODO } from './model';

@Injectable()
export class TodosService {
  db: DB<TODO>;
  constructor() {
    this.db = new DB(todosDB);
  }

  private createNewId(): number {
    let newId = 1;
    const currentIds = this.db.data.map(({ id }) => id);
    while (currentIds.includes(newId)) {
      newId++;
    }
    return newId;
  }

  private async readDB() {
    !this.db.setup && (await this.db.read());
  }

  private async updateDB(newData: TODO[]) {
    const actualData = this.db.data;
    try {
      this.db.data = newData;
      await this.db.write();
    } catch (error) {
      this.db.data = actualData;
      throw error;
    }
  }

  async getAll() {
    await this.readDB();
    return this.db.data;
  }

  async createTODO(content: string) {
    if (!content) {
      throw new HttpException(
        'Empty content received!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.readDB();
      const alreadyCreated = Boolean(
        this.db.data.find((t) => t.content === content),
      );
      if (alreadyCreated) {
        throw new HttpException(
          'TODO already created!',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const id = this.createNewId();
        const newTodo: TODO = { id, content, completed: false };
        const newData = this.db.data.concat(newTodo);
        await this.updateDB(newData);
        return newTodo;
      }
    }
  }

  async deleteTODO(idToDelete: number) {
    await this.readDB();
    let found = false;
    const newData = this.db.data.filter(({ id }) => {
      const matches = id === idToDelete;
      if (matches) found = true;
      return !matches;
    });
    if (!found) {
      throw new HttpException('TODO not found!', HttpStatus.BAD_REQUEST);
    } else {
      await this.updateDB(newData);
      return 'TODO Deleted';
    }
  }

  async completeTODO(idToUpdate: number) {
    await this.readDB();
    const newData = this.db.data.map((t) => {
      const { id, completed } = t;
      if (id === idToUpdate) {
        if (completed) {
          throw new HttpException(
            'TODO already completed!',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return { ...t, completed: true };
        }
      } else {
        return t;
      }
    });
    await this.updateDB(newData);
    return 'TODO Completed';
  }
}
