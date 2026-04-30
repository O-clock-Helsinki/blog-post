// dans ce fichier on définit le typage qu'on utilise à plusieurs endroits

// objet qui correspond à un article
export interface IPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
}

// objet qui correspond à une catégorie
export interface ICategory {
  route: string;
  label: string;
}
