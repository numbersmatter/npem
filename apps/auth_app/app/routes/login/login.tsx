



export default function Login() {

  return (
    <div>
      <h1>Login</h1>
      <form method="post">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );

}