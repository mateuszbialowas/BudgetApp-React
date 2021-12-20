import { ref, set } from "firebase/database";
import { database } from "./firebse";

export function writeUserData(userId, name, email, photoURL, providerId) {
  set(ref(database, "users/" + userId), {
    userId: userId,
    name: name,
    email: email,
    photoURL: photoURL,
    providerId: providerId,
  });
}

// clear database
export function clearDatabase() {
  console.log("clearDatabase");
  set(ref(database, "users"), {});
}
