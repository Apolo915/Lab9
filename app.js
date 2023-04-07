(()=>{"use strict";var e,t={494:(e,t,s)=>{var i=s(260),n=s.n(i);class r extends n().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontSize:`${this.fontSize}px`,fill:"#cd00ff"}}create(){if(this.add.image(0,0,"sky").setOrigin(0),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let s=0;e.forEach((e=>{const i=[this.screenCenter[0],this.screenCenter[1]+s];e.textGO=this.add.text(...i,e.text,this.fontOptions).setOrigin(.5,1),s+=this.lineHeight,t(e)}))}}const a=r;const c=class extends a{constructor(e){super("PlayScene",e),this.bird=null,this.pipes=null,this.isPaused=!1,this.pipeHorizontalDistance=0,this.flapVelocity=300,this.score=0,this.scoreText="",this.currentDifficulty="easy",this.difficulties={easy:{pipeHorizontalDistanceRange:[300,350],pipeVerticalDistanceRange:[160,210]},normal:{pipeHorizontalDistanceRange:[280,330],pipeVerticalDistanceRange:[150,200]},hard:{pipeHorizontalDistanceRange:[260,320],pipeVerticalDistanceRange:[120,150]}}}create(){this.currentDifficulty="easy",super.create(),this.createBird(),this.createPipes(),this.createColliders(),this.createScore(),this.createPause(),this.handleInputs(),this.listenToEvents(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:8,end:15}),frameRate:8,repeat:-1}),this.bird.play("fly")}update(){this.checkGameStatus(),this.recyclePipes()}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in: "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Fly in: "+this.initialTime),this.initialTime<=0&&(this.isPaused=!1,this.countDownText.setText(""),this.physics.resume(),this.timedEvent.remove())}createBG(){this.add.image(0,0,"sky").setOrigin(0)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setScale(3).setOrigin(0),this.bird.setBodySize(this.bird.width-2,this.bird.height-2),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setScale(.9).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setScale(.9).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=localStorage.getItem("bestScore");this.scoreText=this.add.text(16,16,"Score: 0",{fontSize:"32px",fill:"#FFFFFF"}),this.add.text(16,52,`Best score: ${e||0}`,{fontSize:"18px",fill:"#FFFFFF"})}createPause(){this.isPaused=!1;this.add.image(this.config.width-10,this.config.height-10,"pause").setInteractive().setScale(3).setOrigin(1).on("pointerdown",(()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown_SPACE",this.flap,this)}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}placePipe(e,t){const s=this.difficulties[this.currentDifficulty],i=this.getRightMostPipe(),n=Phaser.Math.Between(...s.pipeVerticalDistanceRange),r=Phaser.Math.Between(20,this.config.height-20-n),a=Phaser.Math.Between(...s.pipeHorizontalDistanceRange);e.x=i+a,e.y=r,t.x=e.x,t.y=e.y+n}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=0&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.saveBestScore(),this.increaseDifficulty()))}))}increaseDifficulty(){1===this.score&&(this.currentDifficulty="normal"),3===this.score&&(this.currentDifficulty="hard")}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(15616036),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}flap(){this.isPaused||(this.bird.body.velocity.y=-this.flapVelocity)}increaseScore(){this.score++,this.scoreText.setText(`Score: ${this.score}`)}};const h=class extends a{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"},{scene:null,text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this)),this.text=this.add.text(.33*this.config.width,.94*this.config.height,"Programmed by: Arturo Matson"),this.text.setStyle({fill:"#FFFFFF"})}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#cd00ff"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}};class o extends n().Scene{constructor(){super("PreloadScene")}preload(){this.load.image("sky","assets/background.png"),this.load.spritesheet("bird","assets/kirby.png",{frameWidth:16,frameHeight:16}),this.load.image("pipe","assets/skyscrapper.png"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("MenuScene")}}const l=o;const p=class extends a{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCenter,`Best Score: ${e||0}`,this.fontOptions).setOrigin(.5)}};const d=class extends a{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#cd00ff"})})),t.on("pointerup",(()=>{e.scene&&"Continue"===e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}},u={width:400,height:600,startPosition:{x:40,y:300}},f=[l,h,p,c,d],g=e=>new e(u),y={type:n().AUTO,...u,pixelArt:!0,physics:{default:"arcade",arcade:{}},scene:f.map(g)};new(n().Game)(y)}},s={};function i(e){var n=s[e];if(void 0!==n)return n.exports;var r=s[e]={exports:{}};return t[e].call(r.exports,r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,s,n,r)=>{if(!s){var a=1/0;for(l=0;l<e.length;l++){for(var[s,n,r]=e[l],c=!0,h=0;h<s.length;h++)(!1&r||a>=r)&&Object.keys(i.O).every((e=>i.O[e](s[h])))?s.splice(h--,1):(c=!1,r<a&&(a=r));if(c){e.splice(l--,1);var o=n();void 0!==o&&(t=o)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[s,n,r]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var n,r,[a,c,h]=s,o=0;if(a.some((t=>0!==e[t]))){for(n in c)i.o(c,n)&&(i.m[n]=c[n]);if(h)var l=h(i)}for(t&&t(s);o<a.length;o++)r=a[o],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(l)},s=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var n=i.O(void 0,[736],(()=>i(494)));n=i.O(n)})();