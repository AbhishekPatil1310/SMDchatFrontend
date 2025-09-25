import react from 'react'
import FeaturesSection from '../componete/FeaturesSection'
import HeroSection from '../componete/HeroSection'
import { Navigate } from 'react-router-dom'
import Sidebar from '../componete/sidebar'

export default function Dashboard(){

  return(<>
  <HeroSection/>
  <FeaturesSection/>
  </>)
}