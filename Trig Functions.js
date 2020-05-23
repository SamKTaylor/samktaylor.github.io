var followPlayer = "";

setInterval(function(){
var player = parent.entities[followPlayer];
    if(player != null)
    {
        var point = pointOnAngle(player, entityAngle(player) + Math.PI, 50);
        move(point.x, point.y);
    }
}, 100);

function entityAngle(entity)
{
    return (entity.angle * Math.PI)/180;
}

function angleFromPointToPoint(x1, y1, x2, y2)
{
    var deltaX = x1 - x2;
    var deltaY = y1 - y2;
    
    return Math.atan2(deltaY, deltaX);
}

function angleToPoint(x, y)
{
    var deltaX = character.real_x - x;
    var deltaY = character.real_y - y;
    
    return Math.atan2(deltaY, deltaX);
}

function pointOnAngle(entity, angle, distance)
{
    var circX = entity.real_x + (distance * Math.cos(angle));
    var circY = entity.real_y + (distance * Math.sin(angle));
    
    return {x: circX, y: circY};
}

function offsetToPoint(x, y)
{
    var angle = angleToPoint(x, y) + Math.PI;
    
    return angle - characterAngle();
    
}

function distance2d(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x1 - x2, 2) +                             Math.pow(y1 - y2, 2));
}