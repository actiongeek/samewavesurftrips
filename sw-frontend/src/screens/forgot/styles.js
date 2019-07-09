import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Forgot = styled.div`
  width: 100%;
  min-height: 430px;
  padding: ${Spacings.MEDIUM}px 0;
  background-color: ${Colors.BLUE_DARK};
  display: flex;

  .login__inner {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .login__logo {
    margin: ${Spacings.SMALL}px 0 0;
    width: 130px;
    height: 150px;
  }

  .login__register {
    border-top: 1px solid ${Colors.GREY_LIGHT};
    width: 100%;
    max-width: 500px;
    margin-top: ${Spacings.LARGE}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.WHITE};
    text-align: center;
  }

  .login__form {
    width: 100%;
    max-width: 400px;
    min-height: 250px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  .onboard__account {
    border-top: 1px solid ${Colors.GREY_LIGHT};
    width: 100%;
    margin-top: ${Spacings.LARGE}px;
    margin-bottom: ${Spacings.LARGE}px;
    font-size: ${Spacings.FONT.BODY};
    color: ${Colors.WHITE};
    text-align: center;
  }
  .onboard__account Button{
    margin-top:1em;
  }
  .error {
    margin-top: ${Spacings.MEDIUM}px;
    color:red;
    font-size: ${Spacings.FONT.LABEL};
  }
   .onboard_success {
    text-align: center;
    height: 300px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    h3 {
      margin: 0;
      padding: 0;
      color: black;
      font-size: ${Spacings.FONT.TITLE};
    }
    .onboard_success-info {
      text-shadow: -2px 1px 4px black;
      color: #20d630;
      font-size: 20px;
    }
  }

  a {
    color: ${Colors.GREY_LIGHT};
  }
`
export const Label = styled.div`
  padding: ${Spacings.LARGE}px ${Spacings.MEDIUM}px;
  font-size: ${Spacings.FONT.BODY};
`
