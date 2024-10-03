import { useState, useEffect } from "react";
import Select from "react-select";

const Controls = ({ getGroupFilter }: any) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];
  const [group, setGroup] = useState("");
  const [order, setOrder] = useState("");
  // const handleFiltering = (value: any, type: string) => {
  //   getGroupFilter(value, type);
  // }
  // const handleFiltering = (group: any, ordering: any, type: string) => {
  //   getGroupFilter(group,ordering, type);
  // }
  useEffect(() => {
    console.log("ran Use Effect", group, order)
    getGroupFilter(group, order)
  })
  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>

        <Select options={fieldOptions}
          inputId="sort-field"
          className="input"
          onChange={(option) => option ? setGroup(option.value) : ""}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          onChange={(option) => option ? setOrder(option.value) : ""}
        />
      </div>
    </div>
  );
};

export default Controls;
