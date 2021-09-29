import * as fs from 'fs';
const fileExists = (path: string): Promise<any> =>
  new Promise<boolean>((resolve) => {
    fs.stat(path, (err) => {
      if (err) resolve(false);
      else resolve(true);
    });
  });
const writeFile = (path: string, data: string) =>
  new Promise<void>((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
const readFile = (path: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err: any, data: any) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

export { fileExists, writeFile, readFile };
