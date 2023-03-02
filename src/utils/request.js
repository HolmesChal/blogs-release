import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'antd'
import { awaryToUrl } from '@/utils/common'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

let instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log('config', config)
    NProgress.start()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    NProgress.done()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    NProgress.done()
    return {
      data: response.data,
      status: response.status,
    }
  },
  function (error) {
    // 对响应错误做点什么
    source.cancel('Operation canceled by the user.')
    NProgress.done()
    message.error('连接超时，请检查网络')
    return Promise.reject(error)
  }
)

/**
 * 用户接口请求
 * */

// 获取单个用户
export async function getUserInfo(config = {}) {
  let { data, status } = await instance.get('/userlists', {
    params: config,
  })
  return {
    data,
    status,
  }
}

// 删除用户
export async function deleteUserList(id) {
  let { data, status } = await instance.delete(`/userlists/${id}`)
  return {
    data,
    status,
  }
}

// 获取用户列表
export async function getUserList() {
  let { data, status } = await instance.get('/userlists')
  return {
    data,
    status,
  }
}

// 新增用户
export async function addUserInfo(config = {}) {
  let { data, status } = await instance.post('/userlists', config)
  return {
    data,
    status,
  }
}

// 修改用户
export async function changeUserList({ id, region, nickname, role } = {}) {
  let { data, status } = await instance.patch(
    `/userlists/${id}`,
    {
      region,
      nickname,
      role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return {
    data,
    status,
  }
}

/**
 * 权限接口请求
 * */

// 获取管理员权限列表
export async function getPermissionList() {
  let { data, status } = await instance.get('/userlists', {
    params: {
      _embed: 'permissionlists',
    },
  })
  return {
    data,
    status,
  }
}

// 获取用户权限
export async function getUserPermission(config = {}) {
  let { data, status } = await instance.get('/permissionlists', {
    params: config,
  })
  return {
    data,
    status,
  }
}

// 修改权限列表
export async function changePermissionList(id, config = {}) {
  let { data, status } = await instance.patch(
    `/permissionlists/${id}`,
    {
      ...config,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return {
    data,
    status,
  }
}

// 添加权限列表
export async function addPermissionList(config = {}) {
  let { data, status } = await instance.post('/permissionlists', config)
  return {
    data,
    status,
  }
}

// 删除权限列表
export async function deletePermissionList(id) {
  let { data, status } = await instance.delete(`/permissionlists/${id}`)
  return {
    data,
    status,
  }
}

/**
 * 博客接口请求
 * */

// 获取管理员博客列表
export async function getBlogsList(config = {}) {
  let { data, status } = await instance.get('/blogslists', {
    params: config,
  })
  return {
    data,
    status,
  }
}

// 获取用户博客列表
export async function getUserBlogsList(userlistId, awary = [], param = '') {
  let urlStr = awaryToUrl(awary, param)
  let { data, status } = await instance.get(
    `/blogslists${urlStr}&userlistId=${userlistId}`
  )
  return {
    data,
    status,
  }
}

// 新增博客
export async function addBlogsList(config = {}) {
  let { data, status } = await instance.post('/blogslists', config)
  return {
    data,
    status,
  }
}

// 删除博客
export async function deleteBlogslist(id) {
  let { data, status } = await instance.delete(`/blogslists/${id}`)
  return {
    data,
    status,
  }
}

// 编辑博客
export async function editBlogsList(id, config = {}) {
  let { data, status } = await instance.patch(
    `/blogslists/${id}`,
    {
      ...config,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return {
    data,
    status,
  }
}

// 审核、下线、上线、驳回博客
export async function changeBlogslist(id, config = {}) {
  let { data, status } = await instance.patch(
    `/blogslists/${id}`,
    {
      ...config,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return {
    data,
    status,
  }
}

// 查看博客
export async function getBlogsInfo(id) {
  let { data, status } = await instance.get(`/blogslists/${id}`)
  return {
    data,
    status,
  }
}
