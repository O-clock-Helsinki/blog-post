import { useEffect, useState } from "react"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Posts from "../Posts/Posts"

import "./App.scss"
import { ICategory, IPost } from "../../@types"
import Loader from "../loader/Loader"

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

  // je crée un state pour stocker les datas provenants d'API
  const [posts, setPosts] = useState<IPost[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  //Préparation messages d'erreur
  const [errorPostsMessage, setErrorPostsMessage] = useState("")
  const [errorCategoriesMessage, setErrorCategoriesMessage] = useState("")

  //Préparation Loader
  const [isLoading, setIsLoading] = useState(false)

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
    //Je récupère mes posts via ce useEffect
    async function fetchApi() {
      const url = "https://oclock-api.vercel.app/api/blog/"
      const error = "Un problème est survenu, veuillez réessayer plus tard"
      setIsLoading(true)
      try {
        //Promise.all permet de récupérer toutes les reponses API en une seule fois
        //Afin d'optimliser les fetch
        const responses = await Promise.all([
          fetch(`${url}posts`),
          fetch(`${url}categories`),
        ])
        //Verification fetch posts
        if (responses[0].ok) {
          const retrievedPosts = await responses[0].json()
          setPosts(retrievedPosts)
        } else {
          setErrorPostsMessage(error)
        }
        //Verfication fetch categories
        if (responses[1].ok) {
          const retrievedCategories = await responses[1].json()
          setCategories(retrievedCategories)
        } else {
          setErrorCategoriesMessage(error)
        }
      } catch (e) {
        //Si rien n emarche : Erreur des deux cotés
        setErrorPostsMessage(error)
        setErrorCategoriesMessage(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchApi()
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

  if (isLoading) return <Loader />

  return (
    <div className="app">
      <Header
        categories={categories}
        isZenModeEnabled={zenModeEnabled}
        changeZenMode={setZenModeEnabled}
        searchText={searchText}
        errorMessage={errorCategoriesMessage}
      />
      {errorPostsMessage ? (
        <p>{errorPostsMessage}</p>
      ) : posts.length > 0 ? (
        <Posts
          posts={posts}
          isZenModeEnabled={zenModeEnabled}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      ) : (
        <p>Aucun posts pour le moment</p>
      )}
      <Footer />
    </div>
  )
}

export default App
