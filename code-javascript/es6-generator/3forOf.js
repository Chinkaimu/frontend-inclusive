function * fibonacci () {
  let [prev, curr] = [0, 1]
  while (true) {
    [prev, curr] = [curr, prev + curr]
    yield curr
  }
}

for (const n of fibonacci()) {
  if (n > 100) break
  console.log(n)
}
