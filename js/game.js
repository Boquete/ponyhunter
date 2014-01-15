/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    //DEFINES
    var TARGET_COST = 50;
    
    var c = {
        name: "",
        canvas: null,
        ctx: null,
        w: null,
        h: null,
        frameTime: 100,
        cursor_size: 32,
        document: document.body
    };

    var g = {
        // GAME - TARGETS
        spawns: new Array(new Vector3D(711, 361, 90), new Vector3D(15, 308, 0)), // template: x, y, rotation
        targets_act: new Array(),
        gen_clock: new Clock(),
        gen_time: 2000, // ms
        autokill_time: 3000, // ms - How many ms killtarget will be showed.
        afterkill_time: 200, // ms - after kill time (dead pony time),
        
        score: 0,

        /* TEXTS */
        text: {
            score: new Text("Score: 0", "Ubuntu", "black", 24, new Vector2D(10, 10))
        },
        gfx: {
            bg: new Sprite("img/bg.png", new Vector2D(0, 0)),
            house: new Sprite("img/house.png", new Vector2D(490, 185)),
            tree: new Sprite("img/tree.png", new Vector2D(64, 256)),
            bushes: new Sprite("img/bushes.png", new Vector2D(-71, 343))
        },
        audio: {
            shot: new Audio("audio/shots/shotgun.wav")
        }
    };

    var user = {
        shoted: false
    };
    
    function KillTarget(spawn_id) {
        this.dead = false;
        this.sprite = new Sprite("img/pony.png");
        this.spawn_id = spawn_id;
        this.sprite.pos = new Vector2D(g.spawns[spawn_id].x, g.spawns[spawn_id].y);
        this.sprite.rotate(g.spawns[spawn_id].z);
        this.clock = new Clock();
    }
    // pony :D
    // Events
    function onClick(e) {
        var position = $(c.name).position();
        var mpos = new Vector2D(e.pageX - position.left + 0.5*c.cursor_size, e.pageY - position.top + 0.5*c.cursor_size);
        
        if (g.audio.shot.ended || !user.shoted)
        {
            g.audio.shot.play();
            user.shoted = true;
            // Shoting
            for(i = 0; i < g.targets_act.length; ++i) {
                if(g.targets_act[i].sprite.getGlobalBounds().contains(mpos)) {
                    targetEliminate(i);
                }
            }
        }
    }

    function getKillTargetOnSpawn(spawn_id) {
        for (i = 0; i < g.targets_act.length; ++i)
            if (g.targets_act[i].spawn_id === spawn_id)
                return i;

        return -1;
    }

    function generateKillTarget() {
        if (g.targets_act.length >= g.spawns.length)
            return true; // No enought place for next target. STOP.

        var spawn_id = getRandomInt(0, g.spawns.length - 1);
        // Checking, is any killtarget on this spawn.
        if (getKillTargetOnSpawn(spawn_id) !== -1)
            return false;

        g.targets_act.push(new KillTarget(spawn_id));

        return true;
    }

    function targetEliminate(index) {
        console.log("Enemy eliminated!");
        g.score += TARGET_COST;
        g.targets_act[index].dead = true;
        g.targets_act[index].sprite.setTexture("img/dead_pony.png");
        g.targets_act[index].clock.restart();
    }

    function updateKillTargets() {
        var to_delete = new Array(); // delete? which? requires for sequrity
        for (i in g.targets_act) {
            // Autokill
            if(g.targets_act[i].clock.getElapsedTime() >= g.autokill_time)
                to_delete.push(i);
            // if killed (dead texture)
            if(g.targets_act[i].dead && g.targets_act[i].clock.getElapsedTime() >= g.afterkill_time)
                to_delete.push(i);
        }
        
        for(i in to_delete)
            g.targets_act.splice(i, 1);
    }

    function drawKillTargets() {
        for (var i = 0; i < g.targets_act.length; ++i)
            g.targets_act[i].sprite.draw(c.ctx);
    }
    
    function drawScene() {
        g.gfx.house.draw(c.ctx);
        g.gfx.bushes.draw(c.ctx);
        g.gfx.tree.draw(c.ctx);
    }

    function logic() {
        if (g.gen_clock.getElapsedTime() >= g.gen_time) {
            while(!generateKillTarget()){}
            g.gen_clock.restart();
        }
        
        g.text.score.string = "Score: " + g.score;
        updateKillTargets();
    }

    function paint() {
        logic();
        c.ctx.fillStyle = "#000";
        c.ctx.fillRect(0, 0, c.w, c.h);
        // Drawing content
        g.gfx.bg.draw(c.ctx);
        drawKillTargets();
        drawScene();
        g.text.score.draw(c.ctx);
    }

    function preloadData() {
        var images = ["img/pony.png", "img/dead_pony.png"];
        for(var i in images) {
            var img = new Image();
            img.src = images[i];
            c.ctx.drawImage(img, 0, 0, 0, 0);
        }
    }

    function init() {
        // Canvas init
        c.document.style.cursor = "url('img/cursor.png'), default";

        c.name = "#screen";
        c.canvas = $(c.name)[0];
        c.ctx = c.canvas.getContext("2d");
        c.w = $(c.name).width();
        c.h = $(c.name).height();
        // Events init
        c.canvas.addEventListener('click', onClick, false);

        preloadData();
        setInterval(paint, c.frameTime);
    }
    
    init();
});
