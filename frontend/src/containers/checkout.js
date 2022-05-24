import React, { useCallback, useRef }from 'react';
// import { useNavigate } from 'react-router-dom';
import ReactCanvasConfetti from "react-canvas-confetti";
import checkout from "../images/checkout.jpg"

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };


export default function Checkout(){
    // const nav=useNavigate();

    // return(
    //     <button onClick={()=>nav('/myCart')}>return</button>
    // )
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
        refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
        });
    }, []);

    const fire = useCallback(() => {
    makeShot(0.25, {
        spread: 26,
        startVelocity: 55
    });

    makeShot(0.2, {
        spread: 60
    });

    makeShot(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    makeShot(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    makeShot(0.1, {
        spread: 120,
        startVelocity: 45
    });
    }, [makeShot]);


    const repeatImageLoad = () => {
        setInterval(() => {
            fire();
        }, 2000)
    }

    return (
    <>
        <h1>Congrats, Your order was successfully placed!</h1>
        <img src={checkout} onLoad={repeatImageLoad} alt="not found"></img>
        {/* <button onClick={fire}>Fire</button> */}
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        <p>Image credit - <a href="https://pixabay.com/photos/salad-fruit-berry-healthy-vitamins-7040875/">pixabay.com</a></p>
    </>
    );
}