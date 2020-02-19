const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('p1 setout error')), 30)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(p1), 10)
})

p2.then(result => {
  console.log('result', result)
  console.log('then p1 =', p1)
  console.log('then p2 =', p2)
})
p2.catch(error => {
  console.log('error', error)
  // the states of p1 and p2 are 'rejected'
  console.log('catch p1 =', p1)
  console.log('catch p2 =', p2)
})
