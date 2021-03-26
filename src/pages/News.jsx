import React from 'react';
import { useParams } from 'react-router-dom';
import { News } from '../components/news/News';

export function NewsPage() {
  let { id } = useParams();
  
  return (
    <News id={id}/>
  );
}