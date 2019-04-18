const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://react-redux-router.firebaseio.com"
});

const firestore = admin.firestore();

exports.addItem = functions.https.onRequest(async (req, res) => {
  if (req.body.item) {
    const userRef = firestore.collection("users").doc("R7dwp5Xqyt3LLqQYN7tQ");
    const user = await userRef.get();
    const userData = user.data();
    if (userData.cartItems.length > 0) {
    } else {
      var item = { ...req.body.item, quantity: 1 };
      await userRef.update({
        cartItems: [item]
      });
    }
    res.send({ status: 1, cart: item });
  } else {
    res.send({ status: 0 });
  }
});
