const BASE_URL = "https://rickandmortyapi.com/api";

export class Api {
  static async getCharacters(query) {
    try {
      const response = await fetch(`${BASE_URL}/character/?${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
