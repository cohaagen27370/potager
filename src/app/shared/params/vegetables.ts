export type Vegetables = {
  name:string,
  varieties: Array<string>
};

export const AllVegetables:Vegetables[] = [
  {
    name: "Choux",
    varieties : [
      "Rouge",
      "Fleur",
      "Brocolis",
      "Rave",
      "Cabus",
      "Kale"
    ]
  },
  {
    name: "Pois",
    varieties : [
      "Petits de provence",
      "Chiche"
    ]
  },
  {
    name: "Laitue",
    varieties : [
      "Merveille des 4 saisons",
      "Appia",
      "Blonde de Paris",
    ]
  },
  {
    name: "Epinard",
    varieties : [
      "Géant d'hiver",
      "Fraise",
    ]
  },
  {
    name: "Ciboule",
    varieties : [
      "Ciboulette",
      "Ciboulette de Chine",
      "Ail des Ours"
    ]
  },
  {
    name: "Haricots",
    varieties : [
      "Argus vert",
      "Amethyst violet",
      "Crockett vert",
      "Roi des beurres jaune",
    ]
  },
]
