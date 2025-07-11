import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!document.getElementById('spline-script')) {
      const script = document.createElement('script')
      script.id = 'spline-script'
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.26/build/spline-viewer.js'
      document.body.appendChild(script)
    }
  }, [])

  const handleClick = () => {
    setTimeout(() => {
      navigate('/create-room')
    }, 2000) 
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onClick={handleClick}
    >
      <spline-viewer
        url="https://prod.spline.design/PLvY3OWHTMG1fevs/scene.splinecode"
        className="absolute inset-0 w-full h-[110vh]"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      ></spline-viewer>

     
    </div>
  )
}
