import React from "react";

const Switches = ({ data }) => {
  let keys = Object.keys(data[0]);
  let t = [];
  const handleObject = (key) => {
    const d = data.map((obj) => obj[key]);
    const set = [...new Set(d)];
    t.push(set);
    // return t;
  };

  console.log(
    `data[0]`,
    Object.keys(data[0]).map((val) => handleObject(val))
  );

  return (
    <>
      {/* {set &&
        set.map((val) => (
          <>
            <label>
              <input type="checkbox" name={val} />
              {val}
            </label>
          </>
        ))} */}
    </>
  );
};

export default Switches;
