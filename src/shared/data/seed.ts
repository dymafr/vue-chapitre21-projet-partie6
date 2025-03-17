import data from './product'

export async function seed(collectionName: string) {
  try {
    const response = await fetch(`https://restapi.fr/api/${collectionName}`)
    const existingData = await response.json()

    if (!existingData || existingData.length === 0) {
      await fetch(`https://restapi.fr/api/${collectionName}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Données insérées avec succès.')
    } else {
      console.log('La collection contient déjà des données, le seed est ignoré.')
    }
  } catch (error) {
    console.error(`Erreur lors du seed de ${collectionName} :`, error)
  }
}

export async function seed40articles(collectionName: string) {
  try {
    const response = await fetch(`https://restapi.fr/api/${collectionName}`)
    const existingData = await response.json()

    if (!existingData || existingData.length === 0) {
      await fetch(`https://restapi.fr/generator`, {
        method: 'POST',
        body: JSON.stringify({
          times: 40,
          resourceName: collectionName,
          title: 'name',
          image: {
            type: 'image',
            theme: 'computer',
            height: 200,
            width: 300,
          },
          category: {
            type: 'collection',
            values: ['gamer', 'desktop', 'streaming'],
            unique: false,
          },
          description: {
            type: 'sentence',
            range: [9, 12],
          },
          price: {
            type: 'number',
            range: [800, 2500],
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('40 articles générés avec succès.')
    } else {
      console.log('La collection contient déjà des données, la génération est ignorée.')
    }
  } catch (error) {
    console.error(`Erreur lors de la génération de 40 articles pour ${collectionName} :`, error)
  }
}
