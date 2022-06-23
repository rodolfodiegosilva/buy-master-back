const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const address = mongoose.Schema({
    address: {type: String, required: false},
    city: {type: String, required: false},
    coordinates: {lat: {type: Number, required: true}, lng: {type: Number, required: true}},
    postalCode: {type: String, required: true},
    postalCode: {type: String, required: true},
    state: {type: String, required: true},
}, {
    timestamps: true,
})

const bank = mongoose.Schema({
    cardExpire: {type: String, required: true},
    cardNumber: {type: String, required: true},
    cardType: {type: String, required: true},
    currency: {type: String, required: true},
    iban: {type: String, required: true},
}, {
    timestamps: true,
})

const userSchema = new Schema({
    username: {
        type: String, required: true
    },
    firstName: {
        type: String, required: true
    },
    age: {
        type: Number, required: true
    },
    height: {
        type: Number, required: true
    },
    weight: {
        type: Number, required: true
    },
    lastName: {
        type: String, required: true
    },
    maidenName: {
        type: String, required: true
    },
    gender: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    phone: {
        type: String, required: true
    },
    birthDate: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    bloodGroup: {
        type: String, required: true
    },
    //address: {address},
    macAddress: {
        type: String, required: true
    },
    university: {
        type: String, required: true
    },
    bank: {bank},
    company: {
        address,
        department: {
            type: String, required: true
        },
        name: {
            type: String, required: true
        },
        title: {
            type: String, required: true
        },
    },
    ein: {
        type: String, required: true
    },
    ssn: {
        type: String, required: true
    },
    userAgent: {
        type: String, required: true
    },
    roles: {
        User: {
            type: Number, default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String, required: true
    },
    refreshToken: [String]
});

module.exports = mongoose.model('User', userSchema);