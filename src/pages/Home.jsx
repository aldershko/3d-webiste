import React, { useState } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import  Islando from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

{/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>POPUP</div> */}
const Home = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [isRotating,setIsRotating] = useState(true)

    const adjustIslandForScreenSize = () =>{
        let islandScale = null;
        let islandPosition = [0,-6.5,-43]
        let rotation  = [0.1,4.7,0]

        if(window.innerWidth < 768){
            islandScale = [0.9,0.9,0.9]
        }else{
            islandScale = [1,1,1]
        }
        return [islandScale,islandPosition,rotation]
    }

    const adjustPlaneForScreenSize = () =>{
        let screenScale 
        let screenPosition 
   

        if(window.innerWidth < 768){
            screenScale = [1.5,1.5,1.5]
            screenPosition = [0,1.5,0]
            
        }else{
            screenScale = [3,3,3]
            screenPosition = [0,-4,-4]
        }
        return [screenScale,screenPosition]
    }

    const[planeScale,planePosition] = adjustPlaneForScreenSize()

    const [islandScale,islandPosition ,islandRotation] = adjustIslandForScreenSize();

    
  return (
    <section className='w-full h-screen relative'>
        <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
            {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>
        <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' :'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}
        >
            <Suspense fallback = {<Loader />}>
                <directionalLight position={[1,1,1]} intensity={2} />
                <ambientLight intensity={0.5}/>
               
                <hemisphereLight skyColor='#b1e1ff' groundColor="#000000" intensity={1} />
                <Bird />
                <Sky  isRotating={isRotating}/>
                <Islando
                scale={islandScale}
                position={islandPosition}
                rotation={islandRotation}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
                setCurrentStage={setCurrentStage}
                

                 />
                <Plane
                planeScale = {planeScale}
                planePosition = {planePosition}
                isRotating = {isRotating}
                
                rotation ={[0,20,0]} />
            </Suspense>

        </Canvas>
    </section>
  )
}

export default Home