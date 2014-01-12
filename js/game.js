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
        spawns: new Array(new Vector3D(711, 361, 90), new Vector3D(15, 308, 0)), // template: x, y, rotation
        targets_act: new Array(),
        gen_clock: new Clock(),
        gen_time: 1000, // ms

        /* TEXTS */
        text: {
            header: new Text("Pony Hunter", "Arial Black", "black", 24, new Vector2D(10, 10))
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
        this.sprite = new Sprite("img/pony.png");
        this.spawn_id = spawn_id;
        this.sprite.pos = new Vector2D(g.spawns[spawn_id].x, g.spawns[spawn_id].y);
        this.sprite.rotate(g.spawns[spawn_id].z);
    }
    // pony :D
    // Events
    function onClick(e) {
        var position = $(c.name).position();
        var x = e.pageX - position.left;
        var y = e.pageY - position.top;

        if (g.audio.shot.ended || !user.shoted)
        {
            g.audio.shot.play();
            user.shoted = true;
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
            return false;

        var spawn_id = getRandomInt(0, g.spawns.length - 1);
        // Checking, is any killtarget on this spawn.
        if (getKillTargetOnSpawn(spawn_id) !== -1)
            return false;

        g.targets_act.push(new KillTarget(spawn_id));

        return true;
    }

    function drawKillTargets() {
        for (i = 0; i < g.targets_act.length; ++i)
            g.targets_act[i].sprite.draw(c.ctx);
    }
    
    function drawScene() {
        g.gfx.house.draw(c.ctx);
        g.gfx.bushes.draw(c.ctx);
        g.gfx.tree.draw(c.ctx);
    }

    function logic() {
        if (g.gen_clock.getElapsedTime() >= g.gen_time) {
            generateKillTarget();
            g.gen_clock.reset();
        }
    }

    function paint() {
        logic();
        c.ctx.fillStyle = "#000";
        c.ctx.fillRect(0, 0, c.w, c.h);
        // Drawing content
        g.gfx.bg.draw(c.ctx);
        drawKillTargets();
        drawScene();
        g.text.header.draw(c.ctx);
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

        setInterval(paint, c.frameTime);
    }
    
    init();
});
