import React, { useEffect, useState } from "react";
import { getPatients } from "./services";
import Table from "./components/Table/Table";
import _ from "lodash";
import "./App.sass";
import Search from "./components/Search/Search";
import Hero from "./components/UI/Hero";
import Questionare from "./components/Questionaire";
import Questionaire from "./components/Questionaire";
const App = (props) => {
  const [data, setData] = useState("");
  const [dateFetched, setDateFetched] = useState(null);
  const fetchData = async (name, date) => {
    try {
      if (name || date) {
        setData(await getPatients(name, date));
      } else {
        setData(await getPatients());
      }
      setDateFetched(new Date());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Hero />
      {dateFetched && <h1></h1>}
      <Search
        fetchData={fetchData}
        fetchString={
          dateFetched &&
          `Results as of ${dateFetched.toDateString()}
         at 
          ${dateFetched.toLocaleTimeString()}`
        }
      />
      <Table data={data}>Check the console!</Table>;
      <Questionaire />
    </>
  );
};

export default App;
