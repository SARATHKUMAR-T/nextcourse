import Logo from "./components/logo"
import Navigation from "./components/navigation"

export const metadata = {
  title: 'The Wild Oasis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>
          {children}
        </main>
        <footer>
          copywright by th wild oasis.
        </footer>
      </body>
    </html>
  )
}
