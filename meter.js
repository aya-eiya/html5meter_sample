// (c) aya_eiya - 2013
(function (){
    this.setMeter = function(_id,size,imageSrc,percent){
	var margin = size * 0.1;
	var canvas = document.createElement('canvas');
	    canvas.width = size + margin * 2;
	    canvas.height = size + margin * 2;
	var context = canvas.getContext("2d");
	var meterDiv = document.getElementById(_id);
	    meterDiv.appendChild(canvas);
	var image = new Image();
	image.onload = function(){
	    var transparent = "rgba(0,0,0,0)";
	    var meterColor = "rgb(255,128,128)";
	    var meterWidth = 16;
	    var aspect = this.width/this.height;
	    var digs = {0:0,90:Math.PI/2,180:Math.PI,360:Math.PI*2};
	    var c = context;

	    var setImageToCercle = function(){
		c.strokeStyle = transparent;
		c.beginPath();
		c.arc(size/2 + margin,size/2 + margin, size/2 - meterWidth,digs[0],digs[360]);
		c.stroke();
		c.save();
		c.clip();
		c.drawImage(image,margin,margin,size * aspect,size);
		c.restore();
	    };

	    var setFrameOfMeter = function(){
		c.strokeStyle = meterColor;
		c.lineWidth = 2;
		c.beginPath();
		c.arc(size/2 + margin,size/2 + margin, size/2 - meterWidth,digs[0],digs[360]);
		c.stroke();
		c.beginPath();
		c.arc(size/2 + margin,size/2 + margin, size/2,digs[0],digs[360]);
		c.stroke();
	    }

	    var setMerterValue = function(){ 
		c.strokeStyle = meterColor;
		c.lineWidth = meterWidth;
		c.beginPath();
		var lDig = -percent/100 * digs[180] + digs[90];
		var rDig =  percent/100 * digs[180] + digs[90];
		c.arc(size/2 + margin,size/2 + margin,size/2 - meterWidth/2, lDig,rDig);
		context.stroke();
	    };

	    var setTextArea = function(){
		var fontSize = size * 0.18;
		c.font = fontSize + "px Arial";
		var text = percent+"%";
		var textSize = c.measureText(text);
		var textLeft = size * 0.9;
		c.strokeStyle = meterColor;
		c.fillStyle = "white";
		c.lineWidth = 4;
		c.beginPath();
		c.save();
		c.arc(textLeft,size - fontSize/2,textSize.width/2+5,0,digs[360]);
		c.fill();
		c.stroke();
		c.clip();
		c.beginPath();
		c.fillStyle = "black";
		c.fillText(text,textLeft-textSize.width/2,size-fontSize/8);
		c.restore();
	    };

	    setImageToCercle();
	    setFrameOfMeter();
	    setMerterValue();
	    setTextArea();


	};
	image.src = imageSrc;
    };
})();
