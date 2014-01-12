/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* Engine */
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
    if (typeof (pos) === 'undefined')
        this.pos = new Vector2D(0, 0);
    else
        this.pos = pos;

    this.imgSrc = imgSrc;
    this.img = new Image();
    this.img.src = imgSrc;
    this.sc = new Vector2D(1, 1);
    this.rt = 0;

    this.draw = function(ctx) {
        ctx.translate(this.pos.x + this.img.width / 2, this.pos.y + this.img.height / 2);
        ctx.rotate(this.rt);
        ctx.drawImage(this.img, this.img.width / 2 * (-1), this.img.height / 2 * (-1), this.img.width, this.img.height);
        // reset canvas
        ctx.rotate(this.rt * (-1));
        ctx.translate((this.pos.x + this.img.width / 2) * (-1), (this.pos.y + this.img.height / 2) * (-1));
    };
    this.scale = function(sc) {
        this.sc = sc;
    };
    this.rotate = function(rotation) {
        this.rt += rotation * Math.PI / 180;
    };
    this.getSize = function() {
        var size = new Vector2D(this.img.width, this.img.height);
        return size;
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
function Vector2D(x, y) {
    this.x = x;
    this.y = y;

    this.sub = function(a) {
        this.x -= a.x;
        this.y -= a.y;
    };
    this.add = function(a) {
        this.x += a.x;
        this.y += a.y;
    };
    this.equals = function(a) {
        return (this.x == a.x && this.y == a.y);
    };

}

function Vector3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
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

function Clock() {
    this.startTime = new Date();
    // Methods
    this.getElapsedTime = function() {
        var act_date = new Date();

        return act_date - this.startTime;
    };
    this.reset = function() {
        var elapsed = this.getElapsedTime();
        this.startTime = new Date();

        return elapsed;
    };
}
// Random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}