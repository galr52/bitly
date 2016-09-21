(function() {
  "use strict";

  angular.module("myApp").controller("demoController", demoController);
  demoController.$inject = ["NgTableParams", "IssueService"];

  function demoController(NgTableParams, IssueService) {
    this.tableParams = new NgTableParams({}, {


      getData: function(params) {
        return IssueService.query({}, function(data, headersGetter) {

          params.total(totalPages * params.count());
          return data;
        }).$promise;
      }


      
    });
  }
})();