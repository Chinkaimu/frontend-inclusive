const myFavouriteAuthors = {
  allAuthors: {
    fiction: [
      'Agatha Christie',
      'J. K. Rowling'
    ],
    scienceFiction: [
      'Neal Stephenson',
      'Arthur Clarke'
    ],
    fantasy: [
      'J. R. Tolkien',
      'Terry Prachett'
    ]
  },
  [Symbol.iterator] () {
    const genres = Object.values(this.allAuthors)

    // Define the index out from next, cause we need use it to go ahead when call the function next.
    let currentAuthorIndex = 0
    let currentGenreIndex = 0

    return {
      next () {
        const authors = genres[currentGenreIndex]

        const doNotHaveMoreAuthors = !(currentAuthorIndex < authors.length)

        if (doNotHaveMoreAuthors) {
          // When there is no more authors, we move the genre index to the next genre
          currentGenreIndex++
          // and reset the author index to 0 again to get new set of authors
          currentAuthorIndex = 0
        }

        // if all genres are over, then we need tell the iterator that we can not give more values
        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length)
        if (doNotHaveMoreGenres) {
          return {
            value: undefined,
            done: true
          }
        }

        // if everything is correct, return the author from the current genre and increment the currentAuthorIndex
        // so next time, the nxe author can be returned.
        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false
        }
      }
    }
  }
}

for (const author of myFavouriteAuthors) {
  console.log(author)
}

// The spread operator is actually iterator
console.log(...myFavouriteAuthors)

for (const authorsKey of Object.keys(myFavouriteAuthors)) {
  const authors = myFavouriteAuthors[authorsKey]
  for (const authorKey of Object.keys(authors)) {
    const items = authors[authorKey]
    for (const item of items) {
      console.log(item)
    }
  }
}

const iterable = {
  [Symbol.iterator]: () => {
    let step = 0
    return {
      next: () => {
        step++

        if (step === 1) {
          return {
            value: 'This',
            done: false
          }
        } else if (step === 2) {
          return {
            value: 'is',
            done: false
          }
        } else if (step === 3) {
          return {
            value: 'iterator',
            done: false
          }
        }

        return { value: undefined, done: true }
      }
    }
  }
}

const iterator = iterable[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
