import api from './index'

export default async function login({identifier, password}) {
  const {data} = api.post('/auth/login')
  return data
}
