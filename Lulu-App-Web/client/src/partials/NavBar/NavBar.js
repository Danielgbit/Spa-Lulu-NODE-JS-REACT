import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { AdminContext } from "../../Context/AdminContext";
import { Menu, Dropdown } from 'antd';
import { DownOutlined} from '@ant-design/icons';

const NavBarComponent = () => {
  const { cartData, quantityCartItems } = useContext(CartContext);
  const { userData, sendLogout, setUserData, isAutenticated, username } = useContext(UserContext);
  const { admin, isAutorized, logoutAdmin } = useContext(AdminContext);

  const [ lengthCartItems, setCartItemsLength ] = useState(null);
  const [ quantityCart, setQuantityCart ] = useState(0);
  const [ scroll, setScroll ] = useState(false);
  const [ prevScrollPos, setPrevScrollPos ] = useState(0);
  const [ isVisible, setIsVisible ] = useState(true);
  const [ mainAction, setMainAction ] = useState(false);

  const scrollThreshold = 100;

  const navigate = useNavigate();


  useEffect(() => {
    setCartItemsLength(cartData?.lengthItems);
  }, [cartData]);

  useEffect(() => {
    setQuantityCart(quantityCartItems + quantityCart);
  }, [quantityCartItems]);

  const onClickLogout = () => {
    if (isAutorized) {
      logoutAdmin();
      navigate("/");
    }
  };

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      if (isAutenticated) {
        setUserData(null);
        sendLogout();
        navigate("/");
      }

    } else if (e.key === 'settings') {
      navigate('/profile')
    }else if (e.key === 'shoppingHistory') {
      navigate(`/profile/shop/history/${userData.id}`);
    };
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="shoppingHistory">Historial de compras</Menu.Item>
      <Menu.Item key="settings">Configuración</Menu.Item>
      <Menu.Item key="logout">Salir</Menu.Item>
    </Menu>
  );


  const handleScrollNavBar = () => {
    if(window.scrollY >= 80){
      setScroll(true);
    }else{
      setScroll(false);
    }
  };

  window.addEventListener('scroll', handleScrollNavBar);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos >= currentScrollPos) {
        setIsVisible(true);
      } else if (currentScrollPos - prevScrollPos > scrollThreshold) {
        setIsVisible(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, scrollThreshold]);

  const handleMenuHzntalGo = () => {
    setMainAction(true);
  };
  
  const handleMenuHzntalExit = () => {
    setMainAction(false);
  };


  return (
    <nav className={`nav-wrapper-max ${scroll ? 'nav-scroll-active' : ''}`} style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-100%)' }}>
      <div className="menu-hzntal-container" >
        <i onClick={handleMenuHzntalGo} className="fa-solid fa-bars icon-go" style={{ display: mainAction ? 'none' : 'block' }}></i>
        <i onClick={handleMenuHzntalExit} className="fa-solid fa-xmark icon-exit" style={{ display: mainAction ? 'block' : 'none' }}></i>
        <div className={`menu-hzntal-wrapper-links ${mainAction ? 'show' : 'hidden'}`} /* style={{ display: mainAction ? 'flex' : 'none'}} */ >
          <ul>
            <Link to={'/'}>
              <li>Inicio</li>
            </Link>
            {!isAutorized && (
              <Link to={'/products'}>
                <li>Productos</li>
              </Link>
            )}
            {!isAutenticated && (
              <Link to={'/ingreso'}>
                <li>Ingreso</li>
              </Link>
            )}
            <Link to={'/contact'}>
              <li>Contacto</li>
            </Link>
          </ul>
          <i class="fa-brands fa-instagram"></i>
        </div>
      </div>
      <Link to={'/'} className="container-logo">
        <h1>Lulú</h1>
      </Link>
      <ul className="nav-links-container">
      {isAutorized && ( 
          <Link
            to={"/admin"}
            style={{ fontWeight: "800" }}
            className="nav-links"
          >
            DashBoard
          </Link>
        )}

        {!isAutorized && ( 
          <Link to={"/"} className="nav-links">
            inicio
          </Link>
        )}

          {!isAutorized && (
            <Link to={"/products"} className="nav-links">
              productos
            </Link>
          )}

        {!isAutorized && (
          <li className="nav-links">contacto</li>
        )}
      </ul>
      <article className="nav-cart-seccion-container">
        {(isAutenticated && userData) || (isAutorized && admin) ? (
          <>
            <div className="nav-user-name-container">
              { isAutenticated && (
                <div className="nav-user-config-container">
                  <i className="fa-solid fa-circle-user"></i>
                  <span className="userName">¡Hola! {username}</span>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <DownOutlined />
                    </a>
                  </Dropdown>
                </div>
              )}
            </div>
              { isAutorized && (
              <>
                <div className="nav-user-name-container">
                  {isAutorized && <span>{`¡Hola! ${admin.name}`}</span>}
                </div>
                <i onClick={() => onClickLogout()} className="fa-solid fa-right-from-bracket logoutAdmin" ></i>
              </>
              )}
          </>
        ) : (
          <Link to={"/ingreso"} className="nav-login-text">
            ingresa
          </Link>
        )}
        
        {!isAutorized && (!userData ? 
          (
            <Link to={"/ingreso"} className="navbar-button-cart-container">
              {" "}
              <i className="fa-solid fa-cart-plus"></i>
              <span>{quantityCart}</span>
            </Link>
          ) : (
            <Link to={"/cart"} className="navbar-button-cart-container">
                <i className="fa-solid fa-cart-plus"></i>
                <span>{lengthCartItems ? lengthCartItems : quantityCart}</span>
            </Link>
          ))}

      </article>
    </nav>
  );
};

export default NavBarComponent;
