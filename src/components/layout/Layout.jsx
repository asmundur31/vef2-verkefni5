import PropTypes from 'prop-types'; 

import s from './Layout.module.scss';

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
}

export function Layout({ title, children }) {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>{title}</h1>
      </header>
      <main className={s.layout__main}>
        {children}
      </main>
      <hr></hr>
      <footer className={s.layout__footer}>
        <p>Fréttir frá <a href="https://www.ruv.is/rss">RÚV</a></p>
      </footer>
    </div>
  )
}
