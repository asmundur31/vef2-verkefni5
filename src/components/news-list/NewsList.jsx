import React, { useEffect, useState } from 'react';
import { News } from '../news/News';
import s from './NewsList.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    async function saekjaFlokka() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(apiUrl, { signal: abortController.signal });

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        if (!abortController.signal.aborted) {
          setError('Gat ekki sótt gögn.');
        } else {
          setError('Notandi hætti við fyrirspurn');
        }
      } finally {
        setLoading(false);
      }

      setData(json);
    }
    saekjaFlokka();
    return () => {
      abortController.abort();
    };
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
