class Sling{
    constructor(x, y, width, height, slingAngle) {
        var options = {
          restitution: 0.8,
          friction: 1.0,
          density: 1.0,
          isStatic: true
        };
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        this.trajectory = [];
        this.image = loadImage("sling.png");
        this.isRemoved = false;
        this.slingAngle = slingAngle;
        this.velocity = p5.Vector.fromAngle(slingAngle);
        World.add(world, this.body);
      }
    
     
    
      shoot(slingAngle) {
        this.velocity = p5.Vector.fromAngle(slingAngle + PI / 2);
        this.velocity.mult(25);
    
        Matter.Body.setVelocity(this.body, {
          x: this.velocity.x,
          y: this.velocity.y
        });
    
        Matter.Body.setStatic(this.body, false);
      }
    
      display() {
        var tmpAngle;
        if (this.body.velocity.y === 0) {
          tmpAngle = this.slingAngle + PI / 2;
        } else {
          tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x);
        }
    
        Matter.Body.setAngle(this.body, tmpAngle);
    
        var pos = this.body.position;
        var angle = this.body.angle;
    
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    
        if (this.body.velocity.x > 0 && this.body.position.x > 400) {
          var position = [this.body.position.x, this.body.position.y];
          this.trajectory.push(position);
        }
    
        for (var i = 0; i < this.trajectory.length; i++) {
          fill("white");
          ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }
      }
    
      remove(index) {
        this.speed = 0.05;
        this.width = 300;
        this.height = 300;
        this.isBroken = true;
        setTimeout(() => {
          Matter.World.remove(world, arrows[index].body);
          arrows.splice(index, 1);
        }, 2000);
      }
    }