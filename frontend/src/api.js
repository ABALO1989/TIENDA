import axios from 'axios';

const baseURL = "http://localhost:4000/api"
//const baseURL = 'https://enigmatic-shelf-42481.herokuapp.com';

//CRUD PARA PRODUCTOS
export const obtenerProductos = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `${baseURL}/productos/`,
  
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


export const crearProducto = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: `${baseURL}/productos/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarProducto= async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PUT',
    url: `${baseURL}/productos/${id}/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarProducto= async (id, successCallback, errorCallback) => {
  const options = {
    method: 'DELETE',
    url: `${baseURL}/productos/${id}/`,
    headers: { 'Content-Type': 'application/json' },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//CRUD PARA VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: `${baseURL}/ventas/`,
  
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: `${baseURL}/ventas/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta= async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PUT',
    url: `${baseURL}/ventas/${id}/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVenta= async (id, successCallback, errorCallback) => {
  const options = {
    method: 'DELETE',
    url: `${baseURL}/ventas/${id}/`,
    headers: { 'Content-Type': 'application/json' },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};