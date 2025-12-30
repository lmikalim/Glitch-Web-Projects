let p1, m1, arr;

function setup() {
  createCanvas(400, 400);
  p1 = new Player();
  m1 = new Maze(15, 15);
  m1.set_maze_boutaoshi();
  p1.position = m1.start;
  arr = p1.getFrontView(m1.maze, p1.direction, p1.position[0], p1.position[1]);
  stroke(255); // Set the outline (stroke) color to white
  background(0); // Set the background color to black
}

function draw() {
  background(0);

  if (arr[0][0] === 1) {
    fill(30); // Set the fill color to gray for walls
    rect(0, 150, 150, 100);
    fill(0); // Set the fill color back to black
  }

  if (arr[0][2] === 1) {
    fill(30);
    rect(width - 150, 150, 150, 100);
    fill(0);
  }

  if (arr[0][1] === 1) {
    fill(30);
    rect(150, 150, 100, 100);
    fill(0);
  }

  if (arr[1][0] === 1) {
    fill(30);
    rect(0, 100, 100, 200);
    beginShape();
    vertex(100, 100);
    vertex(150, 150);
    vertex(150, height - 150);
    vertex(100, height - 100);
    endShape();
    fill(0);
  }

  if (arr[1][2] === 1) {
    fill(30);
    rect(width - 100, 100, 100, 200);
    beginShape();
    vertex(width - 100, 100);
    vertex(width - 150, 150);
    vertex(width - 150, height - 150);
    vertex(width - 100, height - 100);
    endShape();
    fill(0);
  }

  if (arr[1][1] === 1) {
    fill(30);
    rect(100, 100, 200, 200);
    fill(0);
  }

  if (arr[2][0] === 1) {
    fill(30);
    rect(0, 50, 50, 300);
    beginShape();
    vertex(50, 50);
    vertex(100, 100);
    vertex(100, height - 100);
    vertex(50, height - 50);
    endShape();
    fill(0);
  }

  if (arr[2][2] === 1) {
    fill(30);
    rect(width - 50, 50, 50, 300);
    beginShape();
    vertex(width - 50, 50);
    vertex(width - 100, 100);
    vertex(width - 100, height - 100);
    vertex(width - 50, height - 50);
    endShape();
    fill(0);
  }

  if (arr[2][1] === 1) {
    fill(30);
    rect(50, 50, 300, 300);
    fill(0);
  }

  if (arr[3][0] === 1) {
    fill(30);
    beginShape();
    vertex(0, 0);
    vertex(50, 50);
    vertex(50, height - 50);
    vertex(0, height);
    endShape();
    fill(0);
  }

  if (arr[3][2] === 1) {
    fill(30);
    beginShape();
    vertex(width, 0);
    vertex(width - 50, 50);
    vertex(width - 50, height - 50);
    vertex(width, height);
    endShape();
    fill(0);
  }
}

// Rest of the code remains the same


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    p1.turnLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    p1.turnRight();
  }
  if (keyCode === UP_ARROW) {
    if (p1.direction === p1.NORTH) {
      if (m1.maze[p1.position[1] - 1][p1.position[0]] === 0) {
        p1.position[1]--;
      }
    } else if (p1.direction === p1.SOUTH) {
      if (m1.maze[p1.position[1] + 1][p1.position[0]] === 0) {
        p1.position[1]++;
      }
    } else if (p1.direction === p1.WEST) {
      if (m1.maze[p1.position[1]][p1.position[0] - 1] === 0) {
        p1.position[0]--;
      }
    } else if (p1.direction === p1.EAST) {
      if (m1.maze[p1.position[1]][p1.position[0] + 1] === 0) {
        p1.position[0]++;
      }
    }
  }
  if (keyCode === DOWN_ARROW) {
    if (p1.direction === p1.NORTH) {
      if (m1.maze[p1.position[1] + 1][p1.position[0]] === 0) {
        p1.position[1]++;
      }
    } else if (p1.direction === p1.SOUTH) {
      if (m1.maze[p1.position[1] - 1][p1.position[0]] === 0) {
        p1.position[1]--;
      }
    } else if (p1.direction === p1.WEST) {
      if (m1.maze[p1.position[1]][p1.position[0] + 1] === 0) {
        p1.position[0]++;
      }
    } else if (p1.direction === p1.EAST) {
      if (m1.maze[p1.position[1]][p1.position[0] - 1] === 0) {
        p1.position[0]--;
      }
    }
  }
  arr = p1.getFrontView(m1.maze, p1.direction, p1.position[0], p1.position[1]);
}







class Player {
  constructor() {
    this.NORTH = 0;
    this.SOUTH = 1;
    this.WEST = 2;
    this.EAST = 3;
    this.direction = this.SOUTH;
    this.position = [1, 1];
  }
  
  getFrontView(arr,d,x,y) {
    if (d === 0) {
      const px = x-1;
      const py = y-3;
      const front_arr = [];
      let tmp = [];
      for (let y = Math.max(py,0); y < Math.min(py+4,arr.length); y++) {
        for (let x = Math.max(px,0); x < Math.min(px+3,arr[0].length); x++) {
          tmp.push(arr[y][x]);
        }
        front_arr.push(tmp)
        tmp = [];
      }
      const view_arr = [...Array(4)].map(() => Array(3).fill(1));
      const flip_arr = this.flip(front_arr);
      for (let y = 0; y < front_arr.length; y++) {
        for (let x = 0; x < 3; x++) {
          view_arr[y][x] = flip_arr[y][x];
        }
      }
      return this.flip(view_arr);
    } else if (d === 1) {
      const px = x-1;
      const py = y;
      const front_arr = [];
      let tmp = [];
      for (let y = Math.max(py,0); y < Math.min(py+4,arr.length); y++) {
        for (let x = Math.max(px,0); x < Math.min(px+3,arr[0].length); x++) {
          tmp.push(arr[y][x]);
        }
        front_arr.push(tmp)
        tmp = [];
      }
      const view_arr = [...Array(4)].map(() => Array(3).fill(1));
      for (let y = 0; y < front_arr.length; y++) {
        for (let x = 0; x < 3; x++) {
          view_arr[y][x] = front_arr[y][x];
        }
      }
      return this.flip(view_arr);
    } else if (d === 2) {
      const px = x-3;
      const py = y-1;
      const front_arr = [];
      let tmp = [];
      for (let y = Math.max(py,0); y < Math.min(py+3,arr.length); y++) {
        for (let x = Math.max(px,0); x < Math.min(px+4,arr[0].length); x++) {
          tmp.push(arr[y][x]);
        }
        front_arr.push(tmp)
        tmp = [];
      }
      const view_arr = [...Array(4)].map(() => Array(3).fill(1));
      const rot_arr = this.flip(this.rot90(this.rot90(this.rot90(front_arr))));
      for (let y = 0; y < rot_arr.length; y++) {
        for (let x = 0; x < 3; x++) {
          view_arr[y][x] = rot_arr[y][x];
        }
      }
      return this.flip(view_arr);
    } else if (d === 3) {
      const px = x;
      const py = y-1;
      const front_arr = [];
      let tmp = [];
      for (let y = Math.max(py,0); y < Math.min(py+3,arr.length); y++) {
        for (let x = Math.max(px,0); x < Math.min(px+4,arr[0].length); x++) {
          tmp.push(arr[y][x]);
        }
        front_arr.push(tmp)
        tmp = [];
      }
      const view_arr = [...Array(4)].map(() => Array(3).fill(1));
      const rot_arr = this.flip(this.rot90(front_arr));
      for (let y = 0; y < rot_arr.length; y++) {
        for (let x = 0; x < 3; x++) {
          view_arr[y][x] = rot_arr[y][x];
        }
      }
      return this.flip(view_arr);
    }
  }
  
  turnLeft() {
    if (this.direction === this.NORTH) {
      this.direction = this.WEST;
    } else if (this.direction === this.WEST) {
      this.direction = this.SOUTH;
    } else if (this.direction === this.SOUTH) {
      this.direction = this.EAST;
    } else if (this.direction === this.EAST) {
      this.direction = this.NORTH;
    }
  }
  
  turnRight() {
    if (this.direction === this.NORTH) {
      this.direction = this.EAST;
    } else if (this.direction === this.EAST) {
      this.direction = this.SOUTH;
    } else if (this.direction === this.SOUTH) {
      this.direction = this.WEST;
    } else if (this.direction === this.WEST) {
      this.direction = this.NORTH;
    }
  }
  
  rot90(arr) {
    return arr[0].map((col,i) => arr.map(row => row[row.length-1-i]));
  }
  
  flip(arr) {
    return arr.map((row,i) => arr[arr.length-1-i]).map(row => arr[0].map((col,i) => row[row.length-1-i]));
  }
  
  printPosition() {
    console.log('position: ' + p1.position);
  }
  
  printDirection() {
    if (this.direction === this.NORTH) {
      console.log('direction: NORTH');
    } else if (this.direction === this.SOUTH) {
      console.log('direction: SOUTH');
    } else if (this.direction === this.WEST) {
      console.log('direction: WEST');
    } else if (this.direction === this.EAST) {
      console.log('direction: EAST');
    }
  }
  
  printFrontView(arr,d,x,y) {
    const view_arr = this.getFrontView(arr,d,x,y);
    for (let i = 0; i < view_arr.length; i++) {
      console.log(...view_arr[i]);
    }
  }
}

class Maze {
  constructor(width, height, seed=0) {
    this.PATH = 0;
    this.WALL = 1;
    this.width = width;
    this.height = height;
    if (this.width < 5 || this.height < 5) {
      return;
    }
    if (this.width%2 == 0) {
      this.width++;
    }
    if (this.height%2 == 0) {
      this.height++;
    }
    this.maze = [...Array(this.height)].map(() => Array(this.width).fill(0));
    this.dist = [...Array(this.height)].map(() => Array(this.width).fill(-1));
    this.start = [1, 1];
    this.goal = [this.width-2, this.height-2];
    randomSeed(seed);
  }

  set_outer_wall() {
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        if (x == 0 || y == 0 || x == this.width-1 || y == this.height-1) {
          this.maze[y][x] = this.WALL;
        }
      }
    }
    return this.maze;
  }

  set_inner_wall() {
    for (let y = 2; y < this.height-1; y+=2) {
      for (let x = 2; x < this.width-1; x+=2) {
        this.maze[y][x] = this.WALL;
      }
    }
    return this.maze;
  }

  set_maze_boutaoshi() {
    let wall_x;
    let wall_y;
    let direction;
    this.set_outer_wall();
　　this.set_inner_wall();
　　for (let y = 2; y < this.height-1; y+=2) {
      for (let x = 2; x < this.width-1; x+=2) {
        while (true) {
          wall_x = x;
          wall_y = y;
          if (y == 2) {
            direction = floor(random(4));
          } else {
            direction = floor(random(3));
          }
          if (direction == 0) {
            wall_x += 1;
          } else if (direction == 1) {
            wall_y += 1;
          } else if (direction == 2) {
            wall_x -= 1;
          } else if (direction == 3) {
            wall_y -= 1;
          }
          if (this.maze[wall_y][wall_x] != this.WALL) {
            this.maze[wall_y][wall_x] = this.WALL;
            break;
          }
        }
      }
    }
    return this.maze;
  }

  set_start_goal(start, goal) {
    if (this.maze[start[1]][start[0]] == this.PATH) {
      this.start = start;
    }
    if (this.maze[goal[1]][goal[0]] == this.PATH) {
      this.goal = goal;
    }
    return this.maze;
  }

  set_dist_bfs(flag=false) {
    let queue = [];
    this.dist[this.start[1]][this.start[0]] = 0;
    queue.push(this.start);
    while (queue.length > 0) {
      let point = queue.shift();
      for (let x of [[0,-1],[1,0],[0,1],[-1,0]]) {
        if (this.maze[point[1]+x[1]][point[0]+x[0]] == 0 && this.dist[point[1]+x[1]][point[0]+x[0]] == -1) {
          this.dist[point[1]+x[1]][point[0]+x[0]] = this.dist[point[1]][point[0]] + 1;
          queue.push([point[0]+x[0],point[1]+x[1]]);
        }
        if (flag != true) {
          if (point[0]+x[0] == this.goal[0] && point[1]+x[1] == this.goal[1]) {
            queue = [];
            break;
          }
        }
      }
    }
    return this.dist;
  }

  set_dist_dfs(flag=false) {
    let stack = [];
    this.dist[this.start[1]][this.start[0]] = 0;
    stack.push(this.start);
    while (stack.length > 0) {
      let point = stack.pop();
      for (let x of [[0,-1],[1,0],[0,1],[-1,0]]) {
        if (this.maze[point[1]+x[1]][point[0]+x[0]] == 0 && this.dist[point[1]+x[1]][point[0]+x[0]] == -1) {
          this.dist[point[1]+x[1]][point[0]+x[0]] = this.dist[point[1]][point[0]] + 1;
          stack.push([point[0]+x[0],point[1]+x[1]]);
        }
        if (flag != true) {
          if (point[0]+x[0] == this.goal[0] && point[1]+x[1] == this.goal[1]) {
            stack = [];
            break;
          }
        }
      }
    }
    return this.dist;
  }

  set_shortest_path() {
    let point = this.goal;
    let x = [[0,-1],[1,0],[0,1],[-1,0]];
    this.maze[point[1]][point[0]] = '*';
    while (this.dist[point[1]][point[0]] > 0) {
      for (let i = 0; i < x.length; ++i) {
        if (this.dist[point[1]][point[0]]-this.dist[point[1]+x[i][1]][point[0]+x[i][0]] == 1) {
          if (this.dist[point[1]][point[0]] > 0) {
            this.maze[point[1]+x[i][1]][point[0]+x[i][0]] = '*';
            point = [point[0]+x[i][0],point[1]+x[i][1]];
          }
        }
      }
    }
    return this.maze;
  }

  print_maze() {
    // this.maze[this.start[1]][this.start[0]] = 'S';
    // this.maze[this.goal[1]][this.goal[0]] = 'G';
    for (let col of this.maze) {
      let arr = '';
      for(let cell of col) {
        if (cell == this.WALL) {
          arr += '#';
        } else if (cell == this.PATH) {
          arr += ' ';
        } else if (cell == 'S') {
          arr += 'S';
        } else if (cell == 'G') {
          arr += 'G';
        } else if (cell == '*') {
          arr += '*';
        }
      }
      console.log(arr);
    }
  }

  print_dist() {
    for (let col of this.dist) {
      let arr = '';
      for (let cell of col) {
        if (cell == -1) {
          if (Math.max.apply(null, Array.prototype.concat.apply([], this.dist)) == -1) {
            arr += '#';
          } else {
            for (let i = 0; i < str(Math.max.apply(null, Array.prototype.concat.apply([], this.dist))).length; ++i) {
              arr += '#';
            }
          }
        } else {
          if (str(cell).length == str(Math.max.apply(null, Array.prototype.concat.apply([], this.dist))).length) {
            arr += str(cell);
          } else {
            for (let i = 0; i < str(Math.max.apply(null, Array.prototype.concat.apply([], this.dist))).length-str(cell).length; ++i) {
              arr += ' ';
            }
            arr += str(cell);
          }
        }
      }
      console.log(arr);
    }
  }
}
