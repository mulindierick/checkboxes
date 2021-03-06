import React, { useEffect, useState, useRef } from "react";

const Checkboxes = () => {
  const [submitData, setSubmitData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const inputEl = useRef([]);

  console.log("final data", submitData);

  useEffect(() => {
    fetch("https://erick-mulindi-chat-server.glitch.me/messages")
      .then((data) => data.json())
      .then((data) => {
        setSelectedData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const checkChildBox = (e) => {
    let childId = e.target.id;
    let checkedItems = selectedData.map((parent) => {
      return parent.children.map((child) => {
        if (child.id === childId && e.target.checked === true) {
          if (!submitData.includes(parent.id)) {
            submitData.push(parent.id);
          }
          submitData.push(child.id);
          inputEl.current[parent.id].checked = true;
          return child;
        }
        if (child.id === childId && e.target.checked === false) {
          let filteredData = submitData.filter((item) => item !== e.target.id);
          setSubmitData(filteredData);
          return child;
        } else {
          return child;
        }
      });
    });
    selectedData.forEach((parent, index) => {
      parent["children"] = checkedItems[index];
    });
    setSelectedData(selectedData);
  };

  const checkParentBox = (e) => {
    let checkedItems = selectedData.map((parent) => {
      if (parent.id === e.target.id && e.target.checked === true) {
        if (!submitData.includes(parent.id)) {
          submitData.push(parent.id);
        }
        return parent;
      }
      if (parent.id === e.target.id && e.target.checked === false) {
        let filteredData = submitData.filter((item) => item !== e.target.id);
        setSubmitData(filteredData);
        return parent;
      } else {
        return parent;
      }
    });
    setSelectedData(checkedItems);
  };

  return (
    <div>
      <p>these are the check boxes</p>
      <form>
        {selectedData ? (
          selectedData.map((parent) => {
            return (
              <div key={parent.id + 1}>
                <label key={parent.id + 2}>
                  <input
                    ref={(el) => (inputEl.current[parent.id] = el)}
                    onChange={(e) => checkParentBox(e)}
                    id={parent.id}
                    type="checkbox"
                  />
                  {parent.name}
                </label>
                <div>
                  {parent.children ? (
                    parent.children.map((child) => {
                      return (
                        <label key={child.id + 1}>
                          <input
                            onChange={(e) => checkChildBox(e)}
                            id={child.id}
                            type="checkbox"
                          />
                          {child.name}
                        </label>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </form>
      <button onClick={() => console.log(submitData)}>Submit</button>
    </div>
  );
};

export default Checkboxes;
