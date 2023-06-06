let shapeList = []
let X,Y
import { Animation, animations } from "./animate.js"
function setXY(x,y){
    X=x
    Y=y
}
function intF(ctx){
    let now = Date.now()
    animations.filter(a => a.get("playing")).forEach(a=>{
        if (a.update){
            a.update(now - a.get("mostRecentStartTime"))
        }else{
            a.updateKeyframe(now - a.get("mostRecentStartTime"))
        }
    })
    if (typeof canv != "undefined"){
        ctx.clearRect(0, 0, canv.width, canv.height);
    }
    shapeList.forEach(shape =>{
        shape.draw(ctx)
    })
}
class Shape{
    constructor(){

    }
    setBorder(width,dash,color){
        if (width=="none"){
            this.border = false
            return false
        }
        if (dash=="solid"){
            dash=[1000,0]
        }else if (dash=="dot"){
            dash = [width,width]
        }
        this.border = {
            color: color,
            dash: dash,
            width: width
        }
       
    }
    rotate(theta,rx,ry){
        this.rotation = theta
        if (typeof rx == "undefined"){
            this.rx = 0.5
            this.ry = 0.5
        }else{
            this.rx = rx 
            this.ry = ry 
        }
    }
    draw(ctx){
        ctx.save()
            if (this.shape !="Clump"){
            if (this.rotation){
                ctx.translate(compute(this.left)+compute(this.width)*this.rx,compute(this.top)+compute(this.height)*this.ry)
                if (this.joint){
                    ctx.translate(this.joint.malleable.ox,this.joint.malleable.oy)
                }
                ctx.rotate(-this.rotation)
                ctx.translate(-compute(this.width)*this.rx,-compute(this.height)*this.ry)
                if (this.joint){
                    ctx.translate(this.joint.malleable.arox,this.joint.malleable.aroy)
                }
            }else{
                ctx.translate(compute(this.left),compute(this.top))
            }
        }else{
            if (this.rotation){
                ctx.translate(compute(this.cx),compute(this.cy))
                if (this.joint){
                    ctx.translate(this.joint.malleable.ox,this.joint.malleable.oy)
                }
                ctx.rotate(-this.rotation)
                if (this.joint){
                    ctx.translate(this.joint.malleable.arox,this.joint.malleable.aroy)
                }
            }else{
                ctx.translate(compute(this.cx),compute(this.cy))
            }    
        }
        this._d(ctx)
        if (this.border){
            this._d_border(ctx)
        }
        ctx.restore()
    }
}

class Rectangle extends Shape {
    constructor(x,y,w,h,color){
        super()
        this.left = x
        this.top = y
        this.width = w
        this.height = h
        this.color = color
        this.shape = "Rectangle"
        shapeList.push(this)
        this.slID = shapeList.length-1
    }
    _d(ctx){
        ctx.fillStyle = this.color
        ctx.fillRect(0,0,compute(this.width),compute(this.height))

    }
    _d_border(ctx){
        ctx.strokeStyle = this.border.color
        ctx.lineWidth = this.border.width
        ctx.setLineDash(this.border.dash)
        ctx.strokeRect(0,0,compute(this.width),compute(this.height))
    }
}
class ShapeImage extends Shape {
    constructor(imgStr,x,y,w,h,sx,sy,sw,sh){
        super()
        let img = new Image
        this.img = img
        img.src = imgStr
        this.left = x
        this.top = y
        this.width = w
        this.height = h
        this.sx = sx ||0,
        this.sy = sy ||0,
        this.sWidth = sw || this.img.width,
        this.sHeight = sh || this.img.height,
        this.shape="Image"
        shapeList.push(this)
        this.slID = shapeList.length-1
    }
    _d(ctx){
        ctx.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight,0,0,compute(this.width),compute(this.height))
    }
    _d_border(ctx){
        ctx.strokeStyle = this.border.color
        ctx.lineWidth = this.border.width
        ctx.setLineDash(this.border.dash)
        ctx.strokeRect(0,0,compute(this.width),compute(this.height))
    }
}
class Triangle extends Shape {
    constructor(x,y,w,h,color,o1x,o1y,o2x,o2y,o3x,o3y){
        super()
        this.left = x
        this.top = y
        this.width = w
        this.height = h
        this.color = color
        this.shape = "Triangle"
        shapeList.push(this)
        this.slID = shapeList.length-1     
        this.corners = [
            [o1x,o1y],
            [o2x,o2y],
            [o3x,o3y]
        ]
    }
    _d(ctx){
        ctx.beginPath()
        ctx.moveTo(this.width*this.corners[2][0], this.height*this.corners[2][1])
        this.corners.forEach(c=>{
            ctx.lineTo(this.width *c[0],this.height*c[1])
        })
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    _d_border(ctx){
        ctx.strokeStyle = this.border.color
        ctx.lineWidth = this.border.width
        ctx.setLineDash(this.border.dash)
        ctx.beginPath()
        ctx.moveTo(this.width*this.corners[2][0], this.height*this.corners[2][1])
        this.corners.forEach(c=>{
            ctx.lineTo(this.width *c[0],this.height*c[1])
        })
        ctx.stroke()
        ctx.closePath()
    }
}
class Polygon extends Shape {
    constructor(x,y,w,h,color,corners){
        super()
        this.left = x
        this.top = y
        this.width = w
        this.height = h
        this.color = color
        this.shape = "Polygon"
        shapeList.push(this)
        this.slID = shapeList.length-1     
        this.corners = corners
    }
    _d(ctx){
        ctx.beginPath()
        ctx.moveTo(this.width*this.corners[this.corners.length-1][0], this.height*this.corners[this.corners.length-1][1])
        this.corners.forEach(c=>{
            ctx.lineTo(this.width *c[0],this.height*c[1])
        })
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    _d_border(ctx){
        ctx.strokeStyle = this.border.color
        ctx.lineWidth = this.border.width
        ctx.setLineDash(this.border.dash)
        ctx.beginPath()
        ctx.moveTo(this.width*this.corners[this.corners.length-1][0], this.height*this.corners[this.corners.length-1][1])
        this.corners.forEach(c=>{
            ctx.lineTo(this.width *c[0],this.height*c[1])
        })
        ctx.stroke()
        ctx.closePath()
    }
}
class Line extends Shape{
    constructor(x,y,x2,y2,thickness,dash,color){
        if (dash=="solid"){
            dash=[1000,0]
        }else if (dash=="dot"){
            dash = [thickness,thickness]
        }
        super()
        this.left = x
        this.top = y
        this.right = x2
        this.bottom = y2
        this.thickness = thickness
        this.dash = dash
        this.color = color
        this.shape = "Line"
        shapeList.push(this)
        this.slID = shapeList.length-1     
    }
    _d(ctx){
        ctx.strokeStyle = this.color
        ctx.lineWidth = this.thickness
        ctx.setLineDash(this.dash)
        ctx.beginPath()
        ctx.moveTo(this.left,this.top)
        ctx.lineTo(this.right,this.bottom)
        ctx.stroke()
        ctx.closePath()
    }
}
function removeFromShapeList(x,sl){
    let supL = sl ||shapeList
    supL.splice(x,1)
    supL.map(s1 => {
        if (s1.slID >=x){
            s1.slID -=1
        }
        return s1
    })
    console.log(supL)
}

class Clump extends Shape {
    constructor(cx,cy,littleList){
        super()
        this.cx = cx
        this.cy = cy
        this.shapes = littleList || []
        this.shapes.map(shape=>{
            let x = shape.slID
            removeFromShapeList(x, shape.clump)
            shape.clump = this
            this.shapes.push(this)
            shape.slID = this.shapes.findIndex(s=>s==shape)
        })
        this.shape="Clump"
        this.slID = shapeList.length
        shapeList.push(this)
    }
    addShape(shape){
        let x = shape.slID
        removeFromShapeList(x, shape.clump)
        shape.clump = this
        this.shapes.push(shape)
        shape.slID = this.shapes.findIndex(s=>s==shape)
    }
    _d(ctx){
        this.shapes.forEach(shape=>{
            shape.draw(ctx)
        })
    }

}
function compute(d){
    if (typeof d == "number"){
        return d
    }else{
       return ((d.vh && d.vh * Y) || (d.vw && d.vw*X)) + d.pix
    }
}

class Camera {
    constructor(fx,fy,sz){
        this.fx = fx
        this.fy = fy
        this.sz = sz
    }
    perspective(ctx,drawFunction){
        ctx.translate(-compute(this.fx), -compute(this.fy));
        ctx.scale(this.sz, this.sz);
        drawFunction(ctx) //this would be IntF()
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
let Pi = 3.1415926
let Zero = 1/(10**16)
let getShapeList = function (){
    return shapeList
}
export {Shape,Rectangle,ShapeImage, Clump, intF,setXY, Camera,Pi,Zero, Triangle, Polygon, Line,getShapeList} 