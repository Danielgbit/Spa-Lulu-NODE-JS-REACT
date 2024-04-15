import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'


const Profile = () => {

  const { userData, loadUser } = useContext(UserContext);
  const { id, name, email } = userData; 
  const [ imageUrl, setImageUrl ] = useState();


  useEffect(() => {
    setImageUrl(`http://localhost:4000/user/avatar/${id}`);
  }, [id]);

  return (
    <div className='profile-body'>
    <div className="profile-card-container playing">
        <div className="image">
          </div>
            <div className="profile-wave"></div>
            <div className="profile-wave"></div>
            <div className="profile-wave"></div>
          <div className="profile-infotop">
            { imageUrl?.length > 0 &&  (
              <img className='profile-avatar-img' src={imageUrl} alt="avatar"/>
            )}
              <div className="name">
                <div className='profile-info-wrapper'>
                  <i class="fa-regular fa-user"></i>
                  <h1>{name}</h1>
                </div>
                <div className='profile-info-wrapper'>
                  <i class="fa-solid fa-envelope"></i>
                  <p>{email}</p>
                </div>
              </div>
              <div className='profile-update-buttons-container'>
                  <button className="profile-action-button">
                    <Link to={'/profile/update'}> <span className="text">E D I T A R</span> </Link>
                    <span className="circle"></span>
                  </button>

                  <button className="profile-action-button">
                    <Link to={'/profile/delete'}> <span className="text">E L I M I N A R</span> </Link>
                    <span className="circle"></span>
                  </button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Profile