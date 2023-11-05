let mysql = require("mysql");

function saveMessage(data) {
  let { username, room, message } = data;
  let { DB_HOST, DB_PASS, DB_DATABASE, DB_USER } = process.env;
  let connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
  });

  return new Promise((resolve, reject) => {
    connection.connect();
    connection.query(
      `insert into messages (sender_id, message_text, room_id) values ('${username}', '${message}', '${room}')`,
      (error, results) => {
        if (error) {
          reject(error);
        }

        console.log("results: ", results); // deleteme
        resolve(results);
      },
    );
    connection.end();
  });
}

// export saveMessage function
module.exports = {
  saveMessage,
};
