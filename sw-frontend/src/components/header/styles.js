import styled from 'styled-components'
import { Colors, Spacings } from 'config'

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 100;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  /* border-bottom: 1px solid ${Colors.GREY_LIGHT}; */
  background-color: ${Colors.WHITE};
  box-shadow: 0 2px 2px 0px #33333312;

  .header__title {
    color: ${Colors.BLUE_BASE};
    letter-spacing: 1px;
    font-size: ${Spacings.FONT.TITLE};
    font-weight: 600;
  }
  .header__rightsubicon{
    width: 25px;
    height: 25px;
    position: absolute;
    right: 43px;
    top: 15px;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      path {
        stroke-width: 5px;
        fill: ${Colors.BLUE_BASE};
      }
    }

    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      right: 70px;
      top: auto;
    }
  }
  .header__righticon {
    width: 25px;
    height: 25px;
    position: absolute;
    right: ${Spacings.MEDIUM}px;
    top: 12px;
    cursor: pointer;

    svg path {
      fill: ${Colors.BLUE_BASE};
    }

    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      right: 70px;
      top: auto;
    }
  }
  .header__logo {
    width: 50px;
    height: 50px;
  }
  .header__menu-item {
    font-size: ${Spacings.FONT.LABEL} !important;
    padding: 5px !important;
  }

  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    height: 100px;

    .header__title {
      display: none;
    }
  }
`
export const LogoContainer = styled.div`
  height: 100%;
  width: 60px;
  height: 90%;
  position: absolute;
  left: 70px;
  top: 16px;
  display: none;

    @media (min-width: ${Spacings.SCREEN.TABLET}px) {
      display: block;
    }
  
  svg path {
    fill: ${Colors.BLUE_BASE};
    stroke: ${Colors.BLUE_BASE};
  }
}`

export const NavFooter = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding-bottom: 0;
`

export const NavLogo = styled.div`
  width: 150px;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${Spacings.MEDIUM}px;
  margin-bottom: ${Spacings.MEDIUM}px;
  background: ${Colors.BLUE_BASE};
  div {
    width: 85px;
    margin: ${Spacings.MEDIUM}px 36px ${Spacings.SMALL * 2}px;
  }
  svg path {
    fill: ${Colors.WHITE};
    stroke: ${Colors.WHITE};
  }
`

export const NavMenuItem = styled.li`
  width: 100%;
  height: 40px;
`

export const HomeButton = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  cursor: pointer;
  left: ${Spacings.MEDIUM}px;
  top: 12px;
  svg path {
    fill: ${Colors.BLUE_BASE};
  }
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    display: none;
    top: auto;
  }
`
export const Container = styled.div`
  width: 100%;
  max-width: ${Spacings.MAX_WIDTH}px;
  height: 100%;
  position: relative;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Desktop = styled.div`
  width: 80%;
  padding: 0 10%;
  display: none;
  justify-content: center;
  @media (min-width: ${Spacings.SCREEN.TABLET}px) {
    display: ${({ active }) => (active ? 'flex' : 'none')};
  }
`

export const NavItem = styled.button`
  border: 0;
  padding: ${Spacings.SMALL}px;
  /* background: grey; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 0 ${Spacings.SMALL}px;
  color: ${({ active }) => (active ? Colors.GREY_LIGHT : Colors.BLUE_BASE)};
  font-size: 20px;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New";
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  background: transparent;
  border-bottom: ${({ active }) =>
    active ? `2px solid ${Colors.ORANGE_BASE}` : 'none'};
  transition: color .2s ease, border .7s ease;

  &:hover {
    color: ${Colors.GREY_LIGHT};
  }
`
