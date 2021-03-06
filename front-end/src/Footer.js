import './Footer.css';
import { IoIosAddCircleOutline, IoIosAddCircle } from 'react-icons/io';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { AiOutlineSetting, AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  const footerLinks = [
    {
      title: 'Create a new post',
      link: '/NewPost',
      icon: <IoIosAddCircleOutline size="30px" />,
      boldIcon: <IoIosAddCircle size="30px" />,
    },
    {
      title: 'Feed',
      link: '/Feed',
      icon: <AiOutlineHome size="30px" />,
      boldIcon: <AiFillHome size="30px" />,
    },
    {
      title: 'My Profile',
      link: '/MyProfile',
      icon: <BsPerson size="30px" />,
      boldIcon: <BsPersonFill size="30px" />,
    },
    {
      title: 'Settings',
      link: '/Settings',
      icon: <AiOutlineSetting size="30px" />,
      boldIcon: <AiFillSetting size="30px" />,
    },
  ];

  return (
    <footer className="footer">
      <nav className="footer-links">
        {footerLinks.map(function (footerLink) {
          if (footerLink.title === props.title) {
            return (
              <b>
                <Link to={footerLink.link}>{footerLink.boldIcon}</Link>
              </b>
            );
          } else return <Link to={footerLink.link}>{footerLink.icon}</Link>;
        })}
      </nav>
    </footer>
  );
};

export default Footer;
