import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"
import { service_account } from "./secrets.js";

initializeApp({ credential: cert(service_account) })

const db = getFirestore()

const cars = {
    is_electric: true,
    make: "volvo",
    model: "c40",
    color: "white",
    year: 2025
}

const collectionName = "Cars Collection"

db.collection(collectionName)
.add(cars)
.then(doc => console.log('cars added ---> ', doc.id))
.catch(console.error)

db.collection(collectionName)
.get()
.then(collection => {
    const items = collection.docs.map(
    eachItem => {
        let eachID = eachItem.data()
        eachID.id = eachItem.id
        return eachID
    })
    console.table(items)
})
.catch(console.error)