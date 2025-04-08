import Head from "../components/Head.tsx";

export default function Login() {
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
        <input id="submit" type="submit" name="login" value="Login" />
        <p id="reset-password-help">
          If you have forgotten your password, email
          <a id="admin-email" href="mailto:admin@example.com">
            admin@example.com
          </a>.
        </p>
      </form>
    </>
  );
}
