/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
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
        
        function KillTarget(){
            
        }
        // pony :D
        
        var user = {
            shoted: false
        };
        // Events
        function onClick(){
            var position = $(c.name).position();
            var x = e.pageX-position.left;
            var y = e.pageY-position.top;
            
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
