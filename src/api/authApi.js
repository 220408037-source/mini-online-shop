
export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        username === 'student@university.edu' &&
        password === 'demo123456'
      ) {
        resolve({ username })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}
