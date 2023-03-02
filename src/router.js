import Home from '@/views/Home/index'
import User from '@/views/User/index'
import CreateUser from '@/views/User/Createuser/index'
import Permission from '@/views/Permission/index'
import Blogs from '@/views/Blogs/index'
import CreateBlogs from '@/views/Blogs/Createblogs/index'
import CheckBlogs from '@/components/CheckBlogs/index'
import Drafts from '@/views/Blogs/Drafts/index'
import Release from '@/views/Release/index'
import OffLine from '@/views/Release/Offline/index'
import OnLine from '@/views/Release/Online/index'
export const router = [
  {
    path: '/layout/home',
    breadcrumbName: '数据首页',
    component: Home,
    flag: 'datam',
  },
  {
    path: '/layout/blogs',
    breadcrumbName: '博客列表',
    component: Blogs,
    flag: 'blogsm',
    children: [
      {
        path: '/layout/blogs/createblogs',
        breadcrumbName: '编写博客',
        component: CreateBlogs,
        flag: 'blogsm',
      },
      {
        path: '/layout/blogs/drafts',
        breadcrumbName: '草稿箱',
        component: Drafts,
        flag: 'blogsm',
      },
      {
        path: '/layout/blogs/checkblogs',
        breadcrumbName: '博客预览',
        component: CheckBlogs,
        flag: 'blogsm',
      },
    ],
  },
  {
    path: '/layout/user',
    breadcrumbName: '用户列表',
    component: User,
    flag: 'userm',
    children: [
      {
        path: '/layout/user/createuser',
        breadcrumbName: '创建用户',
        component: CreateUser,
        flag: 'userm',
      },
    ],
  },
  {
    path: '/layout/permission',
    breadcrumbName: '权限列表',
    component: Permission,
    flag: 'permissionm',
  },
  {
    path: '/layout/release',
    breadcrumbName: '已发布列表',
    component: Release,
    flag: 'releasem',
    children: [
      {
        path: '/layout/release/online',
        breadcrumbName: '已上线列表',
        component: OnLine,
        flag: 'releasem',
      },
      {
        path: '/layout/release/offline',
        breadcrumbName: '已下线列表',
        component: OffLine,
        flag: 'releasem',
      },
    ],
  },
]
