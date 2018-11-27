// [
//   {
//     id: "/#12hdffshdfahi",
//     name: "Damian",
//     room: "The Office Fans"
//   }
// ];

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUsers(room)

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  getUser(id) {
    const user = this.users.find(resUser => resUser.id === id);
    return user;
  }

  removeUser(id) {
    const user = this.getUser(id);
    this.users = this.users.filter(remUser => remUser.id !== id);
    return user;
  }

  getUsers(room) {
    const users = this.users.filter(user => user.room === room);
    const userNames = users.map(user => user.name);
    return userNames;
  }
}

module.exports = { Users };
