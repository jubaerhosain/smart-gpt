import crypto from 'crypto';
import minioClient from '../config/minioConfig.js';
import Book from '../models/book.js';

let bucketExist = false;

export const createBook = async(req, res, next) => {
    try {
        const {file, body} = req;
        console.log(file, body);
        const uuidName = crypto.randomUUID();
        if(!bucketExist)
        {
            bucketExist = true;
            minioClient.makeBucket('photos', 'us-east-1', function(err) {
                if (err) return console.log(err)
                console.log('Bucket created successfully');
            });
        }
        minioClient.fPutObject('books', uuidName, req.file.path, function (err, objInfo) {
            if(err) {return console.log(err)}
            else console.log("Object successfully saved");
        });
        console.log("file",req.file)
    
        const book = {
            title:req.body.title,
            summary:req.body.summary,
            bookUrl: `http://localhost:4002/${file.filename}`
            // bookUrl:`http://127.0.0.1:9000/${uuidName}`
        }
        console.log(book);
        const newBook = new Book(book);
        // Save the book to the database
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
      } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Failed to create book' });
    }
}


export const getBook = async(req, res, next) => {
    try {
        const books = await Book.find().sort({ _id: -1 });

        res.send(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get books' });
    }

}

export const getBookById = async(req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.send(book);
    } catch (error) {
        res.status(500).json({ message: 'Book not found' });
    }
}

