/**
 *  Define components and markup for the login page.
 */
import { VNode } from "preact";
import Head from "./Head.tsx";

/**
 *  Generates the base layout for the login page.
 */
export default function LoginPage(): VNode {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <h1 id="login-header">Login</h1>
      <form id="login-form" action="/login.html" method="post">
        <label id="email-label" for="username">Username:</label>
        <input type="email" id="username" name="username" />
        <br />
        <label id="password-label" for="password">Password:</label>
        <input type="password" id="password" name="password" />
        <br />
        <input id="submit" type="submit" name="login" value="Login" />
        <p id="reset-password-help">
          Forgot password? Email{" "}
          <a id="admin-email" href="mailto:admin@example.com">
            admin@example.com
          </a>.
        </p>
        <p id="register-redirect">
          Don't have an account?{" "}
          <a id="register-link" href="/register.html">Register</a>
        </p>
      </form>
    </>
  );
}
