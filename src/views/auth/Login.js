import React , {useCallback, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {Authorisation} from "../../services/API/Authorisation";
import background from "../../assets/img/movie-banner.jpg";

export default function Login(props) {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/'), [history]);

  const [user, setUser] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({errors: []});
  const [errorMessage, setErrorMessage] = useState();

  const onEmailChange = (e) => {
    setUser({...user, email: e.target.value});
    clearValidationErr('email')
  };

  const onPasswordChange = (e) => {
    setUser({...user, password: e.target.value});
    clearValidationErr('password')
  };

  function showValidationErr(elm, msg) {
    setErrors((prevState) => ({errors: [...prevState.errors, {elm, msg}]}));
  }

  function clearValidationErr(elm) {
    setErrors((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err)
        }
      }
      return {errors: newArr}
    });
  }

  let emailErr = null, passwordErr = null, generalErr = null;

  for (let err of errors.errors) {
    if (err.elm === 'email') {
      emailErr = err.msg
    }
    if (err.elm === 'password') {
      passwordErr = err.msg
    }
    if (err.elm === 'general') {
      generalErr = err.msg
    }
  }

  const submit = () => {

      if (user.email === '') {
        showValidationErr('email', 'E-mail cannot be empty!')
      } if (user.password === '') {
        showValidationErr('password', 'Password cannot be empty!')
      } if(user.email !== '' && user.password !== '') {
        Authorisation.authenticate(user)
            .then(response => {
              localStorage.setItem('authentication', true);
              localStorage.setItem("token", `Bearer ${response.data.access_token}`);
              console.log('Authentication Response Data: ', response.data.access_token)
              handleOnClick();
            })
            .catch((error) => {
              showValidationErr('general', 'User was not found, check email and password!');
              setErrorMessage({errorShow: true, errorTitle: 'Wrong credentials', errorMessage: 'You have entered a wrong email or password'});
            })
      }

  };

  return (
    <>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                    `url(${background})`,
              }}
          >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
          >
            <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
            >
              <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
      <div className="container mx-auto px-4 h-full">
        <div className=" flex content-center items-center justify-center h-full -mt-64">
          <div className="w-full lg:w-4/12 px-4 -mt-24">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with credentials
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                      onChange={e => onEmailChange(e)}
                    />
                    <small className='danger-error text-red-500'>{emailErr ? emailErr : ''}</small>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={e => onPasswordChange(e)}
                    />
                    <small className='danger-error text-red-500'>{passwordErr ? passwordErr : ''}</small>
                    <small className='danger-error text-red-500'>{generalErr ? generalErr : ''}</small>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        submit()
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={() => submit()}
                  className="text-blueGray-600"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-600">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
        </section>
      </main>
    </>
  );
}
