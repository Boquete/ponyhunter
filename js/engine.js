/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* Engine */
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