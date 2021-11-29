import { spawn } from 'child_process';

export const pythonPromise = (filePath: string, args: string[]) => {
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
