import * as H from 'history'
import {match, StaticContext} from 'react-router'

// Props supplied automatically by react router
// Stolen and converted to type from @types/react-router
export type IReactRouterProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = H.LocationState,
> = {
  history?: H.History,
  location?: H.Location<S>,
  match?: match<Params>,
  staticContext?: C,
}

export function pushPathArg(newPathArg: string, history: H.History, state?: any) {
  let currentPath: string = history.location.pathname
  if (!currentPath.endsWith('/')) currentPath += '/'
  let newPath = currentPath + newPathArg

  history.push(newPath, state)
}