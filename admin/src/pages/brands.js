// src/api/brands.js
import axios from 'axios';
import api from './api';




export const getBrands = () => axios.get(api);
export const addBrand = (data) => axios.post(api, data);
export const updateBrand = (id, data) => axios.put(`${api}/${id}`, data);
export const deleteBrand = (id) => axios.delete(`${api}/${id}`);
export const getBrandById = (id) => axios.get(`${api}/${id}`);