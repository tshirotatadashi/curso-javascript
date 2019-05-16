class HttpConnect {

  get (url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject(xhr.responseText)
          }
        }
      }
      xhr.send()
    })
  }

  post (url, payload) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader(...arguments)
      xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
              if (xhr.status !== 200) {
                console.log('Deu erro')
              }
          }
      }
      xhr.send(JSON.stringify(payload))
    })
  }

}