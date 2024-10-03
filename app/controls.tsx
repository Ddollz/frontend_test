import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";

const Controls = ({ getGroupFilter }: any) => {
  const [countries, setCountries] = useState([] || null);
  const [regions, setRegion] = useState([] || null);

  const [group, setGroup] = useState([]);
  const [order, setOrder] = useState([]);

  const firstRender = useRef(true);
  const handleChange=(selectedOption:any)=>{
    setGroup(selectedOption.map((e:any)=>e.value))
  }
  const handleChangeRegion = (selectedOption: any) => {
    setOrder(selectedOption.map((e: any) => e.value))
    // console.log(rendercount.current)
  }
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=name,region")
      .then(res => {
        let resultArr: any = []
        let resultArr2: any = []
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          let obj = { ...element, label: element.name.common, value: element.name.common }
          resultArr.push(obj)

          let obj2 = { ...element, label: element.region, value: element.region }
          if (!(resultArr2.filter((e: any) => e.value === obj2.value).length > 0))
            resultArr2.push(obj2)
        }
        if (resultArr.length > 0)
          setCountries(resultArr)
        if (resultArr2.length > 0)
          setRegion(resultArr2)

        if (firstRender.current) {
          setGroup(resultArr.map((e: any) => e.value))
          setOrder(resultArr2.map((e: any) => e.value))
          getGroupFilter(group, order)
          firstRender.current = false;
          return;
        }
      })
      .catch(err => console.log(err))
    getGroupFilter(group, order)
  }, [group, order, getGroupFilter])
  return (
    <div className="gallery-controls controls">
      <div className="form-group group" style={{ marginRight: "10px" }}>
        <label htmlFor="sort-field" className="label">
          Country
        </label>
        <Select options={countries}
          inputId="sort-field"
          className="input"
          placeholder="Select Country"
          isMulti
          onChange={handleChange}
        />
      </div>

      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Region
        </label>

        <Select options={regions}
          inputId="sort-field"
          className="input"
          placeholder="Select Region"
          isMulti
          onChange={handleChangeRegion}
        />
      </div>
    </div>
  );
};

export default Controls;
