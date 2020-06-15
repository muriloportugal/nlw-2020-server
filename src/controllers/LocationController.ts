import {Request, Response} from 'express';
import axios from 'axios';

import api from '../services/geolocationApi';

interface APIResponse {
  results: [{
    address_components: [{
      long_name: string;
      short_name: string;
    }],
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    }
  }]
}

class LocationController {
  async index( request: Request, response: Response) {
    
    
    const api_key = process.env.API_KEY;
    const { city, uf } = request.query;
    const cityQuery = city?.toString().replaceAll(' ','+');
    const url = `/geocode/json?address=${cityQuery},+${uf}&key=${api_key}`;

    try {
      const api_response = await api.get<APIResponse>(url);
      const { results } = api_response.data;
      const locations = results.map(result => {
        return {
          city: result.address_components[0].long_name,
          location: result.geometry.location
        }
      });
      
      if( locations.length <= 0 ){
        console.log(api_response.data);
        return response.json(api_response.data);
      }
      return response.json(locations);

    } catch (error) {

      console.log(error);
      return response.status(error.response.status).json(error.response.data);
    
    }
    
    
  }
}

export default LocationController;