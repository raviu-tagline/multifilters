import React, { useEffect } from "react";
import { useState } from "react";
import { Form, CustomInput } from "reactstrap";
import db from "../db.json";

const Main = () => {
  const [data, setData] = useState();
  const [filtered, setFiltered] = useState();
  const [filterOptions, setFilter] = useState({});
  let keys = [];

  if (data) {
    data.forEach((val) => {
      Object.keys(val).filter((v, i, ar) => {
        if (ar.indexOf(v) === i) {
          keys.push(v);
        }
      });
    });
  }

  keys = keys.filter((v, i, ar) => ar.indexOf(v) === i);

  let obj;
  keys.forEach((val, ind) => {
    let tmp = [];
    db.forEach((dVal) => {
      tmp.push(dVal[val]);
      obj = {
        ...obj,
        [keys[ind]]: tmp.filter((v, i, ar) => ar.indexOf(v) === i),
      };
    });
  });

  let filter = filterOptions;

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
    if (Object.keys(filter).length !== 0) {
      if (!filter[name]) {
        filter = {
          ...filter,
          [name]: [value],
        };
        console.log(`IF IF`);
      } else {
        filter[name].push(value);
        console.log(`ELSE IF`);
      }
    } else {
      filter = {
        [name]: [value],
      };
      console.log(`ELSE`, filter);
    }
    if (!checked || value === "") {
      filter = {
        ...filter,
        [name]: filter[name].filter((v) => v !== value),
      };

      if (filter[name].length === 0) {
        console.log(`Inner if`, filter[name]);
        delete filter[name];
      }
    }

    console.log(`filter`, filter);
    let filteredData = applyFilter(data, filter);

    setFilter(filter);
    setFiltered(filteredData);
  };

  const applyFilter = (arr, filter) => {
    const keys = Object.keys(filter);
    return arr.filter((val) => {
      return keys.every((k) => {
        if (!filter[k].length) return true;
        return filter[k].includes(val[k]);
      });
    });
  };

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <div className="row">
      {obj &&
        Object.values(obj).map((val, ind) => (
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
