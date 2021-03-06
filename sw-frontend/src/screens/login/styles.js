import styled from 'styled-components'
import { animated } from 'react-spring'
import { Colors, Spacings } from 'config'

export const LoginLogo = styled(animated.div)`
  margin: ${Spacings.LARGE}px 0 ${Spacings.MEDIUM}px;
  width: 80px;
  height: 75px;
  opacity: 0;

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    margin: ${Spacings.MEDIUM}px 0 0;
    width: 130px;
    height: 150px;
  }

  svg {
    fill: ${Colors.BLUE_BASE};
    stroke: ${Colors.BLUE_BASE};
  }
`

export const FormContent = styled(animated.div)`
  opacity: 0;
  width: 100%;
  max-width: 340px;
`

export const Login = styled(animated.div)`
  width: 100%;
  min-height: 700px;
  padding: ${Spacings.MEDIUM}px 0px;
  background: ${Colors.BLUE_BASE};
  background: linear-gradient(to right, #e4f1f1, #F8FDFD);
  display: flex;
  a,
  a:visited,
  a:link {
    color: white;
    /* font-weight: 600; */
  }
  a:hover {
    color: ${Colors.GREY_LIGHT};
  }
  .login__inner {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .login__fb {
    margin-top: ${Spacings.MEDIUM}px;
    width: 100%;
    button {
      border-radius: 5px;
      height: 40px;
    }
  }

  .login__forgotpw {
    margin-top: -${Spacings.SMALL}px;
    margin-bottom: ${Spacings.LARGE}px;

    font-size: ${Spacings.FONT.LABEL};
    text-align: right;
    width: 100%;
    a {
      padding-right: ${Spacings.MEDIUM}px;
      color: ${Colors.GREY_LIGHT};
    }
  }

  .login__register {
    border-top: 1px solid rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
    margin-top: ${Spacings.MEDIUM}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.GREY_LIGHT};
    text-align: center;
  }

  .login__form {
    width: 100%;
    max-width: 340px;
    min-height: 350px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .login__error {
    margin-top: ${Spacings.MEDIUM}px;
    color: ${Colors.BLACK};
    font-size: ${Spacings.FONT.BODY};
  }

  a {
    color: ${Colors.GREY_LIGHT};
  }
`
export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  overflow-y: scroll;
  padding-bottom: 80px;
`
export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5vh 0;
`
