

import { Route as rootRouteImport } from './routes/__root'
import { Route as CommunityPostIdImport } from './routes/community.$postId'
import { Route as CommunityIndexImport } from './routes/community.index'
import { Route as IndexImport } from './routes/index'

const CommunityPostIdRoute = CommunityPostIdImport.update({
  id: '/community/$postId',
  path: '/community/$postId',
  getParentRoute: () => rootRouteImport,
} as any)

const CommunityIndexRoute = CommunityIndexImport.update({
  id: '/community/',
  path: '/community/',
  getParentRoute: () => rootRouteImport,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRouteImport
    }
    '/community/$postId': {
      id: '/community/$postId'
      path: '/community/$postId'
      fullPath: '/community/$postId'
      preLoaderRoute: typeof CommunityPostIdImport
      parentRoute: typeof rootRouteImport
    }
    '/community/': {
      id: '/community/'
      path: '/community/'
      fullPath: '/community/'
      preLoaderRoute: typeof CommunityIndexImport
      parentRoute: typeof rootRouteImport
    }
  }
}

export const routeTree = rootRouteImport._addFileChildren({
  IndexRoute,
  CommunityPostIdRoute,
  CommunityIndexRoute,
})