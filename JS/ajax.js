(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  // console.log(xhr);
  //onreadystatechange Lee los estados

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.response);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });

      $xhr.appendChild($fragment);
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }

    //console.log("Este mensajese cargara de cualquier forma");
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();

//Para que el codigo que este en la callback solamente se ejecute cuanod el readystate sea 4 y se puedan minupular los datos
//Parse obtiene la información que esta en response, la  cual es lo que se responda de hacer la peticion
//Y esa informacion la convierte a un tipo de dato que JS pueda validar
//Todas las inserciones se hacen primero en el fragmento y despues ese fragmento completo se agrega al DOM
//En lugar de imprimir todas de golpe

//Con las funciones anonimas podemos hacer usar los mimsos nombres de clase, metodos y variables en diferentes funciones sin problemas

(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "Ocurrio un error";
      $fetch.innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() => {
      // console.log("Se ejecutara independientemente si hay exito o no");
    });
})();

//fetch por defecto usa GET
//fetch trabaja con promesas, nos dara un then para la siguiente iteracion
//then se cumple la promesas
//catch no se cumple
//finally se ejecuta asi se cumpla o no la promesa
//La respuesta viene en el body, el cual es un ReadableStream

(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users"),
        json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetchAsync.appendChild($fragment);
    } catch (err) {
      let message = err.statusText || "Ocurrio un error";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
      // console.log("Esto se ejecutara independientemenete de la promesa fetch");
    }
  }

  getData();
})();

//Res away fetch manda a llamar los datos pero estan en un formato diferente
//await res.json manda los datos en el formato json

(() => {
  const $axios = document.getElementById("axios"),
    $fragment = document.createDocumentFragment();

  //Esto es para ocupar la libreria de axios
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      // console.log(res);
      let json = res.data;
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((err) => {
      // console.log(err.response);
      let message = err.response.statusText || "Ocurrio un error";
      $axios.innerHTML = `Error ${err.response.status}: ${message}`;
    })
    .finally(() => {
      // console.log("Esto se ejecutara independientemente del estado del axios");
    });
})();

//Devuelve un objeto creado por el navegador, no es el mismo que regresa los demas metodos
//Axios hace automaticamente la validacion de los errores

(() => {
  const $axiosAsync = document.getElementById("axios-async"),
    $fragment = document.createDocumentFragment();

  axios.get("https://jsonplaceholder.typicode.com/users");
  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
        json = await res.data;

      //console.log(res, json);

      //let json = res.data;

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
      });

      $axiosAsync.appendChild($fragment);
    } catch (err) {
      let message = err.response.statusText || "Ocurrio un error";
      $axiosAsync.innerHTML = `Error  ${err.response.status}: ${message}`;
    } finally {
      console.log("Esto se ejecutara sin importar si falla o tiene exito");
    }
  }

  getData();
})();

//Res devuelve la informacion de la API ya parseada
//json devuelve los elementos que nos interesan de la API
