import React, { useState, useEffect } from 'react';
import styles from './UserList.module.scss';

const UserList = ({ socket }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    socket.on('userList', (data) => {
      setUserList(data);
    });
  }, [socket]);

  const getUserList = () => {
    let result = [];
    for (let user of userList) {
      result.push(<div className={styles.singleUser}>{user.name + ' '}</div>);
    }
    return result;
  };

  return (
    <div className={styles.UserList} data-testid="UserList">
      <div className={styles.listHeader}>
        <span>Fellow Artists Connected:</span>
      </div>
      {getUserList()}
    </div>
  );
};

export default UserList;
