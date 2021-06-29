import React, { useEffect } from "react";
import { useState } from "react";
import { Form, CustomInput } from "reactstrap";
import db from "../db.json";

const Main = () => {
  const [data, setData] = useState();
  const [filtered, setFiltered] = useState();
  const [filterOptions, setFilterOptions] = useState({});
  const [keys, setKeys] = useState([]);
  const [stateObj, setStateObj] = useState();
  let obj;

  useEffect(() => {
    let kys = [];
    if (db) {
      db.forEach((val) => {
        Object.keys(val).filter((v, i, ar) => {
          if (ar.indexOf(v) === i) {
            kys.push(v);
          }
        });
      });
    }

    let unique = kys.filter((v, i, ar) => ar.indexOf(v) === i);

    unique.forEach((val, ind) => {
      let tmp = [];
      db.forEach((dVal) => {
        tmp.push(dVal[val]);
        obj = {
          ...obj,
          [unique[ind]]: tmp.filter((v, i, ar) => ar.indexOf(v) === i),
        };
      });
    });

    setData(db);
    setKeys(unique);
    setStateObj(obj);
  }, []);

  const handleFilter = (e) => {
    const { name, value, checked } = e.target;
    let tmpObj = filterOptions;

    if (checked) {
      // Code for checkbox check
      if (!tmpObj[name]) {
        tmpObj = {
          ...tmpObj,
          [name]: [value],
        };
      } else {
        tmpObj[name].push(value);
      }
    } else {
      // Code for filtering using name.
      if (name === "name") {
        tmpObj = {
          ...tmpObj,
          [name]: [value],
        };
      } else {
        tmpObj = {
          ...tmpObj,
          [name]: tmpObj[name].filter((v) => v !== value),
        };
      }

      if (tmpObj[name].length === 0 || tmpObj.name?.[0] == "") {
        delete tmpObj[name];
      }
    }

    let filteredData = applyFilter(data, tmpObj);

    setFilterOptions(tmpObj);
    setFiltered(filteredData);
  };

  const applyFilter = (arr, filter) => {
    const keys = Object.keys(filter);
    return arr.filter((val) => {
      return keys.every((k) => {
        if (!filter[k].length) return true;
        if (k === "name") return val[k].includes(filter[k]);
        return filter[k].includes(val[k]);
      });
    });
  };

  return (
    <div className="row">
      {stateObj &&
        Object.values(stateObj).map((val, ind) => (
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
                          onChange={(e) => handleFilter(e)}
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
                  onChange={(e) => handleFilter(e)}
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
          {data &&
            !filtered &&
            Object.values(data).map((val, ind) => (
              <tr>
                {Object.values(val).map((vals, index) => (
                  <td>{vals}</td>
                ))}
              </tr>
            ))}
          {filtered &&
            Object.values(filtered).map((val, ind) => (
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
