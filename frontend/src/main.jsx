import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {Dashboard} from './pages/Dashboard.jsx';
import {Send} from './pages/Send.jsx';
import {Signin} from './pages/Signin.jsx';
import {Signup} from './pages/Signup.jsx';



const router  = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/signup',
        element: <Signup/>
      },
      {
        path:"/signin",
        element: <Signin/>
      },
      {
        path:"/send",
        element:<Send/>
      },
      {
        path:"/Dashboard",
        element:<Dashboard/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
