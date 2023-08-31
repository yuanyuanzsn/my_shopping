// 此处用于存放所有与登录相关的接口请求
import request from '@/utils/request'

// 1.获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode, // 图形验证码
      captchaKey, // 图形验证码key
      mobile // 接收验证码手机号
    }
  })
}

// 验证码登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false, // 是否为第三方登录
      partyData: {},
      mobile,
      smsCode
    }
  })
}
