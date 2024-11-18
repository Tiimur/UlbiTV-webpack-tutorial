import reactDom from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {App} from '@/components/App';
import {About} from '@/pages/About';
import {Shop} from '@/pages/Shop/';
import {Suspense} from 'react';

const rootElement = document.getElementById('root')
if (!rootElement){
    throw new Error('Root as div element is not initilazed. Check a index.tsx and public/index.html files');
}

const root: reactDom.Root = reactDom.createRoot(rootElement);

const router = createBrowserRouter(
    [
        // RouteObject instances and fields from IndexRouteObject interface
        {
            path: '/',
            element: (<App />),
            children: [
                {
                    path: '/about',
                    element: 
                    <Suspense fallback = {'Loading...'}>
                        <About />
                    </Suspense>,
                    // element:
                    // <About />,
                },
                {
                    path: '/shop',
                    element:
                    <Suspense fallback = {'Loading...'}>
                        <Shop />
                    </Suspense>,

                    // element:
                    // <Shop />
                },
            ],
        },
 
    ],
);

root.render(
    <RouterProvider router={router} />    

);
