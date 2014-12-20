magiccard
=========
It is angular directive using for image tagging
  Installation
------------
```php
    <link href="assets/css/magiccard.css" rel="stylesheet">
    <script src="assets/js/magiccard.js"></script>
```

  Usage
------------
In your page
```php
  <magiccard template-box="templateBox" src="image" callback="callback" method="hover" data="points"></magiccard>-
```
In your controller
```php
  $scope.templateBox ='app/home/templates/templateBox.html'; // your path to template box
```
templateBox.html
```php
  <span class="item-tag">
          <span class="item-tag-label">
                  <i class="fa fa-star fa-2x"></i>
          </span>
      </span>
  
  <div class="magiccard-content bigEntrance">
      <a href="#" class="xclose"><i class="fa fa-trash-o"></i></a>
  
      <div class="form-group">
          <input type="text" id="nametag">
      </div>
      <div class="form-group text-right">
          <button type="submit" class="btn btn-primary">Submit</button>
      </div>
  </div>
```

```php
  $scope.image = 'http://dwaynepreed.files.wordpress.com/2014/10/beautiful-girl-3.jpg';
  // your path to image, it will load in to your page
```

```php
  $scope.callback = function(point){
            var point = {
                name: point[2],
                top: point[0],
                left: point[1]
            };
            $scope.points.push(point);
            $scope.$apply();
        }
        
        // when when u done tagging, it will pass all data to $scope.callback as array point
```
