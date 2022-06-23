const users = require('./model/users')
const User = require('./model/User.model')
const products = require('./model/products')
const Product = require('./model/Product.model')
const carts = require('./model/carts')
const Cart = require('./model/Cart.model')
const connectDB = require('./config/dbConn')
const bcrypt = require('bcrypt');

connectDB()
User.deleteMany().then(function () {
    console.log("Users data deleted");
}).catch(function (error) {
    console.log(error);
});

users.map(async (user) => {
    const hashedPwd = await bcrypt.hash(user.password, 10);
    User.insertMany({...user, password: hashedPwd}).then(function () {
        console.log("Users data inserted");
    }).catch(function (error) {
        console.log(error);
    });
})

User.find().then(function (users) {
    console.log("Users dat finded");
    const adminUser = users[0]._id

    const sampleProducts = products.map((product) => {
        return {...product, user: adminUser}
    })
    Product.deleteMany().then(function () {
        console.log("Products data deleted");
    }).catch(function (error) {
        console.log(error);
    });

    Product.insertMany(sampleProducts).then(function (insertedProducts) {
        console.log("Products data inserted")

        Cart.deleteMany().then(function () {
            console.log("Carts data deleted");
        }).catch(function (error) {
            console.log(error);
        });

        let i = 0;
        const sampleCarts = carts.map((cart) => {
            console.log(users)
            const cartUser = users[Math.floor(Math.random() * insertedProducts.length)]._id
            i++;
            const product1 = insertedProducts[Math.floor(Math.random() * insertedProducts.length)]._id;
            const product2 = insertedProducts[Math.floor(Math.random() * insertedProducts.length)]._id;
            const product3 = insertedProducts[Math.floor(Math.random() * insertedProducts.length)]._id;
            return {...cart, products: [product1, product2, product3], user: cartUser}
        })

        Cart.insertMany(sampleCarts).then(function () {
            console.log("Carts data inserted");
        }).catch(function (error) {
            console.log(error);
        });

    }).catch(function (error) {
        console.log(error);
    });
}).catch(function (error) {
    console.log(error);
});

// const importData = async () => {
//     await User.deleteMany().then(function () {
//         console.log("Users data deleted");
//
//         users.map(async (user) => {
//             const hashedPwd = await bcrypt.hash(user.password, 10);
//             User.insertMany({...user, password: hashedPwd}).then(function () {
//                 console.log("Users data inserted");
//             }).catch(function (error) {
//                 console.log(error);
//             });
//         })
//     }).catch(function (error) {
//         console.log(error);
//     });
//
//     await User.find().then(function (users) {
//         console.log("Users data finded");
//         const adminUser = users[0]._id
//
//         const sampleProducts = products.map((product) => {
//             return {...product, user: adminUser}
//         })
//         Product.deleteMany().then(function () {
//             console.log("Products data deleted");
//         }).catch(function (error) {
//             console.log(error);
//         });
//
//         Product.insertMany(sampleProducts).then(function (insertedProducts) {
//             console.log("Products data inserted")
//
//             Cart.deleteMany().then(function () {
//                 console.log("Carts data deleted");
//             }).catch(function (error) {
//                 console.log(error);
//             });
//
//             let i = 0;
//             const sampleCarts = carts.map((cart) => {
//                 const cartUser = users[i]._id
//                 i++;
//                 const product1 = insertedProducts[Math.floor(Math.random() * insertedProducts.length)]._id;
//                 const product2 = insertedProducts[Math.floor(Math.random() * insertedProducts.length)]._id;
//                 const product3 = insertedProducts[Math.floor(Math.random() * insertedProducts.length)]._id;
//                 return {...cart, products: [product1, product2, product3], user: cartUser}
//             })
//
//             Cart.insertMany(sampleCarts).then(function () {
//                 console.log("Carts data inserted");
//             }).catch(function (error) {
//                 console.log(error);
//             });
//
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }).catch(function (error) {
//         console.log(error);
//     });
// }
//
//
// importData()



