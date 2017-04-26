/*
var ApiTest = angular.module('ApiTest', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
*/

var app = angular.module('ApiTest', ['ngMaterial','angAccordion'])

.controller('AppCtrl', function($scope, $http, $location, $window, $compile, $mdToast) {
    // Holds our form data
    $scope.formData = {};
    // Holds our products
    $scope.products = [];

    // Login controller
    // POSTs the username and password provided by the user to the API for verification
    $scope.login = function() {       
        $http.post('/auth/', $scope.formData)       
            .success(function(data) { // Valid user, redirect to home page
                $window.sessionStorage.token = data.result.token;
                window.location = '/home?token=' + $window.sessionStorage.token;
            })
            .error(function(data) { // Invalid user, display error
                $('#login-error').css('display', 'block');
            });
    };  

    // Get the products from the API
    $scope.getProductCategories = function() { 
        // Get our token 
        var token = $window.sessionStorage.token;        
     
        $http.get('/product_categories?token=' + token)
            .success(function(categories) { // Retrieved products successfully 
                categories = categories.result;
                // Create a new property to hold our categories
                $scope.categories = [];

                // Get the product types for each category
                categories.forEach(function(category, index) {
                    $http.get('/product_categories/' + category.id + '/product_types?token=' + token)
                        .success(function(types) {
                            category.types = [];
                            category.types = types.result;
                            // Add the category and types to our scope
                            $scope.categories.push(category);                                                        
                        })
                        .error(function(err) {
                            console.log(err);
                            // Notify the user there was an error
                            $mdToast.show(
                              $mdToast.simple()
                                .textContent('Error retrieving product data.')
                                .position('top left')
                                .hideDelay(5000)
                            );
                        });                    
                });

            })
            .error(function(err) {
                console.log(err);
                // Notify the user there was an error
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Error retrieving product data.')
                    .position('top left')
                    .hideDelay(5000)
                );                
            }); 
    };  

    // Get the porducts from the when a type is selected
    $scope.getProducts = function(id) {  
        // Get our token 
        var token = $window.sessionStorage.token;

        $http.get('/product_types/' + id + '/products?token=' + token)
            .success(function(data) {                
                $scope.products = data.result;
                // Clear the list
                $('.products').html('');
                // Add each product to the list in the side bar
                $scope.products.forEach(function(product, index) {
                    $('.products').append('<div class="product-list-item" ng-click="getData(' + product.id + ')">' + product.name + '</div>');
                });           
                // Add the new list to the DOM scope   
                $compile('.products')($scope);                 
            })
            .error(function(data) {
                console.log(data);  
                // Notify the user there was an error
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Error retrieving product data.')
                    .position('top left')
                    .hideDelay(5000)
                );                             
            });
    };   

    // Get the sales data for the selected product
    $scope.getData = function(id) {          

        // Get some random data, it just looks cooler ;)
        var data = [];
        for (i=0; i < 12; i++) {
            var num = getRandom(0, 10000);
            data.push(num);
        }        

        // Create a new chart with our random data
        Highcharts.chart('chart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Sales'
            },
            credits: {
              enabled: false
            },            
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Sales'
                }
            },
            tooltip: {
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Sales',
                data: data

            }]
        });
    }
}); 

// Random integer generator
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}