/**
 * Created by tuan on 12/16/2014.
 */

var app = angular.module('magiccard', []);

app.directive('magiccard', function () {
        function link(scope, element, attrs) {
            angular.element(element[0].querySelector('.has-magiccard')).bind('click', function (e) {
                if (scope.completing == false && scope.onTyping == false) {
                    var magiccard = angular.element(element[0].querySelector('.has-magiccard')).find('.magiccard .magiccard-content');
                    magiccard.hide();
                    scope.completing = true;
                    return;
                } else if (scope.onTyping == false) {
                    var position = scope.findPos(e, element[0]);
                    var positionDialog = {
                        top: position.PosY + 50,
                        left: position.PosX - 40
                    }

                    var dialog = angular.element(
                        '<div class="magiccard">'
                        + '<form>'
                        + '<input id="top" type="hidden" value="' + positionDialog.top + '">'
                        + '<input id="left" type="hidden" value="' + positionDialog.left + '">'
                        + scope.templ
                        + '</form>'
                        + '</div>');
                    angular.element(element[0].querySelector('.has-magiccard')).append(dialog.css(positionDialog));

                    angular.element(dialog).find("form").submit(function () {
                        var top = angular.element(this).find('input#top').val();
                        var left = angular.element(this).find('input#left').val();
                        var info = [top, left];
                        angular.element(element[0]).find("form :input:visible").each(function () {
                            var input = $(this).val();
                            info.push(input)
                        });
                        if (scope.callback) {
                            scope.callback(info);
                        }
                        angular.element(this).find('div.magiccard-content').hide();
                        scope.completing = false;
                        return false;
                    });
                    scope.completing = false;
                }

                angular.element(element[0]).find('.xclose').bind('click', function (event) {
                    event.stopPropagation();
                    var box = angular.element(this).parent().parent();
                    box.remove();
                    scope.completing = true;
                });

                angular.element(element[0]).find(".magiccard .item-tag").mouseenter(function () {
                    var magiccard = angular.element(element[0].querySelector('.has-magiccard')).find('.magiccard .magiccard-content');
                    magiccard.hide();
                    angular.element(this).next().show();
                    scope.completing = false;
                });

                angular.element(element[0]).find(".magiccard")
                    .mouseenter(function () {
                        scope.onTyping = true;
                    })
                    .mouseleave(function () {
                        scope.onTyping = false;
                    });

            });
        }

        function controller($scope, $http) {
            $scope.completing = true;
            $scope.onTyping = false;

            this.findPosImg = function (oElement) {
                if (typeof( oElement.offsetParent ) != "undefined") {
                    for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
                        posX += oElement.offsetLeft;
                        posY += oElement.offsetTop;
                    }
                    return [posX, posY];
                }
                else {
                    return [oElement.x, oElement.y];
                }
            }
            $scope.findPosImg = this.findPosImg;

            this.findPos = function (e, ele) {
                var PosX = 0;
                var PosY = 0;
                var position;
                var ImgPos = $scope.findPosImg(ele.querySelector('.has-magiccard img'));
                if (e.pageX || e.pageY) {
                    PosX = e.pageX;
                    PosY = e.pageY;
                }
                else if (e.clientX || e.clientY) {
                    PosX = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft;
                    PosY = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop;
                }
                PosX = PosX - ImgPos[0];
                PosY = PosY - ImgPos[1];
                position = {
                    PosX: PosX,
                    PosY: PosY
                };

                return position;
            }

            $scope.findPos = this.findPos;

            $http.get($scope.templateBox).then(function (template) {
                $scope.templ = template.data;
            });
        }

        return {
            restrict: 'E',
            scope: {
                templateBox: '=templateBox',
                src: '=src',
                callback: '=callback',
                data: '=data'
            },
            link: link,
            controller: controller,
            template: '<div class="has-magiccard">' +
            '<img alt="Photo" style="width: 100%;cursor:move" src="{{ src }}">' +
            '</div>'
        }
    }
);

