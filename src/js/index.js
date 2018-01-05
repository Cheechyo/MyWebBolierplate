import jquery from 'jquery';

(function($, global){
    $([1,2]).each(function(){console.log("hello?");});
})(jquery, window);
