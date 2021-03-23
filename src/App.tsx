import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import RegionsTable from "./components/RegionsTable";
import Region from "./components/Region";
import Loader from "./components/Loader";
import Error from './components/Error';
import NoData from './components/NoData';
import { getLibraryRegions } from "./api";

const App = () => {
  const [data, setData] = useState([]);
  const [stateData, setStateData] = useState("idle");

  useEffect(() => {
    (async () => {
      setStateData("loading");

      try {
        const payload = await getLibraryRegions();
        setData(payload.data);
        setStateData("finished");
      } catch (error) {
        setStateData("error");
      }
    })();
  }, []);

  let result;

  if (stateData === "loading") {
    result = <Loader size={48} />
  }

  
  if (stateData === "loading") {
    result = <Loader size={48} />
  }

  if (stateData === "error") {
    result = <Error />
  }

  if (stateData === "finished") {
    if (data.length === 0) {
      result = <NoData />;
    } else {
      result = (
        <Switch>
          <Route path="/regions/:regionId">
            <Region regions={data} />
          </Route>
          <Route path="/">
            <RegionsTable regions={data} />
          </Route>
        </Switch>
      );
    }
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Content className="content">
          {result}
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
