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
    size : new Array(/* Button */ new Vector2D(150, 40)),
    color : new Array(/* Main Color */ new Color(113, 9, 170), /* Buttons font color */ new Color(255, 255, 255), /* Border */ new Color(0, 0, 0)), 
    font : new Array(new Font("Ubuntu", 15), new Font("Ubuntu", 20)),
    size_def : {
        BUTTON : 0
    },
    color_def : {
        MAIN : 0,
        BUTTON_FONT : 1,
        BUTTON_BORDER : 2 
    },
    font_def : {
        MAIN : 0,
        BUTTON : 1
    }
};

function Button(string, pos) {
    this.pos = pos;
    this.body = new Rect(pos, gui.size[gui.size_def.BUTTON], gui.color[gui.color_def.MAIN].toCSS());
    this.border = new Rect(pos, gui.size[gui.size_def.BUTTON], gui.color[gui.color_def.BUTTON_BORDER].toCSS());
    
    var text_pos = new Vector2D(pos.x, pos.y); // Text align will be added soon..:D, not today :>
    this.text = new Text(string, gui.font[gui.font_def.BUTTON], gui.color[gui.color_def.BUTTON_FONT].toCSS(), text_pos);
    
    // Methods
    this.draw = function(ctx) {
        this.body.draw(ctx);
        this.border.draw(ctx);
        this.text.draw(ctx);
    };
}
