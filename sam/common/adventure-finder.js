import Heap from 'heap';

const GRAPH_RESOLUTION = 10;

class Box {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    width() {
        return this.x2 - this.x1;
    }

    height() {
        return this.y2 - this.y1;
    }

    contains(x, y) {
        return (this.x1 < x && x < this.x2 &&
                this.y1 < y && y < this.y2);
    }

    intersects(box) {
        return (this.x1 <= box.x2 &&
                box.x1 <= this.x2 &&
                this.y1 <= box.y2 &&
                box.y1 <= this.y2);
    }

    intersects_segment(ox, oy, invdx, invdy) {
        let t1 = (this.x1 - ox) * invdx;
        let t2 = (this.x2 - ox) * invdx;
        let t3 = (this.y1 - oy) * invdy;
        let t4 = (this.y2 - oy) * invdy;

        let tmin = Math.max(Math.min(t1, t2), Math.min(t3, t4));
        let tmax = Math.min(Math.max(t1, t2), Math.max(t3, t4));

        if (tmax < 0) return false;
        if (tmax > 1 || tmin > tmax) return false;

        return true;
    }

    static square(cx, cy, side) {
        let half_side = side / 2;
        return new Box(cx - half_side, cy - half_side, cx + half_side, cy + half_side);
    }
}


class NodeTree {
    constructor(region, obstacles, root, level) {
        if (!level) {
            this.level = Math.ceil(Math.log2(region.width() / GRAPH_RESOLUTION));
        } else {
            this.level = level;
        }

        if (root) {
            this.root = root;
        } else {
            this.root = this;
        }

        this.region = region;

        this.x = (region.x1 + region.x2) / 2;
        this.y = (region.y1 + region.y2) / 2;

        this.obstacles = obstacles;

        this.crossable = true;
        this.is_leaf = false;

        if (this.obstacles.length == 0) {
            this.is_leaf = true;
        } else if (this.level == 0) {
            this.is_leaf = true;
            this.crossable = false;
        }

        this.quads = null;
        this.neighbors = null;

        this.list_id = 0;
        this.heuristic = 0;

        if (!this.is_leaf) {
            this.subdivide();
        }
    }

    get_quad(x, y) {
        if (x < this.x && y < this.y) return this.quads[0];
        else if (x >= this.x && y < this.y) return this.quads[1];
        else if (x < this.x && y >= this.y) return this.quads[2];
        return this.quads[3];
    }

    subdivide() {
        this.quads = [];

        let l = this.region.x1;
        let r = this.region.x2;
        let t = this.region.y1;
        let b = this.region.y2;

        let x = this.x;
        let y = this.y;

        let subregions = [
            new Box(l, t, x, y),
            new Box(x, t, r, y),
            new Box(l, y, x, b),
            new Box(x, y, r, b),
        ];

        let obstacles = this.obstacles;
        for (let i = 0; i < subregions.length; i++) {
            let subregion = subregions[i];
            let subregion_obstacles = [];

            for (let j = 0; j < obstacles.length; j++) {
                let obstacle = obstacles[j];
                if (subregion.intersects(obstacle)) {
                    subregion_obstacles.push(obstacle);
                }
            }

            this.quads[i] = new NodeTree(subregion, subregion_obstacles, this.root, this.level - 1);
        }
    }

    get(x, y) {
        if (!this.region.contains(x, y)) return null;
        if (this.is_leaf) return this;
        return this.get_quad(x, y).get(x, y);
    }

    get_neighbors() {
        if (!this.is_leaf) throw new Error('Tried getting neighbors of non-leaf node');
        if (this.neighbors) return this.neighbors;

        let left = this.region.x1;
        let right = this.region.x2;
        let top = this.region.y1;
        let bottom = this.region.y2;

        let min_size = this.region.width() * (2 ** -this.level);
        let num_neighbors = 2 ** this.level;

        let neighbor_set = new Set();

        // Top and bottom (and corners).
        for (let x = -(num_neighbors + 1); x <= (num_neighbors + 1); x += 2) {
            let real_x = this.x + min_size * (x / 2);

            let neighbor = this.root.get(real_x, top - min_size / 2);
            if (neighbor && neighbor.crossable) neighbor_set.add(neighbor);

            neighbor = this.root.get(real_x, bottom + min_size / 2);
            if (neighbor && neighbor.crossable) neighbor_set.add(neighbor);
        }

        // Left and right.
        for (let y = -(num_neighbors - 1); y <= (num_neighbors - 1); y += 2) {
            let real_y = this.y + min_size * (y / 2);

            let neighbor = this.root.get(left - min_size / 2, real_y);
            if (neighbor && neighbor.crossable) neighbor_set.add(neighbor);

            neighbor = this.root.get(right + min_size / 2, real_y);
            if (neighbor && neighbor.crossable) neighbor_set.add(neighbor);
        }

        this.neighbors = [...neighbor_set];

        return this.neighbors;
    }

    get_containing(a, b) {
        if (this.is_leaf) return this;

        let a_quad = this.get_quad(a.x, a.y);
        let b_quad = this.get_quad(b.x, b.y);

        if (a_quad == b_quad) return a_quad.get_containing(a, b);

        return this;
    }

    has_sight(node) {
        let ancestor = this.root.get_containing(this, node);
        let obstacles = ancestor.obstacles;

        let min_x = Math.min(node.x, this.x);
        let max_x = Math.max(node.x, this.x);
        let min_y = Math.min(node.y, this.y);
        let max_y = Math.max(node.y, this.y);

        let invdx = 1 / (node.x - this.x);
        let invdy = 1 / (node.y - this.y);

        for (let i = 0; i < obstacles.length; i++) {
            let obstacle = obstacles[i];
            if (max_x >= obstacle.x1 && min_x <= obstacle.x2 &&
                max_y >= obstacle.y1 && min_y <= obstacle.y2 &&
                obstacle.intersects_segment(this.x, this.y, invdx, invdy)) {
                return false;
            }
        }

        return true;
    }
}

class VirtualNode extends NodeTree {
    constructor(parent, x, y) {
        super(parent.region, [], parent.root, -1);

        this.x = x;
        this.y = y;

        this.parent = parent;
        this.neighbors = [parent];

        let neighbors = parent.get_neighbors();

        for (let neighbor of neighbors) {
            if (!neighbor.has_sight(this)) continue;
            this.neighbors.push(neighbor);
            neighbor.get_neighbors().push(this);
        }

        neighbors.push(this);
    }

    destroy() {
        for (let neighbor of this.neighbors) {
            let neighbor_neighbors = neighbor.get_neighbors();
            neighbor_neighbors.splice(neighbor_neighbors.indexOf(this), 1);
        }
    }
}

function distance(a, b) {
    let x_dist = b.x - a.x;
    let y_dist = b.y - a.y;
    return Math.sqrt(x_dist * x_dist + y_dist * y_dist);
}

let list_id = 0;
export function find_path(source, target) {
    /* eslint func-names:0, prefer-arrow-callback:0, no-var:0, vars-on-top:0 */
    list_id += 2;
    var closed_id = list_id - 1;
    var open_id = list_id;

    var open = new Heap(function (a, b) { return a.heuristic - b.heuristic; });

    var traveled = new Map();
    var parents = new Map();

    traveled.set(source, 0);
    parents.set(source, source);

    source.heuristic = distance(source, target);
    open.push(source);
    source.list_id = open_id;

    while (open.size()) {
        var current = open.pop();
        var parent = parents.get(current);
        let neighbors = current.get_neighbors();

        if (!parent.has_sight(current)) {
            let min_path = Infinity;
            let fastest_neighbor = null;
            for (let neighbor of neighbors) {
                if (neighbor.list_id == closed_id) {
                    let path = traveled.get(neighbor) + distance(neighbor, current);
                    if (path < min_path) {
                        min_path = path;
                        fastest_neighbor = neighbor;
                    }
                }
            }

            parents.set(current, fastest_neighbor);
            traveled.set(current, min_path);

            parent = fastest_neighbor;
        }

        if (current == target) {
            break;
        }

        current.list_id = closed_id;

        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (neighbor.list_id == closed_id) continue;

            var old_path = traveled.get(neighbor) || Infinity;

            var new_path = traveled.get(parent) + distance(parent, neighbor);
            if (new_path < old_path) {
                traveled.set(neighbor, new_path);
                parents.set(neighbor, parent);

                neighbor.heuristic = new_path + distance(neighbor, target);
                if (neighbor.list_id == open_id) {
                    open.updateItem(neighbor);
                } else {
                    open.push(neighbor);
                    neighbor.list_id = open_id;
                }
            }
        }
    }

    if (!parents.has(target)) return [];

    var path = [];
    var node = target;
    while (node && node != source) {
        path.unshift(node);
        node = parents.get(node);
    }

    return path;
}

function calculate_size(actual_size) {
    let cur_size = GRAPH_RESOLUTION;

    while (cur_size < actual_size) {
        cur_size *= 2;
    }

    return cur_size;
}

export function initialize_graph(map_name) {
    let map_data = parent.G.maps[map_name].data;

    let min_x = Infinity;
    let max_x = -Infinity;
    let min_y = Infinity;
    let max_y = -Infinity;


    let obstacles = [];

    for (let line of map_data.x_lines) {
        min_x = Math.min(min_x, line[0]);
        max_x = Math.max(max_x, line[0]);
        obstacles.push(new Box(
            line[0] - 3,
            line[1] - 3,
            line[0] + 3,
            line[2] + 7
        ));
    }

    for (let line of map_data.y_lines) {
        min_y = Math.min(min_y, line[0]);
        max_y = Math.max(max_y, line[0]);
        obstacles.push(new Box(
            line[1] - 3,
            line[0] - 3,
            line[2] + 3,
            line[0] + 7
        ));
    }

    let largest_side = Math.max(max_x - min_x, max_y - min_y);
    let side = calculate_size(largest_side);

    let center_x = (max_x + min_x) / 2;
    let center_y = (max_y + min_y) / 2;
    let region = Box.square(center_x, center_y, side);

    return new NodeTree(region, obstacles);
}
