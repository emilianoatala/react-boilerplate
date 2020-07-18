import { lazy } from 'react'

export const routes = {
    fallBack: () => "",
    DemoView: lazy(() => import('./views/DemoView')),
}