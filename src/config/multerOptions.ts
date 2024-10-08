import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    done: (error: Error, acceptFile: boolean) => void,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      done(null, true);
    } else {
      done(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(
      req: Request,
      file: Express.Multer.File,
      done: (error: Error | null, filename: string) => void,
    ) {
      const uploadPath = process.env.UPLOAD_DIR;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      } else {
        done(null, uploadPath);
      }
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      done: (error: Error | null, filename: string) => void,
    ) => {
      done(null, generateFileName(file.originalname));
    },
  }),
};

const generateFileName = (originalname: string) => {
  const fileExtension = extname(originalname);
  return `${uuid()}${fileExtension}`;
};
