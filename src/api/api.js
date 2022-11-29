/**The components in the front-end needs to talk with the back-end for data. As; in lawsuits page, to show details
 * about a lawsuit, we will need lawsuits model.
 * Instead of making AJAX calls in the components, we will use the api to get the data.For that we will have a GlobalApi
 * class. The class will have methods to get the data.
 * In the backend we had classes and static methods tp get the data from the database.
 * This will be similar to the way we have done in the backend.
 */


import axios from "axios"; //importing axios to make the AJAX calls

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:3001"; //setting the base url


class GlobalApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how we pass it in the header.
    //headers means that we are passing the token in the header.
    //params means that we are passing the token in the query string.
    const url = `${BASE_URL}/${endpoint}`; //setting the url
    const headers = { Authorization: `Bearer ${GlobalApi.token}` }; //setting the headers
    const params = (method === "get") //if the method is get, then we will pass the data as params
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data; //returning the data from the API call
    } catch (err) {
      console.error("API Error:", err.response); //if there is an error, print it to the console
      let message = err.response.data.error.message; //get the error message from the response
      throw Array.isArray(message) ? message : [message]; //if the message is an array, throw it, otherwise throw an array with one element.
    }
  }

  // Individual API routes

  //Get all users
  static async getUsers(){
    let res = await this.request(`users`);
    return res.users;
  }
  //Get a user by username
  static async getCurrentUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //Update a user by username
  static async saveProfile(username, data){
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  //Delete a user by username
  static async deleteUser(username){
    let res = await this.request(`users/${username}`, {}, "delete");
    return res.user;
  }

  //Login a user
  static async login(data){
    let res = await this.request(`auth/token`, data , "post");
    return res.token;
  }

  //Register a user
  static async register(data){
    let res = await this.request(`auth/register`, data , "post");
    return res.token;
  }
  //Get category by handle: criminal,civil, etc..
  static async getCategory(handle) {
    let res = await this.request(`categories/${handle}`);
    return res.category;
  }
  //get all categories
  static async getCategories(handle) {
    let res = await this.request("categories" , {handle});
    return res.categories;
  }

  //Update category information by handle:
  static async updateCategory(handle, categoryData){
    let res = await this.request(`categories/${handle}` , {...categoryData}, "patch");
    return res.category;
  }
  //add category 
  static async postCategory(data){
    let res = await this.request(`categories`, data, "post");
    return res.category;
  }
  //delete category by handle
  static async deleteCategory(handle){
    let res = await this.request(`categories/${handle}`, {}, "delete");
    return res.category;
  }

  //get all lawsuits
  static async getLawsuits(title){
    let res = await this.request('lawsuits' , {title});
    return res.lawsuits;
  }

  //update a lawsuit by id:
  static async updateLawsuit(id, lawsuitData){
    let res = await this.request(`lawsuits/${id}` , {...lawsuitData}, "patch");
    return res.lawsuit;
  }
  //add a lawsuit
  static async addLawsuit(data){
    let res = await this.request(`lawsuits`, data, "post");
    return res.lawsuit;
  }
  //delete a lawsuit by id
  static async deleteLawsuit(id){
    let res = await this.request(`lawsuits/${id}`, {}, "delete");
    return res.lawsuit;
  }

  //add a lawsuit to a user by username
  static async addLawsuitToUser(username, lawsuitId){
    let res = await this.request(`users/${username}/lawsuits/${lawsuitId}`, {}, "post");
    return res.lawsuit;
  }
  //remove a lawsuit from a user by username
  static async removeLawsuitFromUser(username, lawsuitId){
    let res = await this.request(`users/${username}/lawsuits/${lawsuitId}`, {}, "delete");
    return res.lawsuit;
  }
  //get all lawsuits for a user by username
  //static async getLawsuitsForUser(username){
   // let res = await this.request(`users/${username}/lawsuits`);
   // return res.lawsuits;
  //}

}

  export default GlobalApi;
