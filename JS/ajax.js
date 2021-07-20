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
      console.log("Se ejecutara independientemente si hay exito o no");
    });
})();

//fetch  pro defecto usa GET
//fetch trabaja con promesas, nos dara un then para la siguiente iteracion
//then se cumple la promesas
//catch no se cumple
//finally se ejecuta asi se cumpla o no la promesa
//La respuesta viene en el body, el cual es un ReadableStream
