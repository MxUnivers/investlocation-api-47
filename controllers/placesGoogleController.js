// controllers/placesController.js
const axios = require('axios');

// Remplace par ta clé API Google Maps
const apiKey = 'AIzaSyC3XycRahmXPHzfWZikFEwLiKzkNmTAD9I';

const getPlaces = async (req, res) => {
  const { query } = req.query; // Récupère le paramètre de requête "query"
  console.log(query);

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: query,
        key: apiKey,
        region: 'DZ', // Spécifie la région ici
        location: '28.0339,1.6596', // Latitude et longitude du centre de l'Algérie
        radius: 1000000, // Rayon en mètres (1 000 000 m = 1 000 km, pour couvrir toute l'Algérie)
      },
    });

    // // Filtrer les résultats pour ne conserver que ceux qui mentionnent "Algérie"
    // const filteredResults = response.data.results.filter(place =>
    //   place.formatted_address && place.formatted_address.includes('Algérie')
    // );

    return res.status(200).json(response.data); // Renvoie les résultats filtrés
  } catch (error) {
    console.error('Erreur lors de la récupération des lieux:', error.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération des lieux' });
  }
};

module.exports = { getPlaces };
