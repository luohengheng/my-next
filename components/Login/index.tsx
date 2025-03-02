import { ChangeEvent, useState } from 'react';
import { message } from 'antd';
// import { observer } from 'mobx-react-lite';
import request from 'service/fetch';
// import { useStore } from 'store/index';
import CountDown from '@/components/CountDown'

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  // const store = useStore();
  const { isShow = false, onClose } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });

  const handleClose = () => {
    onClose && onClose();
  };

  const handleGetVerifyCode = () => {
    console.log('111111');
    
    if (!form?.phone) {
      message.warning('请输入手机号');
      return;
    }

    request
      .post('/api/user/sendVerifyCode', {
        to: form?.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res?.code === 0) {
          setIsShowVerifyCode(true);
        } else {
          message.error(res?.msg || '未知错误');
        }
      });
  };

  const handleLogin = () => {
    request
      .post('/api/user/login', {
        ...form,
        identity_type: 'phone',
      })
      .then((res: any) => {
        if (res?.code === 0) {
          // 登录成功
          // store.user.setUserInfo(res?.data);
          onClose && onClose();
        } else {
          message.error(res?.msg || '未知错误');
        }
      });
  };

  // client-id：d26b6141d5ccf60f7ea8
  // client-secret：4003799d14048c0b971eaf1813b3b6ec65f4178e
  const handleOAuthGithub = () => {
    const githubClientid = 'd26b6141d5ccf60f7ea8';
    const redirectUri = 'http://localhost:3000/api/oauth/redirect';
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${githubClientid}&redirect_uri=${redirectUri}`
    );
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('1111', name, value)
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  return isShow ? (
    <div className="fixed z-[1000] w-screen h-screen bg-[rgb(0_0_0_/_30%)] left-0 top-0">
      <div className="w-80 h-80 bg-white relative -translate-x-2/4 -translate-y-2/4 p-5 left-2/4 top-2/4">
        <div className="text-xl font-[bold] flex justify-between items-center mb-5">
          <div>手机号登录</div>
          <div className='text-[#888] cursor-pointer' onClick={handleClose}>
            x
          </div>
        </div>
        <input
          className='outline-none w-full h-[37px] border mb-2.5 p-2.5 rounded-[5px] border-solid border-[#888] focus:border focus:border-solid focus:border-[#1e80ff]'
          name="phone"
          type="text"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className='relative cursor-pointer'>
          <input
            className='outline-none w-full h-[37px] border mb-2.5 p-2.5 rounded-[5px] border-solid border-[#888] focus:border focus:border-solid focus:border-[#1e80ff]'
            name="verify"
            type="text"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className="text-[#1e80ff] absolute text-sm right-5 top-2" onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              '获取验证码'
            )}
          </span>
        </div>
        <div className='h-10 leading-10 bg-[#007fff] text-white text-center cursor-pointer mt-[15px] rounded-[5px]' onClick={handleLogin}>
          登录
        </div>
        <div className='text-sm text-[#1e80ff] cursor-pointer mt-[15px]' onClick={handleOAuthGithub}>
          使用 Github 登录
        </div>
        <div className='text-[#333] text-sm mt-2.5'>
          注册登录即表示同意
          <a
            className='text-[#1e80ff]'
            href="https://moco.imooc.com/privacy.html"
            target="_blank"
            rel="noreferrer"
          >
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

// export default observer(Login);
export default Login;
