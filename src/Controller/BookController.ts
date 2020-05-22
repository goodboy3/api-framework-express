// Controller/BookController.ts

import { Request, Response, NextFunction } from 'express'


export class BookController
{
    // GET books/all
    static GetAllBooks(req: Request, res: Response, next: NextFunction)
    {
        console.log("receive a GET request");
        console.log('[', req.method, '][', req.originalUrl, ']');
        console.log(req.params);
        console.log(req.query);
        

        let books = [
            { id: 1, name: "1" },
            { id: 2, name: "2" },
            { id: 3, name: "3" },
            { id: 4, name: "4" },
        ]


        return res.json(books).end();
    }
}