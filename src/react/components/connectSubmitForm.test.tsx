import * as React from 'react'
import {mount} from 'enzyme'

import {connectSubmitForm, InjectedSubmitFormProps} from './connectSubmitForm'
import {DeepWrapperType} from 'src/util'

describe('connectSubmitForm HOC', () => {
  let props: any
  let wrapper: DeepWrapperType
  let wrappedComponent: DeepWrapperType
  let redirect = jest.fn()

  function getProps() {
    return wrappedComponent.instance().props as InjectedSubmitFormProps<void>
  }

  async function submit(promise: Promise<any>) {
    let submitProp = wrappedComponent.props().submit
    let p = submitProp('/zach', promise) as Promise<void>
    await p
  }

  beforeEach(() => {
    props = {history: {push: redirect}}
    let Submit = connectSubmitForm()(MyComponent)
    wrapper = mount(<Submit {...props} />)
    wrappedComponent = wrapper.childAt(0)
  })

  it('passes correct initial props to wrapped component', () => {
    expect(wrappedComponent.prop('isSubmitted')).toBe(false)
    expect(wrappedComponent.prop('error')).toBeFalsy()
    expect(wrappedComponent.prop('submit')).toBeTruthy()
  })

  it('updates isSubmitted upon calling submit()', async () => {
    expect(getProps().isSubmitted).toBe(false)
    await submit(Promise.resolve())
    expect(getProps().isSubmitted).toBe(true)
  })

  it('updates isSubmitted and sends error upon failed submit()', async () => {
    expect(getProps().isSubmitted).toBe(false)

    await submit(Promise.reject())

    expect(getProps().isSubmitted).toBe(false)
    expect(getProps().error).toBeTruthy()
  })

  it('redirects on successful submit', async () => {
    await submit(Promise.resolve())
    expect(redirect).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenLastCalledWith('/zach')
  })

  it('does not redirect on failed submit', async () => {
    await submit(Promise.reject())
    expect(redirect).toHaveBeenCalledTimes(0)
  })

  it('awaits the passed promise before redirecting', (done) => {
    expect(getProps().isSubmitted).toBe(false)

    submit(new Promise((resolve) => {
      expect(redirect).toHaveBeenCalledTimes(0)
      setTimeout(() => {
        expect(getProps().isSubmitted).toBe(true)
        // Submit has been called, but we are not yet redirected
        // because the promise has not yet been completed
        expect(redirect).toHaveBeenCalledTimes(0)

        // Complete the promise
        resolve()
        setTimeout(() => {
          // Redirect has now happened
          expect(redirect).toHaveBeenCalledTimes(1)
          done()
        }, 10)
      }, 500)
    }))
  })

})

type MyProps = InjectedSubmitFormProps<void>
class MyComponent extends React.Component<MyProps, {}> {
  public render() { return <div>Zach is cool</div> }
}
