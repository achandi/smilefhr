import React, { useState, useEffect, useReducer } from "react";
import { getPractitioners } from "../services";
import questionaire from "../assets/questionnaire.json";

const valInit = (test) =>
  test === "boolean" ? false : test === "date" ? null : "";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_UP":
      return [...state].map((el) => {
        if (el.type === "group") {
          const groupInit = el.item.map((groupItem) => ({
            ...groupItem,
            answer: valInit(groupItem.type),
          }));
          return { ...el, item: groupInit };
        } else {
          return { ...el, answer: valInit(el.type) };
        }
      });
    case "CHANGE_STATE":
      const newState = [...state].reduce((acc, val) => {
        const splitId = action.id.split(".")[0];
        if (val.linkId === splitId) {
          if (val.item) {
            const reducedGroup = val.item.reduce((accIn, valIn) => {
              if (valIn.linkId === action.id) {
                valIn.answer = action.answer;
              }
              return [...accIn, valIn];
            }, []);

            return [...acc, { ...val, item: reducedGroup }];
          } else {
            val.answer = action.answer;
            return [...acc, val];
          }
        } else {
          return [...acc, val];
        }
      }, []);
      return newState;
      //  const getElem = [...state].filter((elem) => ( val.linkId === action.id.split('.')[0]))[0];

      //  newState.filter((el) => el.linkId ==

      break;
    default:
      return state;
  }
};
const Questionaire = (props) => {
  const [state, dispatch] = useReducer(reducer, questionaire.item);
  const [listForm, setlistForm] = useState(false);
  useEffect(() => {
    dispatch({ type: "SET_UP" });
  }, []);

  const validation = (type, val) => {
    if (type === "boolean" && typeof val === "boolean") {
      return true;
    } else if (
      type === "date" &&
      new Date(val) !== "Invalid Date" &&
      !isNaN(new Date(val))
    ) {
      return true;
    } else if (type === "string" && !/\d/.test(val)) {
      return true;
    } else {
      return false;
    }
  };
  const getanswer = (event) => {
    console.log(event.target.id);
    const type = event.target.getAttribute("isType");
    const vals = type === "boolean" ? event.target.checked : event.target.value;
    if (validation(type, vals)) {
      dispatch({
        type: "CHANGE_STATE",
        answer: vals,
        id: event.target.id,
      });
    } else {
      alert(vals + " enetered incorrect format must be " + type);
    }
  };

  const createInput = (item) => (
    <>
      <label class="label">{item.text}</label>
      <div class="control">
        <input
          onChange={getanswer}
          answer={item.answer}
          id={item.linkId}
          type={`${
            item.type === "boolean"
              ? "checkbox"
              : item.type === "date"
              ? "date"
              : "text"
          }`}
          checked={item.type === "boolean" ? item.answer : null}
          isType={item.type}
          placeholder="Text input"
        />
      </div>
    </>
  );

  let form = "";
  let vasr = state.map((item, ind) => {
    console.log(state);
    if (item.type === "group") {
      return (
        <>
          <label class="label">{item.text}</label>
          <div class="field">
            {item.item.map((groupItem) => createInput(groupItem))}
          </div>
        </>
      );
    } else {
      return <div class="field">{createInput(item)}</div>;
    }
  });
  const formHandler = (event) => {
    event.preventDefault();
    setlistForm({ ...questionaire, item: [...state] });
  };
  return (
    <div class="section">
      <form onSubmit={formHandler} className="form">
        {vasr || null}

        <button type="submit">Submit</button>
      </form>
      {listForm && <pre>{JSON.stringify(listForm, undefined, 2)}</pre>}
    </div>
  );
};

export default Questionaire;
