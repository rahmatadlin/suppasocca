import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ date, setDate }) => {
  return (
    <DatePicker
      selected={date}
      onChange={(date = Date()) => setDate({ date })}
      placeholderText={"e.g. 01/01/1911"}
      customInput={
        <input type="text" className="input" name="gamePosition"></input>
      }
    ></DatePicker>
  );
};

export default Datepicker;
