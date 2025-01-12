import { React } from 'react'
import { Container, Form, FormControl } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { useState, useEffect } from 'react'

//Redux
import { useDispatch } from 'react-redux'
import { register, logAction } from '../actions/loginActions'

// Controlled components (form handling)
const LoginPage = (props) => {
  // Map Dispatch to props
  const dispatch = useDispatch()

  // state of LoginPage
  const [state, setState] = useState({
    isReg: false,
    staffName: '',
    login: '',
    password: '',
    confirmPassword: '',
  })

  //useEffect being intitiated if 'isReg' state is changed
  useEffect(() => {}, [state.isReg])

  //function which changes a type of form for login/reg
  const changeToReg = (event) => {
    if (event.target.name === 'Registration') {
      props.setError('Registration form')
      setState((state) => {
        return {
          staffName: '',
          login: '',
          password: '',
          confirmPassword: '',
          isReg: true,
        }
      })
    }
    if (event.target.name === 'Authorization') {
      props.setError('Authorization form')
      setState((state) => {
        return {
          ...state,
          isReg: false,
        }
      })
    }
  }

  //define method 'onChange' as a property, that is equal as an arrow function,
  //where 'event' is passed as a parameter
  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      }
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (state.login === '' || state.password === '') {
      props.setError('Please fill out the form below')
      return
    }
    if (state.login.length < 4 || state.password.length < 8) {
      // the message will appear in messageArea of App's component by changig state's parameter 3setError=(error)
      props.setError(
        'Login needs to be at least four and password eight characters long'
      )
      return
    }

    // create object 'user' from values of state
    let user = {
      login: state.login,
      password: state.password,
    }
    let newUser = {
      staffName: state.staffName,
      login: state.login,
      password: state.password,
      confirmPassword: state.confirmPassword,
    }
    if (event.target.name === 'Registration') {
      /* props.register(newUser) */
      dispatch(register(newUser))
      //to clear reg. form from inputed data
      setState({
        staffName: '',
        login: '',
        password: '',
        confirmPassword: '',
      })
      console.log('before: ' + state.staffName)

      console.log('after: ' + state.staffName)
    } else {
      // Testing of Redux
      dispatch(logAction(user))
    }
  }

  //get the names shorter in return(), as the state.login and state.password to login and password.
  const { staffName, login, password, confirmPassword } = state

  return (
    <Card style={{ width: 450 }} className="d-flex card-box p-4 mt-5">
      <h2>{state.isReg ? 'Registration' : 'Authorization'}</h2>
      <div style={{ width: 400, backgroundColor: 'light-grey' }}>
        <Form className="d-flex flex-column">
          {state.isReg && (
            <label htmlFor="staffName" className="form-label mb-0 mt-3">
              Name
            </label>
          )}
          {state.isReg && (
            <FormControl
              type="text"
              name="staffName"
              id="staffName"
              className="mt-2"
              placeholder="Enter your name..."
              onChange={onChange}
              value={staffName}
            />
          )}

          <label htmlFor="login" className="form-label mb-0 mt-3">
            Login
          </label>
          <FormControl
            type="text"
            name="login"
            id="login"
            className="mt-2"
            placeholder="Enter your login..."
            onChange={onChange}
            value={login}
          />
          <label htmlFor="password" className="form-label mb-0 mt-3">
            Password
          </label>
          <FormControl
            type="password"
            name="password"
            id="password"
            className="mt-2"
            placeholder="Enter your password"
            onChange={onChange}
            value={password}
          />
          {state.isReg && (
            <label htmlFor="confirmPassword" className="form-label mt-2">
              Confirm password
            </label>
          )}
          {state.isReg && (
            <FormControl
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-2"
              placeholder="Repeat your password"
              onChange={onChange}
              value={confirmPassword}
            />
          )}
        </Form>
        <Row className="d-flex justify-content-between mt-5">
          <div className="d-grid gap-4">
            <Button
              variant={'outline-success'}
              className="btn"
              name={state.isReg ? 'Registration' : 'Login'}
              onClick={onSubmit}
            >
              {state.isReg ? 'REGISTER IN' : 'SIGN IN'}
            </Button>
            <Button
              variant={'outline-primary'}
              className="btn"
              name={state.isReg ? 'Authorization' : 'Registration'}
              onClick={changeToReg}
            >
              {state.isReg ? 'Authorization' : 'Registration'}
            </Button>
          </div>
        </Row>
      </div>
    </Card>
  )
}

export default LoginPage
