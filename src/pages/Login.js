import React, { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { EntryContext } from "../contexts/EntryContext";
import {
  EntryBottomLink,
  EntryForgotMessage,
  LoginConfirmButton,
  EntryButtonContainer,
  EntryForm,
  EntryInput,
  EntryInputContainer,
} from "../EntryComponent.js";
import EntryComponent from "../EntryComponent";
import { Container } from "../components/Common/styles";

const Login = () => {
  const { login, history } = useAuth();
  const { emailRef, passwordRef, setError, loading, setLoading } =
    useContext(EntryContext);

  // function to handle login request
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
    await window.location.reload(); // reload the page to triger getTasks
    setLoading(false);
  };

  // componenent for login form
  const LoginForm = (
    <EntryForm onSubmit={handleSubmitLogin}>
      <EntryInputContainer>
        <EntryInput
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          spellcheck="false"
          ref={emailRef}
          required
        />
        <EntryInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <LoginConfirmButton disabled={loading} type="submit">
          Log in
        </LoginConfirmButton>
        <EntryBottomLink to="/reset">Forgot password?</EntryBottomLink>
      </EntryInputContainer>
    </EntryForm>
  );

  // message to let user go to signup page instead
  const SignupMessage = (
    <>
      Don't have an account?{" "}
      <EntryBottomLink to="/signup">Sign up</EntryBottomLink>
    </>
  );

  return (
    <Container>
      <EntryComponent
        title="Log in"
        form={LoginForm}
        bottomMessage={SignupMessage}
      />
    </Container>
  );
};

export default Login;
