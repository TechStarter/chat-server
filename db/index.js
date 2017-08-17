const mongoose = require('mongoose');
const config = require('config')['mongoose'];
mongoose.Promise = require('bluebird');
mongoose.connect(`${config.client}://${config.connection.host}/${config.connection.database}`, {
  useMongoClient: true
});

const messageSchema = mongoose.Schema({
  type: String,
  status: String,
  creatorId: Number
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
