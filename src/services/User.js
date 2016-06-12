class User {

  /**
   *
   * @param $q
   * @param $http
   */
  constructor($q, $http) {
    this.$q    = $q;
    this.$http = $http;

    this.currentUser = null;
  }


    /**
     *
     */
    authorize() {
      this.currentUser = window.localStorage.getItem('ngNotebookUser');
    }

    /**
     *
     * @returns {promise|*|promise|promise|promise|Function}
     */
    logIn(creds) {

      var res = this.$q.defer();

      this.$http.post('http://ng-notebook.dev:3333/api/login', creds)
        .success( result => {

          this.currentUser = result.data.user;
          window.localStorage.setItem('ngNotebookUser', JSON.stringify(this.currentUser));
          res.resolve();

        })
        .error(res.reject);

      return res.promise;

    }

}

User.$inject = [
  '$q',
  '$http'
];

export default User;
