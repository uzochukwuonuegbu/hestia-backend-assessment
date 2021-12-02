import { spawn } from 'child_process';
import { ReadStream } from 'fs';
import { Readable } from 'stream';

export const pythonPromise = (filePath: string, args: string[]): Promise<string> => {
  const argsList = [...args];
  argsList.unshift(filePath);

  return new Promise((resolve, reject) => {
    const python = spawn("python3", argsList);
    python.stdout.on("data", (data) => {
      resolve(data.toString());
    });

    python.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });
};

export const streamToString = (stream: ReadStream | Readable, cb: any): Promise<string> => {
  return new Promise((resolve) => {
    const chunks: any[] = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk.toString());
    });
    stream.on('end', async () => {
      resolve(cb([chunks.join('')]));
    });
  });
}