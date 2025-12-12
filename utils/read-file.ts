import fs from "fs/promises";

export async function readFile(filePath: string) {
  try {
    return fs.readFile(filePath, { encoding: "utf-8" });
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    throw error;
  }
}
