"use client";

import { useState, useEffect } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaPeopleRoof,
} from "react-icons/fa6";

import {
  FaMapMarkedAlt,
} from "react-icons/fa";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import Controls from "./controls";
import Modal from "./modal";

import { Country } from "./types/user";

export type GalleryProps = {
  countries: Country[];
};
const Gallery = ({ countries }: GalleryProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryList, setCountries] = useState(countries);
  const [group, setGroup] = useState("");
  const [order, setOrder] = useState("");

  const handleModalOpen = (name: number) => {
    const country = countryList.find((item) => item.name === name) || null;
    console.log(country)
    if (country) {
      setSelectedCountry(country);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedCountry(null);
    setIsModalOpen(false);
  };

  const handleFiltering = (group: any, order: any) => {
    if (group) {
      setGroup(group)
    }
    if (order) {
      setOrder(order)
    }
    if (group.length < 0 || order.length < 0) {
      setCountries(countries)
    }
  }

  return (
    <div className="user-gallery">
      <h1 className="heading">
        Countries
        <Controls getGroupFilter={handleFiltering} />
      </h1>
      <div className="items">
        {countryList.length > 0 ? countryList
          .filter(e => { return group.includes(e.name.common) || group.length <= 0 })
          .filter(e => { return order.includes(e.region) || order.length <= 0 }).map((country, index) => (
            <div
              className="item user-card"
              key={index}
              onClick={() => handleModalOpen(country.name)}
            >
              <div className="body">
                <Avatar
                  size={96}
                  name={country.name}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
              </div>
              <div className="info">
                <div className="name">{country.name.common} ({country.region})</div>
                <div className="company">{country.name.official}</div>
              </div>
            </div>
          )) : null}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedCountry && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      variant="marble"
                      src={selectedCountry.flags.png}
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedCountry.name.common}
                    <div className="value">{selectedCountry.name.official}</div>
                  </div>
                  <div className="field">
                    <FaMapMarkedAlt className="icon" />
                    <div className="value">{selectedCountry.region}</div>
                  </div>
                  <div className="field">
                    <FaPeopleRoof className="icon" />
                    <div className="value">{selectedCountry.population}</div>
                  </div>
                  <div className="field">
                    <TbWorldLatitude className="icon" />
                    <div className="value">{selectedCountry.latlng[0]}</div>
                    <TbWorldLongitude className="icon" style={{ marginLeft: "10px" }} />
                    <div className="value">{selectedCountry.latlng[1]}</div>
                  </div>
                  <div className="company">
                    {/* <div className="name">{selectedCountry.company.name}</div> */}
                    <div className="catchphrase">
                      {/* {selectedCountry.company.catchPhrase} */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
