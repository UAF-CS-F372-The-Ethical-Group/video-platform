/**
 *  Define components and markup for the register page.
 */
import Head from "./Head.tsx";


/**
 *  Generates base layout for the register page.
 */
export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <h1 id="register-header">Create an Account</h1>
      <form id="register-form" action="/register.html" method="post">
        <label id="email-label" for="username">Username:</label>
        <input type="email" id="username" name="username" />
        <br />
        <label id="password-label" for="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br />
        <label id="confirm-password-label" for="confirmPassword">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
        />
        <br />
        <input
          id="submit"
          type="submit"
          name="register"
          value="Register"
        />
        <p id="login-redirect">
          Have an account?{" "}
          <a id="login-link" href="/login.html">Login</a>
        </p>
      </form>
    </>
  );
}
