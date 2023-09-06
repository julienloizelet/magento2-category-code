import fs from "fs";

export const getFileContent = async (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8");
  }
  return "";
};

export const deleteFileContent = async (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return fs.writeFileSync(filePath, "");
  }
  return false;
};
