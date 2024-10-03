"use client";
import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./gallery";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    // declare the data fetching function
    const fetchData = async () => {

      setLoading(true);
      await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,population,region,currencies,latlng")
        .then(async res => {
          const result = await res.data;
          let resultArr: any = []
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            let obj = { ...element, label: element.name.common, value: element.name.common }
            resultArr.push(obj)
          }
          if (resultArr.length > 0)
            setCountries(resultArr)
          console.log(resultArr)

        })
        .catch(err => console.log(err))
    }

    fetchData()
    setLoading(false);
  }, [])

  return (
    <main className={styles.main}>
      {countries.length > 0 ?
        <Gallery countries={countries} /> : null
      }
    </main>
  );
}
