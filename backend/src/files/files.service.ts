import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FilesService {
  constructor() {}

  async createFile(file: Express.Multer.File) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fileName = uuid.v4() + '.jpg';
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      console.log(e);

      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  GetDataByFilesData(fileData) {
    let data = fs
      .readFileSync(path.resolve(fileData.contentPath, fileData.nameOfContent))
      .toString('utf-8');
    return data;
  }
}
