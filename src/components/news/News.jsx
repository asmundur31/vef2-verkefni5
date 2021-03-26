import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import s from './News.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  id: PropTypes.string,
  limit: PropTypes.number,
}

export function News({ id = '', limit = undefined }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);
  const [link, setLink] = useState({
    url: '/',
    text: 'Til baka',
  });

  // Effect til að sækja fréttir fyrir ákveðin flokk og uppfæra loading, error 
  // og data stöður
  useEffect(() => {
    const abortController = new AbortController();
    async function saekjaFrettir() {
      setLoading(true);
      setError(null);

      let json;

      try {
        const result = await fetch(apiUrl + id, { signal: abortController.signal });

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
    saekjaFrettir();
    return () => {
      abortController.abort();
    };
  }, [id, limit]);

  // Sér effect fyrir stöðuna á linknum 'Til baka' eða 'Allar fréttir'
  useEffect(() => {
    if (limit) {
      setLink({
        url: id,
        text: 'Allar fréttir',
      });
    } else {
      setLink({
        url: '/',
        text: 'Til baka',
      });
    }
  }, [limit, id])

  if (error) {
    return (
      <div className={`${s.news} ${s.news__not}`}>Villa kom upp: {error}</div>
    )
  }
  if (loading) {
    return (
      <div className={`${s.news} ${s.news__not}`}>Sæki gögn...</div>
    );
  }
  let news = data.items || [];
  if (limit) {
    news = news.slice(0, limit);
  }
  return (
    <div className={`${s.news}`}>
      <h2 className={s.news__title}>{data.title}</h2>
      <ul className={s.news__list}>
      {news.length > 0 && news.map((item, i) => {
        return (
          <li key={i}>
            <a className={s.news__link} href={item.link}>{item.title}</a>
          </li>
        )
      })}
      </ul>
      <p><Link className={`${s.news__link} ${s.news__link__special}`} to={link.url}>{link.text}</Link></p>
    </div>
  )
}