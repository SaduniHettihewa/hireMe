import hireMe from '../../assets/hireMe.png';
import React from 'react'
import './LandingPage.css'
import { useHistory } from 'react-router-dom';

function LandingPage() {
    const history = useHistory();
    return (
        
            <div class="container-fluid homepage-bgimage">
              
              <img src={hireMe} className="logo" ></img>

                    <button className="button" onClick={() => history.push("/Dashboard")}>

                        Let's Get Started

                    </button>

                </div>

        


       
    )
}

export default LandingPage
