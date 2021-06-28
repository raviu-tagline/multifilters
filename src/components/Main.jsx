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
  // let filter;
  let obj;

  useEffect(() => {
    console.log(`first`);
    setData(db);
  }, []);

  useEffect(() => {
    let kys = [];
    if (data) {
      data.forEach((val) => {
        Object.keys(val).filter((v, i, ar) => {
          if (ar.indexOf(v) === i) {
            kys.push(v);
            // setKeys((old) => [...old, v]);
          }
        });
      });
    }

    let unique = kys.filter((v, i, ar) => ar.indexOf(v) === i);

    setKeys(unique);
    // filter = filterOptions;
  }, [data]);

  useEffect(() => {
    keys.forEach((val, ind) => {
      let tmp = [];
      data.forEach((dVal) => {
        tmp.push(dVal[val]);
        obj = {
          ...obj,
          [keys[ind]]: tmp.filter((v, i, ar) => ar.indexOf(v) === i),
        };
      });
    });

    setStateObj(obj);
  }, [keys]);

  /* const handleCheckChange = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      if (Object.keys(filter).length !== 0) {
        if (!filter[name]) {
          filter = {
            ...filter,
            [name]: [value],
          };
        } else {
          filter[name].push(value);
        }
      } else {
        filter = {
          [name]: [value],
        };
      }
    } else {
      filter = {
        ...filter,
        [name]: filter[name].filter((v) => v !== value),
      };

      if (filter[name].length === 0) {
        delete filter[name];
      }
    }

    let filteredData = applyFilter(data, filter);
    // let filteredData;

    // console.log(`filter`, filter, data);

    // if (!filtered) {
    //   filteredData = applyFilter(data, filter);
    // } else {
    //   filteredData = applyFilter(filtered, filter);
    // }
    setFilter(filter);
    setFiltered(filteredData);
  }; */

  /* const handleSearchChange = (e) => {
    const { name, value } = e.target;
    console.log(`value`, value, `name`);
    let fltr = {
      [name]: [value],
    };
    let tt;
    // console.log(`tt`, tt);

    // console.log(`fltr`, fltr);
    if (!filtered) {
      tt = data.filter((v) => v[name].includes(value));
      // tt = applyFilter(data, fltr);
      // console.log(`tt in if`, tt);
    } else {
      // console.log(`else`);
      tt = data.filter((v) => v[name].includes(value));
      // tt = applyFilter(filtered, fltr);
      // console.log(`tt in else`, tt);
    }

    console.log(`tt before set`, tt);
    // console.log(`tt`, tt);
    // let tt = applyFilter(data, fltr);
    setFiltered(tt);

    // setFiltered(...filtered, tt);
  }; */

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
