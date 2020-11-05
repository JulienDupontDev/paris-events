import axios from 'axios';

export default class ParisAPI {
  constructor() {
    this.baseUrl = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=";
  }

  async getEvents(settings) {

    axios.get("https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=1&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&refine.category=Animations+")
      .then(res => res)
      .catch(error => error);
  }
}
