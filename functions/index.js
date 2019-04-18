const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://react-redux-router.firebaseio.com"
});

const firestore = admin.firestore();

exports.addItem = functions.https.onRequest(async (req, res) => {
  try {
    if (req.body.item) {
      const userId = firestore.collection("users").doc("R7dwp5Xqyt3LLqQYN7tQ")
        .id;
      const cartItems = await firestore
        .collection("carts")
        .where("userId", "==", userId)
        .get();
      if (cartItems.size > 0) {
        cartItems.forEach(item => {
          if (item.data().id === req.body.item.id) {
          } else {
          }
        });
      } else {
        var item = { ...req.body.item, quantity: 1, userId };
        await firestore.collection("carts").add(item);
        res.send({ status: 1, cart: item });
      }
      // const user = await userRef.get();
      // const userData = user.data();
      // if (userData.cartItems.length > 0) {
      //   const findItem = userData.cartItems.find(id => id === req.body.item.id);
      //   if (findItem) {
      //   } else {
      //     console.log("new item");
      //     var item = { ...req.body.item, quantity: 1 };
      //     await userRef.update(
      //       {
      //         cartItems: admin.firestore.FieldValue.arrayUnion(item)
      //       },
      //       { merge: true }
      //     );
      //     res.send({ status: 1, cart: item });
      //   }
      // } else {
      //   var item = { ...req.body.item, quantity: 1 };
      //   await userRef.update({
      //     cartItems: [item]
      //   });
      // }
      // res.send({ status: 1, cart: item });
    } else {
      res.send({ status: 0 });
    }
  } catch (error) {
    console.log("error is", error);
    res.send({ status: 0 });
  }
});

exports.addQuantity = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.body;
    const user = await firestore
      .collection("users")
      .where("cartItems", "array-contains", { id: id })
      .get();
    console.log("user cart", user.docs);
    res.send({ status: 1 });
  } catch (error) {}
});
