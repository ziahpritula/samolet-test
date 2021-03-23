import { useEffect, useState } from "react";
import { getLibraryRegions } from "./api";

const App = () => {
  const [, setData] = useState([]);
  const [, setStateData] = useState("idle");

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

  return null;
}

export default App;
