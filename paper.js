class Paper{
  
  // v_x is velocity for x, v_y is velocity for y,r is radius
  constructor(x,y,v_x,v_y,r){
    this.x = x;
    this.y = y;
    this.v_x = v_x;
    this.v_y = v_y;
    this.r = r;
  }
  
  show(){
    image(prImg,this.x,this.y,this.r,this.r);

  }
  
  


  move(){

    this.x = this.x + this.v_x 
    this.y = this.y + this.v_y 

    
    // if we go over the horizontal edges (also accounts for a bug)
    if (this.x > width - this.r){
      this.v_x = this.v_x * -1;
      this.x = width - this.r;
    } else if (this.x < this.r) {
      this.v_x = this.v_x * -1;
      this.x = this.r;
     }
    
    //if we go over the vertical edges
    if (this.y > height - this.r) {
      this.v_y = this.v_y * -1;
      this.y = height - this.r 
      } else if (this.y < this.r) {
      this.v_y = this.v_y * -1;
      this.y = this.r;
     }
    
    //if it hits the north west edge
    if (this.x == width && this.y == height){
      this.x = width - 2 * this.r;
      this.y = height - 2 * this.r;
    }
    
    //if it hits the north east edge
    if (this.x == 0 && this.y == height){
      this.x = 2 * this.r;
      this.y = height - 2 * this.r;
    }
  
    //if it hits the south west edge
    if (this.x == width && this.y == 0){
      this.x = width - 2 * this.r;
      this.y = 2 * this.r;
    }
    
    //if it hits the south east edge
    if (this.x == 0 && this.y == 0){
      this.x = 2 * this.r;
      this.y = 2 * this.r;
    }
  }
  

}