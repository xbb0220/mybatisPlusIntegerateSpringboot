$.fn.setform = function(jsonValue) {
    var obj = this;
    $.each(jsonValue, function(name, ival) {
    	if(ival) {
    		var selectDom = obj.find("select[name=" + name + "]")[0];
    		if (undefined != selectDom){
    			for(var i=0; i<selectDom.options.length; i++){  
    			    if(selectDom.options[i].innerHTML == ival){  
    			    	selectDom.options[i].selected = true;  
    			        break;  
    			    }  
    			}
    		}
    		var textareaDom = obj.find("textarea[name=" + name + "]");
    		if (undefined != textareaDom){
    			textareaDom.html(ival);
    		}
    		var $oinput = obj.find("input[name=" + name + "]");
	        if ($oinput.attr("type") == "radio" || $oinput.attr("type") == "checkbox") {
	            $oinput.each(function() {
	                if (Object.prototype.toString.apply(ival) == '[object Array]') { //是复选框，并且是数组
	                    for (var i = 0; i < ival.length; i++) {
	                        if ($(this).val() == ival[i])
	                            $(this).attr("checked", "checked");
	                    }
	                } else {
	                    if ($(this).val() == ival)
	                        $(this).attr("checked", "checked");
	                }
	            });
	        }
	        else {	$oinput.each(function() {
                    $(this).val(ival);
                });
	        } 
    	} 
    });
}