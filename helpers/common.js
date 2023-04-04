const bcrypt = require('bcryptjs');

const saltSounds = 10;

exports.verifyJoiSchema = async (data, schema) => schema.validate(data);

exports.generateNewPassword = text => bcrypt.hashSync(text, saltSounds);

exports.comparePassword = (text, hash) => bcrypt.compare(text, hash);