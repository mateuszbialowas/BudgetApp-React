import { ref, set } from "firebase/database";
import { database } from "./firebse";
import { toast } from "react-toastify";

export function writeUserData(userId, name, email, photoURL, providerId) {
  set(ref(database, "users/" + userId), {
    userId: userId,
    name: name,
    email: email,
    photoURL: photoURL,
    providerId: providerId,
  })
    .then(() => {
      toast.success("Account created successfully");
    })
    .catch((error) => {
      toast.error(error.message);
    });
}

// clear database
export function clearDatabase() {
  console.log("clearDatabase");
  set(ref(database, "users"), {});
}
