class Category {

  constructor($http) {

    this.$http = $http;

  }

  /**
   *
   * @returns {promise|*|promise|promise|promise|Function}
   */
  getTopParents() {

    return new Promise((resolve, reject) => {
      this.$http.get('http://ng-notebook.dev:3333/api/categories/top-parents')
        .success(result => {

          resolve(result.status === 'success' ? result.data.categories : []);

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
  getChildren(id) {

    return new Promise((resolve, reject) => {
      this.$http.get('http://ng-notebook.dev:3333/api/categories/' + id + '/children')
        .success(result => {

          resolve((result.status === 'success') ? result.data.children : []);

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
  getSiblings(id) {

    return new Promise((resolve, reject) => {
      this.$http.get('http://ng-notebook.dev:3333/api/categories/' + id + '/siblings')
        .success(result => {

          resolve((result.status === 'success') ? result.data.siblings : []);

        })
        .error(result => {

          res.resolve([]);

        });
    });

  }

}

Category.$inject = [
  '$http'
];

export default Category;