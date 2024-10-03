"use client";

import { useState, useEffect } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Controls from "./controls";
import Modal from "./modal";

import { User } from "./types/user";

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [group, setGroup] = useState("");
  const [order, setOrder] = useState("");

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleFiltering = async (group: any, order: string) => {
    if (group) {
      setGroup(group)
    }
    if (order) {
      setOrder(order)
    }

    if (group && order) {
      if (order == "ascending") {
        if (group == "company") {
          setUsersList(usersList.sort((a: any, b: any) => a.company.name.localeCompare(b.company.name)));
        } else {
          setUsersList(usersList.sort((a: any, b: any) => a[group].localeCompare(b[group])));
        }
      } else if (order == "descending") {
        if (group == "company") {
          setUsersList(usersList.sort((a: any, b: any) => b.company.name.localeCompare(a.company.name)));
        } else {
          setUsersList(usersList.sort((a: any, b: any) => b[group].localeCompare(a[group])));
        }
      }
    } else if (!group && order) {
      if (order == "ascending") {
        setUsersList(usersList.sort((a: any, b: any) => a.id-b.id));
      } else if (order == "descending") {
        setUsersList(usersList.sort((a: any, b: any) => b.id-a.id));
      }
    } else if (group && !order) {
      if (group == "company") {
        setUsersList(usersList.sort((a: any, b: any) => a.company.name.localeCompare(b.company.name)));
      } else {
        setUsersList(usersList.sort((a: any, b: any) => a[group].localeCompare(b[group])));
      }
    }

  }

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls getGroupFilter={handleFiltering} />
      </div>
      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
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
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
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
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
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
