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
        frameTime: 100,
        document: document.body
    };

    var g = {
        // GAME
        spawns: new Array(new Vector3D(680, 361, 90), new Vector3D(25, 364, 0)), // template: x, y, rotation
        targets_act: new Array(),
        
        gen_clock: new Clock(),
        gen_time: 1000, // ms
        
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

    function KillTarget(spawn_id){
        this.sprite = new Sprite("img/pony.png");
        this.spawn_id = spawn_id;
        
        var spawn_pos = g.spawns[spawn_id];
        this.sprite.pos = new Vector2D(spawn_pos.x, spawn_pos.y + this.sprite.getSize().y);
    }
    // pony :D

    var user = {
        shoted: false
    };
    // Events
    function onClick(e){
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

    function getKillTargetOnSpawn(spawn_id) {
        for(i = 0; i < g.targets_act.length; ++i) {
            if(g.targets_act.spawn_id == spawn_id)
                return i;
        }
        
        return -1;
    }

    function generateKillTarget() {
        if(g.targets_act.length >= g.spawns.length)
            return false;
       
        var spawn_id = Maths.random() % g.spawns.length;
        // Checking, is any killtarget on this spawn.
        if(getKillTargetOnSpawn(spawn_id) != -1)
            return false;
        
        g.targets_act.push(new KillTarget(spawn_id));
        
        return true;
    }

    function logic(){
        if(g.gen_clock.getElapsedTime() >= g.gen_time){
            generateKillTarget();
            g.gen_clock.reset();
        }
    }

    function paint(){
        logic();
        c.ctx.fillStyle = "#000";
        c.ctx.fillRect(0, 0, c.w, c.h);
        // Drawing content
        g.gfx.bg.draw(c.ctx);
        g.text.header.draw(c.ctx);
    }

    init();
});
