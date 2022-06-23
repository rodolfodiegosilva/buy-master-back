const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const address = mongoose.Schema({
    address: {type: String, required: false},
    city: {type: String, required: false},
    coordinates: {lat: {type: Number, required: false}, lng: {type: Number, required: false}},
    postalCode: {type: String, required: false},
    state: {type: String, required: false},
}, {
    timestamps: true,
})

const bank = mongoose.Schema({
    cardExpire: {type: String, required: false},
    cardNumber: {type: String, required: false},
    cardType: {type: String, required: false},
    currency: {type: String, required: false},
    iban: {type: String, required: false},
}, {
    timestamps: true,
})

const userDataSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Gets id of User
        required: false,
        ref: 'User', // Adds relationship between Product and User
    },
    firstName: {
        type: String, required: false
    },
    age: {
        type: Number, required: false
    },
    height: {
        type: Number, required: false
    },
    weight: {
        type: Number, required: false
    },
    lastName: {
        type: String, required: false
    },
    maidenName: {
        type: String, required: false
    },
    gender: {
        type: String, required: false
    },
    email: {
        type: String, required: false
    },
    phone: {
        type: String, required: false
    },
    birthDate: {
        type: String, required: false
    },
    image: {
        type: String, required: false
    },
    bloodGroup: {
        type: String, required: false
    },
    //address: {address},
    macAddress: {
        type: String, required: false
    },
    university: {
        type: String, required: false
    },
    bank: {bank},
    company: {
        address,
        department: {
            type: String, required: false
        },
        name: {
            type: String, required: false
        },
        title: {
            type: String, required: false
        },
    },
    ein: {
        type: String, required: false
    },
    ssn: {
        type: String, required: false
    },
    userAgent: {
        type: String, required: false
    }
});

module.exports = mongoose.model('UserData', userDataSchema);