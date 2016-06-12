class Article {

  constructor ($http) {
    
    this.$http = $http;

    let itemsPerPage = 5;
  }
  
  getAll () {
    
    return new Promise((resolve, reject) => {
      this.$http.get('http://ng-notebook.dev:3333/api/articles')
        .success( result => {
          resolve((result.status === 'success') ? result.data.articles : []);
        })
        .error(result => {
          resolve([]);
        });
    });

  }
  
    /**
     *
     * @param by
     * @param cond
     * @returns {promise|*|promise|promise|Function|promise}
     */
    getFiltered (by, cond) {

      return new Promise((resolve, reject) => {
        this.$http.get('http://ng-notebook.dev:3333/api/articles/' + by + '/' + cond)
          .success(result => {
            resolve((result.status === 'success') ? result.data.articles : []);
          })
          .error(result => {
            resolve([]);
          });
      });

  }
  
    /**
     *
     * @param id
     * @returns {*}
     */
    getById (id) {

      return new Promise((resolve, reject) => {
        this.$http.get('http://ng-notebook.dev:3333/api/article/' + id)
          .success(result => {
            resolve((result.status === 'success') ? result.data.article : []);
          })
          .error(result => {
            resolve([]);
          });
      });

  }
  
    /**
     *
     * @param id
     * @param data
     * @returns {promise|*|promise|promise|promise|Function}
     */
    editArticle (id, data) {

      return new Promise((resolve, reject) => {
        this.$http.put('http://ng-notebook.dev:3333/api/article/' + id, {article: data})
          .success(result => {
            resolve((result.status === 'success') ? result.data.article : []);
          })
          .error(result => {
            resolve(result.message);
          });
      });

  }
  
    /**
     *
     * @param data
     * @returns {promise|*|promise|promise|promise|Function}
     */
    createArticle (data) {

      return new Promise((resolve, reject) => {
        this.$http.post('http://ng-notebook.dev:3333/api/article/create', {article: data})
          .success(result => {
            resolve((result.status === 'success') ? result.data.article : []);
          })
          .error(result => {
            resolve(result.message);
          });
      });

  }
  
    /**
     *
     * @param id
     * @returns {promise|*|promise|promise|promise|Function}
     */
    deleteArt (id) {

      return new Promise((resolve, reject) => {
        this.$http.delete('http://ng-notebook.dev:3333/api/article/' + id)
          .success(result => {
            resolve((result.status === 'success') ? result.data.article : []);
          })
          .error(result => {
            console.log('error', result);
            resolve(result.message);
          });
      });

  }
}

Article.$inject = [
  '$http'
];

export default Article;