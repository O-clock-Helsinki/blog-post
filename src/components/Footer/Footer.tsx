import { useState } from "react"
import "./Footer.scss"

function Footer() {
  const [email, setEmail] = useState("")
  const [isSent, setIsSent] = useState(false)

  const now = new Date()
  const year = now.getFullYear()

  function handleAction() {
    console.log("data sent")
    setIsSent(true)
  }

  return (
    <footer className="copyright">
      DevOfThrones, le blog du développeur React - {year} ©
      {isSent ? (
        <div className="confirm">
          Vous êtes maintenant abonné à la newsletter avec l'adresse {email}
        </div>
      ) : (
        <form action={handleAction} className="newsletter">
          <label htmlFor="input-newsletter">
            Indiquez votre adresse e-mail pour vous abonner à la
            newsletter&nbsp;:
            <input
              type="text"
              id="input-newsletter"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">Valider l'abonnement</button>
        </form>
      )}
    </footer>
  )
}

export default Footer
