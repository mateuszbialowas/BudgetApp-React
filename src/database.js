import { ref, set, child, get } from "firebase/database";
import { database } from "./firebse";
import { toast } from "react-toastify";
const DEFAULT_BUDGET = 1500;

export function writeUserData(userId, name, email, photoURL, providerId) {
  set(ref(database, "users/" + userId), {
    userId: userId,
    name: name,
    email: email,
    photoURL: photoURL,
    providerId: providerId,
    budget: DEFAULT_BUDGET,
    expenses: [],
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
  set(ref(database, "users"), {});
}

export function checkIfUserExists(userId) {
  const dbRef = ref(database);
  get(child(dbRef, "users/" + userId)).then((snapshot) => {
    if (snapshot.exists()) {
      return true;
    }
  });
}

// TODO check how works async try catch await
export async function getBudgetFromUser(userId) {

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "users/" + userId));
    if (snapshot.exists()) {
      return snapshot.val().budget;
    }
  } catch (error) {
    toast.error(error.message);
  }
}
