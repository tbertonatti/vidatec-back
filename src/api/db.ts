import { fileExists, readFile, writeFile } from '../helpers/fs';

class DB<T> {
  file: string;
  data: T[];
  setup: boolean;
  constructor(file: string) {
    this.file = file;
    this.setup = false;
    this.data = [];
  }
  async read() {
    const exists = await fileExists(this.file);
    if (exists) {
      const data = await readFile(this.file);
      if (data) {
        this.data = typeof data === 'string' ? JSON.parse(data) : data;
      }
    } else {
      await this.write();
    }
    this.setup = true;
  }
  async write() {
    await writeFile(this.file, JSON.stringify(this.data));
  }
}
export default DB;
