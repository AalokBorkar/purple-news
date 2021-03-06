// some helpful code for firebase interaction taken from https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../Firebase';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import { Container, Col, Card, Row } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <Container>
    <Row className="text-center justify-content-center">
      <Col md="8">
        <Card className="shadow">
          <Card.Body>
            <Card.Title>Sign Up</Card.Title>
            <Card.Text>
              <FirebaseContext.Consumer>
                {firebase => <SignUpForm firebase={firebase} />}
              </FirebaseContext.Consumer>
              <SignUpLink />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const {username, email, passwordOne} = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne, username)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({error});
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form className="sign-form" onSubmit={this.onSubmit}>
        <div>
          <input
            className="sign"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Display Name"
          />
        </div>
        <div>
          <input
            className="sign"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email"
            autoComplete="new-username"
          />
        </div>
        <div>
          <input
            className="sign"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        </div>
        <div>
          <input
            className="sign"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
        </div>
        <button disabled={isInvalid} type="submit" className="btn btn-primary" id="sign-submit">Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export {SignUpForm, SignUpLink};
