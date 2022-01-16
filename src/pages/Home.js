import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'


const Home = () => {
    
    // const handlelogin=()=>{

    //     auth.signInWithPopup(provider)
    //       .then((result) => {
    //         console.log(result);
    //       }).catch((error) => {
    //        console.log(error);
    //       });      
    // }

    return (
        <>
           <Navbar/>
           
           <h2>i am home page</h2>
           <button type="button">Login with google</button>
           <Footer/>
           {/* navbar  */}
           {/* main Body */}
           {/* footer */}
        </>
    )
}

export default Home
