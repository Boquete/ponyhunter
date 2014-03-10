/* 
 * The MIT License
 *
 * Copyright 2014 MrPoxipol.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* Engine */
// Rect Class
function Rect(pos, size, fillStyle) {
    this.pos = pos;
    this.size = size;
    
    if (typeof(fillStyle) === "undefined")
        this.fillStyle = "";
    
    this.fillStyle = fillStyle;
    
    this.draw = function(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    };
    this.contains = function(coords) {
        return ((coords.x <= this.size.x + this.pos.x) && (coords.y <= this.size.y + this.pos.y) && (coords.x >= this.pos.x) && (coords.y >= this.pos.y));
    };
}

// StrokeRect Class
function StrokeRect(pos, size, style /* Usually Border Color */, borderSize) {
    this.pos = pos;
    this.size = size;
    this.style = style;
    this.borderSize = borderSize;
    
    this.draw = function (ctx) {
        ctx.strokeStyle = this.style;
        ctx.lineWidth = this.borderSize;
        ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    };
}

// Sprite Class
function Sprite(imgSrc, pos) { // ctx for preloading images
    if (typeof(pos) === "undefined")
        this.pos = new Vector2D(0, 0);
    else
        this.pos = pos;
    
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
        return new Vector2D(this.img.width, this.img.height);
    };
    this.getGlobalBounds = function() {
        return new Rect(this.pos, this.getSize());
    };
    // Texture
    this.setTexture = function(url) {
        this.img.src = url;
    };
}

// Font Class (string, uint)
function Font(family, size) {
    this.family = family;
    this.size = size;
    
    this.toCSS = function() {
        return this.size + "px " + this.family;
    };
}

// Text Class
function Text(string, font, color, pos) {
    this.string = string;
    this.font = font.toCSS();
    this.color = color;

    this.pos = pos;
    this.pos.y += font.size;
    
    this.getSize = function(ctx) {
        ctx.font = this.font;
        var tsize = ctx.measureText(this.string);
        return new Vector2D(tsize.width, parseInt(this.font));
    };
    this.getGlobalBounds = function() {
        return new Rect(this.pos, this.getSize());
    };
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
        return (this.x === a.x && this.y === a.y);
    };

}

function Vector3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function Clock() {
    this.total = 0;
    this.id = null;
    // Methods
    this.pause = function() {
        clearTimeout(this.id);
        delete this.id;
    };
    this.count = function() {
        if(!this.total) this.total = 0;
        
        this.total += 10; // browser max (10 ms)
    };
    this.resume = function() {
        if(!this.id)
            this.id = setInterval(this.count.bind(this), 10);
    };
    this.restart = function() {
        var elapsed = this.getElapsedTime();
        this.total = 0;
        this.resume();
 
        return elapsed;
    };
    this.getElapsedTime = function() {
        console.log(this.total); // 0
        return this.total;
    };
    
    this.resume();
}

function Color(r, g, b, a) {
    if (typeof(r) === 'undefined')
        this.r = this.g = this.b = 0; // None - Black.
    
    this.r = r;
    if (typeof(g) === 'undefined')
        this.g = this.b = 0; // Red
    
    this.g = g;
    if (typeof(b) === 'undefined')
        this.b = 0;
    
    this.b = b;
    if (typeof(a) === 'undefined')
        this.a = 255;
    
    this.toCSS = function() {
        /* Opacity have arleady no support :D 
         * TODO: add opacity: a;
         */
        return "rgb(" + r + ", " + g + ", " + b + ")";
    };
}
// Random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}