import axios from 'axios'

const BASE = '/api/parts'

export const getAllParts    = (filters = {}) => axios.get(BASE, { params: filters })
export const getPartById   = (id)           => axios.get(`${BASE}/${id}`)
export const createPart    = (data)         => axios.post(BASE, data)
export const updatePart    = (id, data)     => axios.put(`${BASE}/${id}`, data)
export const deletePart    = (id)           => axios.delete(`${BASE}/${id}`)
export const estimateCost  = (ids)          => axios.get(`${BASE}/estimate`, { params: { ids: ids.join(',') } })