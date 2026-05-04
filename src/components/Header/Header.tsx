import { ICategory } from "../../@types"
import "./Header.scss"

interface HeaderProps {
  categories: ICategory[]
  isZenModeEnabled: boolean
  changeZenMode: React.Dispatch<React.SetStateAction<boolean>>
  searchText: string
  errorMessage: string
}

//Je récupère desormais searchText en tant que props
function Header({
  categories,
  isZenModeEnabled,
  changeZenMode,
  searchText,
  errorMessage,
}: HeaderProps) {
  return (
    <header className="menu" id="header">
      <nav>
        {errorMessage || categories.length < 1 ? (
          <a className={`menu-link`} href="/">
            Accueil
          </a>
        ) : (
          categories.map((category) => (
            // Ce qui me permet d'afficher une classe 'selected' conditionnelle  selon la recherche utilisateur
            <a
              className={`menu-link ${searchText.toLowerCase() === category.label.toLowerCase() && "selected"}`}
              href={category.route}
              key={category.label}
            >
              {category.label}
            </a>
          ))
        )}

        <button
          className="menu-btn"
          type="button"
          onClick={() => {
            // on change dans le state de App : le contraire de la valeur actuelle
            changeZenMode(!isZenModeEnabled)

            // meilleure pratique : https://react.dev/learn/state-as-a-snapshot
          }}
        >
          {isZenModeEnabled ? "Désactiver" : "Activer"} le mode zen
        </button>
      </nav>
    </header>
  )
}

export default Header
