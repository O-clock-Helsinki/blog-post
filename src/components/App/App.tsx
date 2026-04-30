import { useEffect, useState } from "react"

import categoriesData from "../../data/categories"
import postsData from "../../data/posts"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Posts from "../Posts/Posts"

import "./App.scss"

function App() {
  // Indique si le mode zen est activé
  const [zenModeEnabled, setZenModeEnabled] = useState(false)
  // zenModeEnabled : variable pour lire la valeur actuelle
  // setZenModeEnabled : fonction qui permet de changer la valeur

  //Je déplace mon state de recherche danss app
  //Afin de partager et diffuser ce state dans Header et dans Posts
  //Je crée un state pour loger le resultat de ma barre de recherche
  //Form Controlé
  const [searchText, setSearchText] = useState("")

  //title ,ne sera pas récupéré aui premier chargement de la page
  const title = document.querySelector(".posts-title")
  console.log(title)
  //Lorsque l'appli est "Chargée" sur le navigateur client
  //Je peux effectuer une action !
  //Le useeffect entre en scene pour ces manoeuvres
  //Le useEffect : pour tout ce qui est EXTERIEUR au V-Dom
  useEffect(() => {
    // Le useEffect : Utile pour fetch API
    // Utile pour async functions
    async function fetchApi() {
      //.....
    }
    console.log("hello guys !")
    //Récupérer des élémentsd du DOM
    //title ,peut être récupéré via le useEffect car joué une fois le component monté
    const title = document.querySelector(".posts-title")
    console.log(title)
    //Addevent listeners etc..... Dans le useEffect

    //Le return du useEffect permet de NETTOYER les effets de bords non désirés après update
    //Cleanup du use effect
    return () => {
      console.log("component unmount")
      //removeEventListener pour nettoyer l'ecouteur au rechargement du composant
    }
  }, [])
  // Dependency array ->
  // [] -> ne se jouera qu'une fois à la première montée du composent
  // [searchText] -> sera joué à chaque fois que le state searchText est modifié
  // Pas de tableau -> sera joué TOUT LE TEMPS !! ⚠️

  return (
    <div className="app">
      <Header
        categories={categoriesData}
        isZenModeEnabled={zenModeEnabled}
        changeZenMode={setZenModeEnabled}
        searchText={searchText}
      />
      <Posts
        posts={postsData}
        isZenModeEnabled={zenModeEnabled}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Footer />
    </div>
  )
}

export default App
