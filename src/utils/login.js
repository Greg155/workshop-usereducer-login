export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "pierre" && password === "password") {
        console.log("dans le resolve");
        resolve();
      } else {
        console.log("dans le reject");
        console.log(username, password, "reject");
        reject(new Error("Incorrect credientials"));
      }
    }, 1000);
  });
}
