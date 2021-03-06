const functions = require("firebase-functions");
const admin = require("firebase-admin");
const _ = require("lodash");

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
      const items = await firestore
        .collection("carts")
        .where("id", "==", req.body.item.id)
        .where("userId", "==", userId)
        .get();
      if (items.size > 0) {
        const itemId = items.docs[0].id;
        const itemData = items.docs[0].data();
        await firestore
          .collection("carts")
          .doc(itemId)
          .update({
            quantity: itemData.quantity + 1
          });
        const getUpdatedItem = await firestore
          .collection("carts")
          .doc(itemId)
          .get();
        const updatedItemData = getUpdatedItem.data();
        res.send({ status: 1, cart: updatedItemData });
      } else {
        var item = { ...req.body.item, quantity: 1, userId };
        await firestore.collection("carts").add(item);
        res.send({ status: 1, cart: item });
      }
    } else {
      res.send({ status: 0 });
    }
  } catch (error) {
    console.log("error is", error);
    res.send({ status: 0 });
  }
});

exports.fetchCartItems = functions.https.onRequest(async (req, res) => {
  try {
    const items = [];
    const userId = firestore.collection("users").doc("R7dwp5Xqyt3LLqQYN7tQ").id;
    const getAllItems = await firestore
      .collection("carts")
      .where("userId", "==", userId)
      .get();
    if (getAllItems.docs.length > 0) {
      getAllItems.docs.forEach(item => {
        items.push(item.data());
      });
    }
    if (items.length > 0) {
      var total = parseFloat(
        _.sumBy(items, obj => obj.price * obj.quantity)
      ).toFixed(2);
    } else {
      var total = 0;
    }
    res.send({ status: 1, items, total });
  } catch (error) {
    console.log("error is", error);
    res.send({ status: 0 });
  }
});

exports.addQuantity = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const userId = firestore.collection("users").doc("R7dwp5Xqyt3LLqQYN7tQ")
        .id;
      const getItem = await firestore
        .collection("carts")
        .where("userId", "==", userId)
        .where("id", "==", id)
        .get();
      if (getItem.docs.length > 0) {
        const itemId = getItem.docs[0].id;
        const itemData = getItem.docs[0].data();
        await firestore
          .collection("carts")
          .doc(itemId)
          .update({
            quantity: itemData.quantity + 1
          });
        const getAllItems = await firestore
          .collection("carts")
          .where("userId", "==", userId)
          .get();
        const allItems = [];
        if (getAllItems.docs.length > 0) {
          getAllItems.docs.forEach(item => {
            allItems.push(item.data());
          });
        }
        if (allItems.length > 0) {
          var total = parseFloat(
            _.sumBy(allItems, obj => obj.price * obj.quantity)
          ).toFixed(2);
        } else {
          var total = 0;
        }
        res.send({ status: 1, cart: allItems, total });
      }
    } else {
      res.send({ status: 0 });
    }
  } catch (error) {
    console.log("error is", error);
    res.send({ status: 0 });
  }
});

exports.removeQuantity = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const userId = firestore.collection("users").doc("R7dwp5Xqyt3LLqQYN7tQ")
        .id;
      const getItem = await firestore
        .collection("carts")
        .where("userId", "==", userId)
        .where("id", "==", id)
        .get();
      if (getItem.docs.length > 0) {
        const itemId = getItem.docs[0].id;
        const itemData = getItem.docs[0].data();
        await firestore
          .collection("carts")
          .doc(itemId)
          .update({
            quantity: itemData.quantity - 1
          });
        const getAllItems = await firestore
          .collection("carts")
          .where("userId", "==", userId)
          .get();
        const removeItem = _.find(
          getAllItems.docs,
          obj => obj.data().quantity === 0
        );
        if (removeItem) {
          await firestore
            .collection("carts")
            .doc(removeItem.id)
            .delete();
        }
        const allItems = [];
        if (getAllItems.docs.length > 0) {
          getAllItems.docs.forEach(item => {
            if (item.data().quantity > 0) {
              allItems.push(item.data());
            }
          });
        }
        if (allItems.length > 0) {
          var total = parseFloat(
            _.sumBy(allItems, obj => obj.price * obj.quantity)
          ).toFixed(2);
        } else {
          var total = 0;
        }
        res.send({ status: 1, cart: allItems, total });
      }
    } else {
      res.send({ status: 0 });
    }
  } catch (error) {
    console.log("error is", error);
    res.send({ status: 0 });
  }
});

exports.removeItem = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.body;
    const userId = firestore.collection("users").doc("R7dwp5Xqyt3LLqQYN7tQ").id;
    if (id) {
      const getItem = await firestore
        .collection("carts")
        .where("userId", "==", userId)
        .where("id", "==", id)
        .get();
      if (getItem.docs.length > 0) {
        const itemId = getItem.docs[0].id;
        await firestore
          .collection("carts")
          .doc(itemId)
          .delete();
      }
      const getAllItems = await firestore
        .collection("carts")
        .where("userId", "==", userId)
        .get();
      const allItems = [];
      if (getAllItems.docs.length > 0) {
        getAllItems.docs.forEach(item => {
          allItems.push(item.data());
        });
      }
      if (allItems.length > 0) {
        var total = parseFloat(
          _.sumBy(allItems, obj => obj.price * obj.quantity)
        ).toFixed(2);
      } else {
        var total = 0;
      }
      res.send({ status: 1, cart: allItems, total });
    } else {
      res.send({ status: 0 });
    }
  } catch (error) {
    console.error("error is", error);
    res.send({ status: 0 });
  }
});
