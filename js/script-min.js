"use strict";function _classCallCheck(i,t){if(!(i instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function i(i,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(i,s.key,s)}}return function(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}}(),Game=function(){function i(t){_classCallCheck(this,i),this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.gameSize={x:this.canvas.width,y:this.canvas.height},this.player=new Player(this.gameSize,this.collisions),this.ball=new Ball(this.gameSize),this.bricks=this.drawBricks(),this.lives=3,this.score=0,this.collisions=new CollisionDetection(this.ball,this.player,this.gameSize,this.bricks)}return _createClass(i,[{key:"drawRect",value:function i(t,e){this.ctx.clearRect(0,0,this.gameSize.x,this.gameSize.y),this.ctx.fillRect(t.center.x-t.size.x/2,t.center.y-t.size.y/2,t.size.x,t.size.y),this.ctx.fillRect(e.center.x-e.size.x/2,e.center.y-e.size.y/2,e.size.x,e.size.y);for(var s=0;s<this.bricks.length;s++)this.ctx.fillRect(this.bricks[s].center.x-this.bricks[s].size.x/2,this.bricks[s].center.y-this.bricks[s].size.y/2,this.bricks[s].size.x,this.bricks[s].size.y)}},{key:"drawText",value:function i(t,e,s,n,l){t.fillText(e+s,n,l)}},{key:"drawBricks",value:function i(){for(var t=[],e=0;e<540;e++){var s=22+e%20*24,n=40+e%27*10;t.push(new Brick({x:s,y:n}))}return t}},{key:"filterBricks",value:function i(){var t=this;this.bricks=this.bricks.filter(function(i){return!t.collisions.brickHit(i)})}},{key:"update",value:function i(){this.filterBricks(),this.player.update(),this.collisions.brickCollision(this.bricks),this.ball.update(this.collisions),this.collisions.bricks=this.bricks,this.updateScore(),this.updateLives()}},{key:"updateScore",value:function i(){var t=this;this.collisions.bricks.forEach(function(i){t.collisions.brickHit(i)&&(t.score+=1)})}},{key:"updateLives",value:function i(){this.collisions.ballDrop()&&(self.lives-=1)}},{key:"draw",value:function i(){this.drawRect(this.player,this.ball)}},{key:"play",value:function i(){this.update(),this.draw()}},{key:"playGame",value:function i(){var t=this;setInterval(function(){return t.play()},10)}}]),i}(),Player=function(){function i(t){_classCallCheck(this,i),this.size={x:100,y:10},this.center={x:t.x/2,y:t.y-2},this.input=new Input}return _createClass(i,[{key:"update",value:function i(){this.input.keyboardPress(this.input.key.left)?this.center.x-=4:this.input.keyboardPress(this.input.key.right)&&(this.center.x+=4)}},{key:"printSide",value:function i(){this.input.keyboardPress(this.input.key.left)}}]),i}(),Input=function(){function i(){_classCallCheck(this,i),this.keyState={},this.key={left:37,right:39,space:32}}return _createClass(i,[{key:"keyboardPress",value:function i(t){var e=this;return window.onkeydown=function(i){e.keyState[i.keyCode]=!0},window.onkeyup=function(i){e.keyState[i.keyCode]=!1},!0===this.keyState[t]}}]),i}(),Ball=function(){function i(t,e){_classCallCheck(this,i),this.gameSize=t,this.size={x:6,y:6},this.center={x:250,y:450},this.velocity={x:2,y:-2}}return _createClass(i,[{key:"moveBall",value:function i(){this.center.x+=this.velocity.x,this.center.y+=this.velocity.y}},{key:"update",value:function i(t){t.hitWall()&&(this.velocity.x=-this.velocity.x),t.hitCeiling()&&(this.velocity.y=-this.velocity.y),t.ballHit()&&(this.velocity.y=-this.velocity.y);var e=this;t.bricks.forEach(function(i){t.brickHit(i)&&(e.velocity.y=-e.velocity.y)}),this.moveBall(),this.startAgain()}},{key:"startAgain",value:function i(){this.center.y-4>this.gameSize.y&&(this.center={x:250,y:450},this.velocity={x:0,y:-0})}}]),i}(),Brick=function i(t){_classCallCheck(this,i),this.size={x:20,y:7},this.center=t},CollisionDetection=function(){function i(t,e,s,n){_classCallCheck(this,i),this.ball=t,this.player=e,this.gameSize=s,this.bricks=n}return _createClass(i,[{key:"ballHit",value:function i(){var t=this.ball.size.x/2;return this.ball.center.y==this.gameSize.y&&this.player.center.x-this.player.size.x/2<this.ball.center.x&&this.ball.center.x<this.player.center.x+this.player.size.x/2}},{key:"hitWall",value:function i(){var t=this.ball.size.x/2;return this.ball.center.x>this.gameSize.x-t||this.ball.center.x<t}},{key:"hitCeiling",value:function i(){var t=this.ball.size.x/2;return this.ball.center.y<t}},{key:"brickHit",value:function i(t){var e=t.center.x-t.size.x/2,s=t.center.y-t.size.y/2;return this.ball.center.x>e&&this.ball.center.x<e+t.size.x&&this.ball.center.y>s&&this.ball.center.y<s+t.size.y}},{key:"brickCollision",value:function i(){this.bricks.forEach(function(i){})}},{key:"ballDrop",value:function i(){return this.ball.center.y>this.gameSize.y}}]),i}();window.onload=function(){new Game("screen").playGame()};