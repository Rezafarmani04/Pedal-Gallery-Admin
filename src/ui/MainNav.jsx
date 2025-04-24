import styled from 'styled-components';
import { HiHome, HiUsers, HiUser, HiCog } from 'react-icons/hi2';
import { FaCar, FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import Logout from '../features/authentication/Logout';
import { useState } from 'react';

const NavList = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px 40px;
  color: #0c0b3a;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-left: 40px;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #6d6d89;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-top: 3px;
  gap: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SLogo = styled(Logo)`
  img {
    height: 6rem;
    width: auto;

    @media (max-width: 768px) {
      height: 4rem;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0c0b3a;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  flex-direction: column;
  align-items: center;

  &.open {
    display: flex;
  }
`;

const MobileLink = styled(NavLink)`
  display: none;
  align-items: center;
  margin: 15px 0;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileAccountContainer = styled.div`
  display: none;
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavList>
        <StyledLink to="dashboard">
          <HiHome />
          خانه
        </StyledLink>
        <StyledLink to="users">
          <HiUsers />
          کاربر ها
        </StyledLink>
        <StyledLink to="cars">
          <FaCar />
          خودرو ها
        </StyledLink>
        <StyledLink to="settings">
          <HiCog />
          تنظیمات
        </StyledLink>

        <LogoContainer>
          <div style={{ display: 'flex', gap: '2px' }}>
            <StyledLink to="Account">
              <HiUser />
            </StyledLink>
            <StyledLink>
              <Logout />
            </StyledLink>
            <SLogo />
          </div>
        </LogoContainer>

        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </MobileMenuButton>
      </NavList>

      <MobileMenu className={isMenuOpen ? 'open' : ''}>
        <MobileLink to="dashboard" onClick={toggleMenu}>
          <HiHome />
          خانه
        </MobileLink>
        <MobileLink to="users" onClick={toggleMenu}>
          <HiUsers />
          کاربر ها
        </MobileLink>
        <MobileLink to="cars" onClick={toggleMenu}>
          <FaCar />
          خودرو ها
        </MobileLink>
        <MobileLink to="settings" onClick={toggleMenu}>
          <HiCog />
          تنظیمات
        </MobileLink>

        <MobileAccountContainer>
          <MobileLink to="Account" onClick={toggleMenu}>
            <HiUser />
            حساب کاربری
          </MobileLink>
          <MobileLink onClick={toggleMenu}>
            <Logout />
            خروج
          </MobileLink>
        </MobileAccountContainer>
      </MobileMenu>
    </>
  );
}

export default MainNav;
