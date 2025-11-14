import { LoginForm } from '../LoginForm'

export default function LoginFormExample() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-muted/20">
      <LoginForm
        onSubmit={(data) => console.log('Login:', data)}
      />
    </div>
  )
}
