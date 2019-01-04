import {ShallowWrapper, ReactWrapper} from 'enzyme'

export type ShallowWrapperType = ShallowWrapper<any, any, React.Component<{}, {}, any>>
export type DeepWrapperType = ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
