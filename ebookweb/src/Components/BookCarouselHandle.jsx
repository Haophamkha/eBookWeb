import React, { useState, useEffect } from 'react';
import { BookCarousel } from './BookCarousel';
import { getBooks } from '../Utils/api';

export const BookCarouselHandle = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBooks();
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  return <BookCarousel books={books} />;
};