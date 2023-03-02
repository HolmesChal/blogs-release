import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { getBlogsList, addBlogsList, editBlogsList } from '@/utils/request'
import { getNowTime, checkStatus } from '@/utils/common'
// 富文本编辑器
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
// antd
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Button, Select, notification, Steps } from 'antd'
const { Option } = Select
const { TextArea } = Input
const { Step } = Steps
import './CreateBlogs.less'
function CreateBlogs(props) {
  const { location } = props
  // 获取设置draft数据
  const [editorState, setEditorState] = useState()
  // 获取设置html数据
  const [htmlContent, setHtmlContent] = useState('')
  // 获取设置步骤值
  const [nextFlag, setNextFlag] = useState(0)
  // 获取设置表单数据
  const [formData, setformData] = useState({ blogscontent: '' })
  // 获取博客列表数量
  const [blogslistlength, setBlogsListLength] = useState()
  // 获取设置博客编辑数据
  const [blogsContentBackInfo, setBlogsContentBackInfo] = useState()
  // 获取设置博客编辑文本
  const [blogsContentBack, setBlogsContentBack] = useState()
  // 获取设置博客编辑标志
  const [editFlag, setEditFlag] = useState(false)
  const basicRef = useRef(null)
  // 富文本编辑器改变内容
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    // draft内容转成html
    let htmlState = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setHtmlContent(htmlState)
  }
  // 富文本编辑器保存内容
  const saveEditorHandle = () => {
    setformData((prevformData) => {
      prevformData.blogscontent = htmlContent
      return prevformData
    })
  }
  //   上一步
  const prevHandle = () => {
    setNextFlag((prevnextFlag) => {
      if (prevnextFlag == 0) {
        return 0
      }
      return prevnextFlag - 1
    })
  }
  //   下一步
  const nextHandle = async () => {
    let result = await basicRef.current.validateFields()
    setformData((prevformData) => {
      return {
        ...prevformData,
        ...result,
      }
    })
    if (!editFlag) {
      setformData((prevformData) => {
        prevformData.blogscontent = htmlContent
        return prevformData
      })
    }
    setformData((prevformData) => {
      prevformData.blogscontent = blogsContentBack
      return prevformData
    })
    if (formData.blogscontent == '' && nextFlag == 1) {
      notification['warning']({
        message: '注意',
        description: '您的博客没有书写内容喔~',
      })
    }
    setNextFlag((prevnextFlag) => {
      if (prevnextFlag >= 2) {
        return 2
      }
      return prevnextFlag + 1
    })
  }
  //   保存到草稿箱
  const draftsHandle = async () => {
    let config = {
      userlistId: props?.userinfo.id,
      nickname: props?.userinfo.nickname,
      key: blogslistlength + 1,
      blogscondition: 0,
      releasetime: getNowTime(),
      savetime: getNowTime(),
      offtime: null,
      ontime: null,
      visible: false,
      blogsaction: 0,
    }
    Object.assign(config, formData)
    if (editFlag) {
      Reflect.deleteProperty(config, 'key')
      let { status } = await editBlogsList(blogsContentBackInfo.id, config)
      if (checkStatus(status)) {
        notification['success']({
          message: '成功',
          description: '编辑成功',
        })
      }
      return
    }
    let { status } = await addBlogsList(config)
    if (checkStatus(status)) {
      notification['info']({
        message: '提示',
        description: '成功保存',
      })
    }
  }
  //   发布博客
  const releaseHandle = async () => {
    let config = {
      userlistId: props?.userinfo.id,
      nickname: props?.userinfo.nickname,
      region: props?.userinfo.region,
      key: blogslistlength + 1,
      blogscondition: 1,
      releasetime: getNowTime(),
      savetime: getNowTime(),
      offtime: null,
      ontime: null,
      visible: false,
      blogsaction: 1,
    }
    Object.assign(config, formData)
    if (editFlag) {
      Reflect.deleteProperty(config, 'key')
      let { status } = await editBlogsList(blogsContentBackInfo.id, config)
      if (checkStatus(status)) {
        notification['success']({
          message: '成功',
          description: '编辑成功',
        })
      }
      return
    }
    let { status } = await addBlogsList(config)
    if (checkStatus(status)) {
      notification['success']({
        message: '成功',
        description: '成功发布',
      })
    }
  }
  // 编辑博客
  const initEditHandler = (initEdit = {}) => {
    basicRef.current.setFieldsValue(initEdit)
    if (initEdit) {
      let { blogscontent } = initEdit
      setformData((prevformData) => {
        prevformData.blogscontent = blogsContentBack
        return prevformData
      })
      let contentBlock = htmlToDraft(blogscontent)
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      )
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }

  useEffect(async () => {
    let config = {
      userlistId: props.userinfo.id,
    }
    let { data: blogsList } = await getBlogsList(config)
    setBlogsListLength(blogsList.length)
  }, [formData])

  useEffect(() => {
    if (location.state && location.query) {
      let { blogscontent } = location.state
      setEditFlag(location.query)
      initEditHandler(location.state)
      setBlogsContentBackInfo(location.state)
      setBlogsContentBack(blogscontent)
      sessionStorage.setItem('blogsinfo', JSON.stringify(location.state)) // 存入到sessionStorage中
      sessionStorage.setItem('editflag', JSON.stringify(location.query))
    } else {
      let editflag = JSON.parse(sessionStorage.getItem('editflag'))
      let blogsinfo = JSON.parse(sessionStorage.getItem('blogsinfo'))
      if (blogsinfo && editflag) {
        let { blogscontent } = blogsinfo
        setBlogsContentBack(blogscontent)
        initEditHandler(blogsinfo)
        setBlogsContentBackInfo(blogsinfo)
        setEditFlag(editflag)
      }
    }
  }, [location.state, location.query])

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('blogsinfo')
      sessionStorage.removeItem('editflag')
    }
  }, [props.match.path])

  return (
    <>
      <Steps current={nextFlag}>
        <Step title="基本信息" description="博客标题、博客分类" />
        <Step title="博客内容" description="博客主题内容" />
        <Step title="发布博客" description="保存至草稿箱或发布" />
      </Steps>
      <div className={nextFlag == 0 ? 'basic-info' : 'basic-info-hidden'}>
        <Form
          name="createblogsform"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ blogstype: '生活类' }}
          ref={basicRef}
        >
          <Form.Item
            label="博客标题"
            name="blogstitle"
            rules={[{ required: true, message: '请输入博客标题!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="博客简介"
            name="blogsintroduct"
            rules={[{ required: true, message: '请输入博客简介!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="博客关键字"
            name="blogskeyword"
            rules={[{ required: true, message: '请输入博客关键字!' }]}
          >
            <Form.List
              name="blogskeyword"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error('至少两个关键字!'))
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: '请输入关键字或删除此关键字。',
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="关键字" style={{ width: '60%' }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}
                    >
                      添加关键字
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item
            label="博客类型"
            name="blogstype"
            rules={[{ required: true, message: '请选择博客分类!' }]}
          >
            <Select style={{ width: '40%' }}>
              <Option value="生活类">生活类</Option>
              <Option value="技术类">技术类</Option>
              <Option value="信息类">信息类</Option>
              <Option value="教学类">教学类</Option>
              <Option value="案例分析类">案例分析类</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className={nextFlag == 1 ? 'wysiwyg' : 'wysiwyg-hidden'}>
        <Editor
          editorState={editorState}
          // 类应用于工具栏中的
          toolbarClassName="wysiwyg-toolbar"
          // 类应用于编辑器和工具栏上
          wrapperClassName="wysiwyg-wrapper"
          // 类应用于编辑器的周围
          editorClassName="wysiwyg-editor"
          // 当编辑器的状态发生变化时都会调用函数，可用来改变 EditorState。
          onEditorStateChange={onEditorStateChange}
          onBlur={saveEditorHandle}
        />
      </div>
      <div className={nextFlag == 2 ? 'release' : 'release-hidden'}>
        <Button
          type="dashed"
          style={{ margin: '0 10px' }}
          onClick={draftsHandle}
        >
          保存草稿箱
        </Button>
        <Button
          type="primary"
          style={{ margin: '0 10px' }}
          onClick={releaseHandle}
        >
          发布上线
        </Button>
      </div>
      <div className="next-btn">
        <Button
          type="dashed"
          style={{ margin: '0 10px' }}
          onClick={prevHandle}
          disabled={nextFlag == 0}
        >
          上一步
        </Button>
        <Button
          type="primary"
          style={{ margin: '0 10px' }}
          onClick={nextHandle}
          disabled={nextFlag == 2}
        >
          下一步
        </Button>
      </div>
      {/* html转成内容 */}
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> */}
    </>
  )
}
const mapStateToProps = (state) => {
  return state
}
export default CreateBlogs = connect(mapStateToProps, null)(CreateBlogs)
