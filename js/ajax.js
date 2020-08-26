class ajax {
  static get (url, obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let param = '';
      if (obj) {
        for (let attr in obj) {
          param += attr + '=' + obj[attr] + '&'
        }
      }


      xhr.open('get', url + '?' + param);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response)
          } else {
            reject('error')
          }

        }
      }

    })

  }


  static post (url, obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('post', url);
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      let param = '';
      if (obj) {
        for (let attr in obj) {
          param += attr + '=' + obj[attr] + '&'
        }
      }
      xhr.send(param);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response)
          } else {
            reject('error')
          }


        }
      }
    });
  }
}