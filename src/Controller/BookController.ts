/*
 * @Author: your name
 * @Date: 2020-05-22 14:31:02
 * @LastEditTime: 2020-07-22 00:25:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-framework-express\src\Controller\BookController.ts
 */

// Controller/BookController.ts

import { Request, Response, NextFunction } from 'express';

export class BookController {
    // GET books/all
    static GetAllBooks(req: Request, res: Response, next: NextFunction) {
        console.log('receive a GET request');
        console.log('[', req.method, '][', req.originalUrl, ']');
        console.log(req.params);
        console.log(req.query);

        const books = [
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },
            { id: 4, name: '4' },
        ];

        return res.json(books).end();
    }
}
