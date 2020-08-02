import React, { useState, useEffect } from "react";
import styles from "./UserList.module.scss";

const UserList = ({socket}) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    socket.on('userList', (data) => {
      setUserList(data)
    })
  },[])

  const getUserList = () => {
    const result = [];
    for(let user of userList) {
      result.push(user.name)
    }
    return result;
  }

  return (
  <div className={styles.UserList} data-testid="UserList">
    {getUserList()}
  </div>
  );
};

export default UserList;
