import React, { useEffect } from "react";
import { useState } from "react";
import { Form, CustomInput } from "reactstrap";
import db from "../db.json";

const Main = () => {
  const [state, setState] = useState();
  let data = db;
  let keys = [];
  data.forEach((val) => {
    Object.keys(val).filter((v, i, ar) => {
      if (ar.indexOf(v) === i) {
        keys.push(v);
      }
    });
  });

  keys = keys.filter((v, i, ar) => ar.indexOf(v) === i);

  let obj = state;
  keys.forEach((val, ind) => {
    let tmp = [];
    db.forEach((dVal) => {
      // let set = [...new Set(dVal[val])];
      // console.log(`set`, set);
      // obj.push(dVal[val]);
      tmp.push(dVal[val]);
      obj = {
        ...obj,
        [keys[ind]]: tmp.filter((v, i, ar) => ar.indexOf(v) === i),
      };
    });
  });

  let check = [];
  let filtered;

  const handleCheckChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(`value`, value, `name`, name);
    if (checked) {
      check.push({ [name]: value });
    } else {
      check = check.filter((v) => Object.values(v)[0] !== value);
    }
    console.log(`check`, check);
    let tmp;
    Object.values(check).forEach((v) => {
      if (filtered) {
        tmp = filtered.filter((vls, i) => vls[name] === v[name]);
      } else {
        tmp = db.filter((vls, i) => vls[name] === v[name]);
      }
      console.log(`tmp`, tmp);
    });
    filtered = tmp;
    console.log(`filtered`, filtered);
    // console.log(
    //   `tmp filter`,
    //   tmp.filter((v, i) => v[name] === value)
    // );
  };
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    console.log(`value`, value, `name`);
    let tt = db.filter((v, i) => v[name] === value);
    console.log(`tt`, tt);
  };

  // setState(obj);

  return (
    <div className="row">
      {Object.values(obj).map((val, ind) => (
        <>
          <div>
            {keys[ind] !== "id" && keys[ind] !== "name" && keys[ind]}
            {keys[ind] !== "id" &&
              val.map((vals) => (
                <>
                  {vals && keys[ind] !== "name" && (
                    <label>
                      <input
                        type="checkbox"
                        name={keys[ind]}
                        value={vals}
                        onChange={(e) => handleCheckChange(e)}
                      />
                      {vals}
                    </label>
                  )}
                </>
              ))}
            {keys[ind] === "name" && (
              <input
                type="search"
                name={keys[ind]}
                placeholder="Search name"
                onChange={(e) => handleSearchChange(e)}
              />
            )}
          </div>
        </>
      ))}

      <table>
        <thead>
          <tr>{keys && keys.map((val, ind) => <th>{val}</th>)}</tr>
        </thead>
        <tbody>
          {obj &&
            Object.values(db).map((val, ind) => (
              <tr>
                {Object.values(val).map((vals, index) => (
                  <td>{vals}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
