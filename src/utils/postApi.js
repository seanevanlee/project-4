import tokenService from "./tokenService";
const BASE_URL = "/api/posts/";

export function create(data) {
  return fetch(BASE_URL, {
    method: "POST",
    body: data,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();
    return responseFromTheServer.json().then((res) => {
      console.log(
        res,
        " <- this is the response in Posts create function in your utils folder"
      );
      throw new Error("Something went wrong in create Post");
    });
  });
}

export function update(data) {
  return fetch(BASE_URL + data.get("_id"), {
    method: "PUT",
    body: data,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();
    return responseFromTheServer.json().then((res) => {
      console.log(
        res,
        " <- this is the response in Posts update function in your utils folder"
      );
      throw new Error("Something went wrong in update Post");
    });
  });
}

export function getAll() {
  return fetch(BASE_URL, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => res.json());
}
