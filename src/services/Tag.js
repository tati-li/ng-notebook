class Tag {
  
  constructor ($http) {

    this.$http = $http;
    
    this.tags = [];
    
  }

  /**
   *
   * @returns {promise|*|promise|promise|promise|Function}
   */
  getAll() {
    
    return new Promise((resolve, reject) => {
      if (this.tags.length) {
        resolve(this.tags);
      } else {

        this.$http.get('http://ng-notebook.dev:3333/api/tags')
          .success(result => {
            if (result.status === 'success') {
              this.tags = result.data.tags;
              resolve(this.tags);
            } else resolve([]);
          })
          .error( result => {
            resolve([]);
          });

      };
    });

  }

  /**
   *
   * @param name
   * @param data
   * @returns {promise|*|promise|promise|Function|promise}
   */
  editTag (name, data) {
    
    return new Promise((resolve, reject) => {
      this.$http.put('http://ng-notebook.dev:3333/api/tag/' + name, {tag: data})
        .success( result => {
          resolve( (result.status === 'success') ? result.data.tag.name : []);
        })
        .error( result => {
          resolve(result.message);
        });
    });

  }

  /**
   *
   * @param name
   * @returns {Promise}
   */
  createTag (name) {

    return new Promise((resolve, reject) => {
      this.$http.post('http://ng-notebook.dev:3333/api/tag/create', {name: name})
        .success( result => {
          resolve((result.status === 'success') ? result.data : []);
        })
        .error( result => {
          resolve(result.message);
        });
    });

  }

  /**
   *
   * @param id
   * @returns {promise|*|promise|promise|promise|Function}
   */
  deleteTag (name) {

    return new Promise((resolve, reject) => {
      this.$http.delete('http://ng-notebook.dev:3333/api/tag/' + name)
        .success( result => {
          resolve((result.status === 'success') ? result.data : []);
        })
        .error( result => {
          resolve(result.message);
        });
    });
}
  
  
}

Tag.$inject = [
  '$http'
];

export default Tag;