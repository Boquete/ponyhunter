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

/* NO WARRANTY, THIS CODE HADN'T TESTED YET */
var gui = {
    canvas: null,
    canvas_ctx: null,
    size : new Array(/* Button */ new Vector2D(150, 40)),
    color : new Array(/* Main Color */ new Color(113, 9, 170), /* Buttons font color */ new Color(255, 255, 255), /* Border */ new Color(0, 0, 0), /* Main II */ new Color(140, 15, 209)), 
    font : new Array(new Font("Ubuntu", 15), new Font("Ubuntu", 20)),
    size_def : {
        BUTTON : 0
    },
    color_def : {
        MAIN : 0,
        BUTTON_FONT : 1,
        BUTTON_BORDER : 2,
        // Other Colors
        MAIN_OT: 3
    },
    font_def : {
        MAIN : 0,
        BUTTON : 1
    },
    mouse_translation: 0, // For unusual cursors
    // Widgets Arrays
    buttons : new Array(),
    // Methods
    setup : function(canvas, canvas_ctx, update_rate, mouse_translation) {
        if (typeof(mouse_translation) !== "undefined")
            this.mouse_translation = mouse_translation;
        
        this.canvas = canvas;
        this.canvas_ctx = canvas_ctx;
        this.canvas.addEventListener("mousemove", this.mouseFocus, false);
    },
    mouseFocus : function(e) {
        // Function called on canvas object, so: this = canvas, not the gui class!
        // Mouse pos:
        var position = gui.canvas.getBoundingClientRect();
        var mpos = new Vector2D(e.pageX - position.left + gui.mouse_translation, e.pageY - position.top + gui.mouse_translation);
        // gui.mouse_translation bug
        console.log(gui.mouse_translation);
        // Update buttons state (focus, etc)
        for(var i in gui.buttons) {
            if(gui.buttons[i].body.contains(mpos))
                gui.buttons[i].setBodyColor(gui.color[gui.color_def.MAIN_OT]);
            else
                gui.buttons[i].setBodyColor(gui.color[gui.color_def.MAIN]);
        }
    },
    addButton: function(object, scene) {
        this.buttons.push(object);
        this.buttons[this.buttons.length - 1].scene = scene;
    },
    draw: function(scene) {
        if (typeof(scene) === "undefined") {
            console.log("GUI: Scene is undefined. Gui drawing failed.");
            return false;
        }
        
        // Buttons drawing
        for (var i in this.buttons)
            if(this.buttons[i].scene === scene)
                this.buttons[i].draw();
        
        return true;
    }
};

function Button(string, pos) {
    this.scene = null; // Scene for gui
    
    this.pos = pos;
    this.body = new Rect(pos, gui.size[gui.size_def.BUTTON], gui.color[gui.color_def.MAIN].toCSS());
    this.border = new StrokeRect(pos, gui.size[gui.size_def.BUTTON], gui.color[gui.color_def.BUTTON_BORDER].toCSS(), 2);
    
    var text_pos = new Vector2D(pos.x, pos.y); // Text align will be added soon..:D, not today :>
    this.text = new Text(string, gui.font[gui.font_def.BUTTON], gui.color[gui.color_def.BUTTON_FONT].toCSS(), text_pos);
    this.text.pos.x += (this.body.size.x / 2) - (this.text.getSize(gui.canvas_ctx).x / 2);
    this.text.pos.y += (this.body.size.y / 2) - (this.text.getSize(gui.canvas_ctx).y / 2);
    
    // Methods
    this.draw = function() {
        this.body.draw(gui.canvas_ctx);
        this.border.draw(gui.canvas_ctx);
        this.text.draw(gui.canvas_ctx);
    };
    this.setBodyColor = function(color) {
        this.body.fillStyle = color.toCSS();
    };
}
