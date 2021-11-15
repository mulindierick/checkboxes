import React, { useEffect, useState } from "react";

const Checkboxes = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  console.log("selected", selectedData);

  useEffect(() => {
    fetch("https://erick-mulindi-chat-server.glitch.me/messages")
      .then((data) => data.json())
      .then((data) => {
        setOriginalData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let copyOriginalData = JSON.parse(JSON.stringify(originalData));
    setSelectedData(copyOriginalData);
  }, [originalData]);

  const checkBox = (e) => {
    let childId = e.target.id;
    let parentChildIds = childId.split("_");
    let parentId = Number(parentChildIds[0])
    childId = Number(parentChildIds[1]);
    let checkedItems = selectedData.map((parent) => {
      return parent.children.map((child) => {
        if (Number(child.id) === childId && child.isChecked === false) {
          child.isChecked = true;
          return child;
        }
        if (Number(child.id) === childId && child.isChecked === true) {
          child.isChecked = false;
          return child;
        } else {
          return child;
        }
      });
    });
    originalData.forEach((parent, index) => {
      parent["children"] = checkedItems[index];
    });
    setSelectedData(originalData);
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
                    onChange={(e) => checkBox(e)}
                    id={parent.id}
                    type="checkbox"
                  />
                  {parent.name}
                </label>
                <div>
                  {parent.children ? (
                    parent.children.map((child, index) => {
                      return (
                        <label key={child.id + 1}>
                          <input
                            onChange={(e) => checkBox(e)}
                            id={parent.id + "_" + child.id}
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
      <button>Submit</button>
    </div>
  );
};

export default Checkboxes;

// notes
// create relationship between child and parent
// if any child is selected, parent is automatically selected
// what happens if parent only is selected ?
// if nothing happens, we then do not need parent to be a selector
