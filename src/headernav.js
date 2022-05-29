import React from "react";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import logo from './images/companyLogo.jpeg'
const cookies = new Cookies();
 

function HeaderNav(){
    const userData = cookies.get('userData');

    return(
        <div>
            <div class="headerNav">
                <div className="nav">
                    <div className="logo">
                        <img src={logo} alt='logo' className='logo'/>
                    </div>
                    <div className="signin-links">
                       {userData?.name ?  `Welcome ${userData?.name}` : ''}
                        {/* <Link to="" className="signin-link">SignUp</Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderNav;