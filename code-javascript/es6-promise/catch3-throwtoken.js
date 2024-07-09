
const condition = 2;

const getJSON = () => {
  return new Promise((resolve, reject) => {
    // throw new Error('error in getJSON')
    // reject("reject in getJSON")
    resolve("getJSON");
  })
}

const getToken = () => {
  return new Promise((resolve, reject) => {
    throw new Error('error in getToken')
    // reject("reject in getToken")
    // setTimeout(() => {
    //   resolve("getToken")
    // }, 1000);
  })
}

const getJsonAndToken = async () => {
  if (condition === 0) {
    return {
      data: ""
    };
  }

  if (condition === 1) {
    return {};
  }

  if (condition === 2) {
    const token = await getToken();
    console.log('getJsonAndToken --- token is ', token);

    const data = await getJSON('./posts.json');
    console.log('getJsonAndToken --- data is ', data);
    console.log('getJsonAndToken --- token is ', token);

    return {
      data: data,
      token: token
    };
  }

  const data_1 = await getJSON();  
  return {
    data: data_1,
    token: token
  }; 
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

getJsonAndToken().then(onSuccess).catch(onCatch);

/**
 * Output: the getJson won't be executed because it waits the success of getToken
 * 
 * onCatch error message error in getToken
 * 
 */