import { ref, set, child, get, push } from "firebase/database";
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
  })
    .then(() => {
      toast.success("Account created successfully");
    })
    .catch((error) => {
      toast.error(error.message);
    });
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

export async function getExpensesFromUser(userId) {
  try {
    console.log("getExpensesFromUser");
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "users/" + userId));
    if (snapshot.exists()) {
      let expenses = snapshot.val().expenses;
      return Object.values(expenses);
    }
  } catch (error) {
    toast.error("No expenses found");
  }
}

export async function addExpenseToUser(userId, expense) {
  if (!userId || !expense) {
    toast.error("No userId or expense");
    return;
  }
  try {
    console.log("addExpenseToUser");
    const postListRef = ref(database, `users/${userId}/expenses`);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      ...expense,
    });
  } catch (error) {
    toast.error(error.message);
  }
}
