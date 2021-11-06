import React, { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import EntryComponent, {
  EntryBottomLink,
  LoginConfirmButton,
  EntryButtonContainer,
  EntryForm,
  EntryInput,
  EntryInputContainer,
} from "../EntryComponent.js";
import { EntryContext } from "../contexts/EntryContext";

const Signup = () => {
  const { signup, history } = useAuth();
  const { emailRef, passwordRef, usernameRef, setError, loading, setLoading } =
    useContext(EntryContext);

  // function to handle reset request
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
    window.location.reload();
    setLoading(false);
  };

  // componenent for signup form
  const SignupForm = (
    <EntryForm onSubmit={handleSubmitSignup}>
      <EntryInputContainer>
        <EntryInput
          type="text"
          id="username"
          name="username"
          placeholder="@username"
          ref={usernameRef}
          required
        />
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
          id="pwd"
          name="pwd"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <LoginConfirmButton disabled={loading} type="submit">
          Join
        </LoginConfirmButton>
      </EntryInputContainer>
    </EntryForm>
  );

  // message to let user login instead
  const LoginMessage = (
    <>
      Already have an account?{" "}
      <EntryBottomLink to="/login">Log in</EntryBottomLink>
    </>
  );
  return (
    <EntryComponent
      title="Sign up"
      form={SignupForm}
      bottomMessage={LoginMessage}
    />
  );
};

export default Signup;
