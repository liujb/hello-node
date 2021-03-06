/**
 *
 * @authors Your Name (you@example.org)
 * @date    2013-09-23 17:11:02
 * @version $Id$
 */
// require setting.js
var setting = require("./setting.js");

// require mongodb
// must use npm to install mongodb
var Mongo = require('mongodb'),
  Db = Mongo.Db,
  Connection = Mongo.Connection,
  Server = Mongo.Server;
// Connection.DEFAULT_PORT

// Create a Db instance
var db = new Db(setting.db, new Server(setting.localhost, setting.port, {}));

// interface
module.exports = db;
