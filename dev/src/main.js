enchant();

var core;

// クマスプライト
var Bear = Class.create(Sprite, {
	initialize: function(x, y) {
		Sprite.call(this, 32, 32);
		this.x = x;
		this.y = y;
		this.image = core.assets['images/chara1.png'];
	}
});

// クマを歩かせる処理
function walk(e) {
	var bear = e.target;
	bear.x += 4;
	bear.frame = Math.floor(bear.age % 3);
}

window.onload = function() {
	core = new Core(320, 320);
	core.fps = 24;
	core.touched = false;
	core.preload([
		'images/chara1.png'
	]);

	core.onload = function() {
		core.currentScene.backgroundColor = 'rgb(239, 228, 202)';

		spriteGroup = new Group();
		core.currentScene.addChild(spriteGroup);

		// 白クマ１の表示
		var whiteBear1 = new Bear(160, 0);
		whiteBear1.frame = 5;
		whiteBear1.scaleX = -1;
		spriteGroup.addChild(whiteBear1);

		// 白クマ２の表示
		var whiteBear2 = new Bear(160, 64);
		whiteBear2.frame = 5;
		whiteBear2.scaleX = -1;
		spriteGroup.addChild(whiteBear2);
		
		// 歩くクマ１の表示
		var bear1 = new Bear(0, 0);
		bear1.on('enterframe', walk);
		bear1.on('enterframe', function() {
			if (this.intersect(whiteBear1)) {
				this.clearEventListener();
			}
		})
		spriteGroup.addChild(bear1);

		// 歩くクマ２の表示
		var bear2 = new Bear(0, 64);
		bear2.on('enterframe', walk);
		bear2.on('enterframe', function() {
			if (this.within(whiteBear2, 10)) {
				this.clearEventListener();
			}
		})
		spriteGroup.addChild(bear2);
		
		var label1 = new Label();
		label1.x = 200;
		label1.y = 2;
		label1.text = 'intersect';
		core.currentScene.addChild(label1);
		
		var label2 = new Label();
		label2.x = 200;
		label2.y = 66;
		label2.text = 'within';
		core.currentScene.addChild(label2);

	};

	core.debug();
//	core.start();
};
