import { Route, Switch } from 'react-router-dom';

import { Layout } from './components/layout/Layout';

import { Index } from './pages/Index';
import { NewsPage } from './pages/News';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Layout title="RÚV fréttir">
      <section>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route exact path="/:id(allar|innlent|erlent|ithrottir|menning)" component={NewsPage} />
          <Route component={NotFound} status={404} />
        </Switch>
      </section>
    </Layout>
  );
}
