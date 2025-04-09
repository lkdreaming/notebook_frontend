import { getToken, setToken, removeToken } from '@/util/auth'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: [],
    genderMap: {
      '0': '女',
      '1': '男',
      '-1': '保密'
    },
    // statusMap: {
    //   true: '可用',
    //   false: '禁用'
    // },
    statusMap: {
      '可用': true,
      '禁用': false
    }
  }
  
  const mutations = {
    SET_TOKEN: (state, token) => {
      localStorage.setItem('token', token)
      // state.token = token
      state.token = localStorage.getItem('token')
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  }
  