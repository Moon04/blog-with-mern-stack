const mongoose = require('mongoose');

exports.isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}