export default function SignUpPage() {
  return (
    <div className="pd-20">
      <h2>Sign Up</h2>
      <form method="POST" action="/api/auth/signup">
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input
          name="passwordCheck"
          type="password"
          placeholder="Password-Check"
          required
        />
        <input name="username" type="text" placeholder="Username" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
