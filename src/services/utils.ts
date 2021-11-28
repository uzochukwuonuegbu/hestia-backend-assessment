import fs from 'fs';
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


export const writeFileToRootSync = (tmpFile: string, csvString: string) => {
  try {
    const rootDir = process.cwd();
    fs.writeFileSync(`${rootDir}/${tmpFile}`, csvString);
    //file written successfully
  } catch (err) {
    console.error(err)
  }
}

export const deleteFileFromRoot = (tmpFile: string) => {
  try {
    const rootDir = process.cwd();
    fs.unlink(`${rootDir}/${tmpFile}`, function(err) {
      if(err) return console.log(err);
      console.log('file deleted successfully');
    });
  } catch (err) {
    console.error(err)
  }
}