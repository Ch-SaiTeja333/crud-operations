import React, { lazy, Suspense } from 'react'
import RootLayout from './components/RootLayout';
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router';
// import Header from '../../react-routing=lazy=contextApi/src/components/Header';
function App() {
  const Header=lazy(()=> import('./components/Header'));
  const CreateUser=lazy(()=> import ('./components/CreateUser'));
  const Read =lazy(()=> import ('./components/Read'));
  const Update =lazy(()=>import ('./components/Update'));
  const Delete =lazy(()=>import ('./components/Delete'));
  const browserObj=createBrowserRouter([
    {
        path:"",
        element:<RootLayout></RootLayout>,
        children:[
                  {
                        path:"createuser",
                        element:<Suspense fallback={
                                           <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status"></div>
                                           </div>
                                            }><CreateUser></CreateUser></Suspense>
                  },
                  {
                        path:"read",
                        element:<Suspense fallback={
                                            <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status"></div>
                                           </div>
                                            }><Read></Read></Suspense>
                    },
                    {
                        path:"update",
                        element:<Suspense fallback={
                                           <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status"></div>
                                           </div>
                                            }><Update></Update></Suspense>
                    },
                    {
                        path:"delete",
                        element:<Suspense fallback={
                                            <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status"></div>
                                           </div>
                                            }><Delete></Delete></Suspense>
                    }
        ]
    }
  ]);

  return (
    <RouterProvider router={browserObj}></RouterProvider>
  )
}

export default App
