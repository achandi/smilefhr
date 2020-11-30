import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default (props) => {
  const [date, setDate] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(date);
      props.fetchData(name, date);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [name, date]);
  return (
    //     <nav class="panel">
    //   <p class="panel-heading">
    //     Repositories
    //   </p>
    //   <div class="panel-block">
    //   </div>
    //   <div class="panel-block">

    //   </div>
    //   </nav>
    <nav class="panel is-warning">
      <p class="panel-heading">Search Options - {props.fetchString}</p>
      <div className="columns panel-block">
        <div className="column is-one-fifth">
          <DatePicker
            dateFormat="yyyy/MM/dd"
            placeholderText="YYYY/MM/DD"
            selected={date}
            onChange={(date) => setDate(date)}
            className="input"
          />
          <input
            onChange={(event) =>
              !/\d/.test(event.target.value) && setName(event.target.value)
            }
            value={name}
            className="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>
    </nav>
  );
};
