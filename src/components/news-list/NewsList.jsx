import React, { useEffect, useState } from 'react';
import { News } from '../news/News';
import s from './NewsList.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    // Bætum við mounted breytu til að passa uppá að við séum ekki að uppfæra 
    // state nema við séum með mounted component
    let mounted = true;
    async function saekjaFlokka() {
      if (mounted) {
        setLoading(true);
        setError(null);
      } 

      let json;

      try {
        const result = await fetch(apiUrl);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        if (mounted) {
          setError('Gat ekki sótt gögn.');
        }        
        return;
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
      if (mounted) {
        setData(json);
      }
    }
    saekjaFlokka();

    return () => mounted = false;
  }, []);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    )
  }
  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }
  const ids = (data && data.map(c => c.id)) || [];
  return (
    <div className={s.newsList}>
      {ids.length > 0 && ids.map((id, i) => {
        return (
          <News
            key={i}
            id={id}
            limit={5}
          />
        )
      })}
    </div>
  );
}
