/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
	// Utiles
	function Vector2D(x, y){
		this.x = x;
		this.y = y;
	}
	
	// Rect Class
	function Rect(pos, size, fillStyle) {
		this.pos = pos;
		this.size = size;
		this.fillStyle = fillStyle;
		
		this.draw = function(ctx) {
			ctx.fillStyle = this.fillStyle;
			ctx.fillRect(pos.x, pos.y, size.x, size.y);
		};
	}
	
	// Sprite Class
	function Sprite(imgSrc, pos) {
		this.pos = pos;
		this.imgSrc = imgSrc;
		this.img = new Image();
		this.img.src = imgSrc;
		this.sc = new Vector2D(1, 1);
		
		this.draw = function(ctx) {
			ctx.drawImage(this.img, this.pos.x, this.pos.y, this.sc.x*this.img.width, this.sc.y*this.img.height);
		};
		
		this.scale = function(sc) {
			this.sc = sc;
		};
	}
	
	// Text Class
	function Text(string, font, color, size, pos) {
		this.string = string;
		this.font = size + "px " + font;
		this.color = color;
		
		this.pos = pos;
		this.pos.y += size;
		
		this.draw = function(ctx) {
			ctx.font = this.font;
			ctx.fillStyle = this.color;
			ctx.fillText(this.string, this.pos.x, this.pos.y);
		};
	}
	
	var c = {
		name: "",
		canvas: null,
		ctx: null,
		w: null,
		h: null,
		frameTime: 60,
                document: document.body
	};
	
	var g = {
            /* TEXTS */
            text: {
                header: new Text("Pony Hunter", "Arial Black", "black", 24, new Vector2D(10, 10))
            },
            gfx: {
                bg: new Sprite("img/bg.png", new Vector2D(0, 0))
            },
            audio: {
                shot: new Audio("audio/shots/shotgun.wav")
            }
	};
        
        var user = {
            shoted: false
        };
        // Events
        function onClick(){
            if(g.audio.shot.ended || !user.shoted)
            {
                g.audio.shot.play();
                user.shoted = true;
            }
        }
        
	function init(){
		// Canvas init
                c.document.style.cursor = "url('img/cursor.png'), default";

		c.name = "#screen";
		c.canvas = $(c.name)[0];
		c.ctx = c.canvas.getContext("2d");
		c.w = $(c.name).width();
		c.h = $(c.name).height();
                // Events init
                c.canvas.addEventListener('click', onClick, false);
                
		setInterval(paint, c.frameTime);
	}
	
	function paint(){
		c.ctx.fillStyle = "#fff";
		c.ctx.fillRect(0, 0, c.w, c.h);
                // Drawing content
                g.gfx.bg.draw(c.ctx);
		g.text.header.draw(c.ctx);
	}
	
	init();
});
