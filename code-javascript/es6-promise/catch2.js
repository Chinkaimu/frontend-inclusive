
const getJSON = url => {
  return new Promise((resolve, reject) => {
    throw new Error('error in getJSON')
    // reject("reject in getJSON")
    // resolve("getJSON");
  })
}

const getToken = () => {
  return new Promise((resolve, reject) => {
    // throw new Error('error in getToken')
    // reject("reject in getToken")
    setTimeout(() => {
      resolve("getToken")
    }, 1000);
  })
}

const getJsonAndToken = () => {
  return getToken().then((token) => {
    console.log('getJsonAndToken --- token is ', token)

    return getJSON('./posts.json').then((data) => {
      console.log('getJsonAndToken --- data is ', data)
      console.log('getJsonAndToken --- token is ', token)

      return {
        data: data,
        token: token
      }
    })
  })
}

const onSuccess = (data) => {
  console.log("onSuccess", data);
}

const onFail = (error) => {
  console.log("onFail error message", error.message);
}

const onCatch = (error) => {
  console.log("onCatch error message", error.message);
}

// getJsonAndToken().then(onSuccess, onFail).catch(onCatch); // the first error handle will catch the failure. And then won't bubble.
// "getJsonAndToken().then(onSuccess, onFail)" share the same function with "getJsonAndToken().then(onSuccess).catch(onCatch)"
getJsonAndToken().then(onSuccess).catch(onCatch);
getJsonAndToken().then(onSuccess, onFail)

