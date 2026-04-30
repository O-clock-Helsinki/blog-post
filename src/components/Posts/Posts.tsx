import React from "react"
import { IPost } from "../../@types"
import Post from "../Post/Post"

import "./Posts.scss"

interface PostsProps {
  posts: IPost[]
  // => un tableau d'objets qui correspondent à des articles

  isZenModeEnabled: boolean
  searchText: string
  setSearchText: (text: string) => void
}

// rôle : afficher tous les articles en déléguant l'affichage d'un article à un autre composant
//Desormais je recupere le state de searchtext / setSearchText en tant que props
function Posts({
  posts,
  isZenModeEnabled,
  searchText,
  setSearchText,
}: PostsProps) {
  // si le mode zen est activé, on ajoute une deuxième classe CSS
  let cssClass = "posts"
  if (isZenModeEnabled) {
    cssClass += " posts--zen"
  }
  // on pourrait utiliser une ternaire :
  // <main className={isZenModeEnabled ? 'posts posts--zen' : 'posts'}>

  //Ma fonction de gestion du form barre de recherche
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchText(value)
  }

  //Fonction afin de filtrer les posts à afficher selon la recherche utilisateur
  function filter(posts: IPost[], search: string) {
    //Resultat si empty searchbar
    if (search === "") {
      return posts
    }
    //lowercase pour insensibiliser la casse
    const searchLowered = search.toLowerCase()
    //Le retour des posts filtrés gràace au parametre search (le resultat de la barre de recherche)
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLowered) ||
        post.excerpt.toLowerCase().includes(searchLowered),
    )
  }

  return (
    <main className={cssClass}>
      <h1 className="posts-title">Dev Of Thrones</h1>
      {/* J'ajoute value et onChange pour controler l'input de recherche */}
      <input
        type="text"
        className="search"
        placeholder="Rechercher dans les articles..."
        value={searchText}
        onChange={(e) => handleSearchChange(e)}
      />
      <div className="posts-list">
        {filter(posts, searchText).map((currentPost) => (
          <Post key={currentPost.id} post={currentPost} />
        ))}
      </div>
    </main>
  )
}

export default Posts
