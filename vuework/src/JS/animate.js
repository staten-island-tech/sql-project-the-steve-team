let animations = []
class Animation{
    constructor(imageShape,frameWidth, frameHeight,FPS,keyframes,looped){
        this.imageShape = imageShape
        this.img = keyframes || imageShape.img
        let long =this.img.width/frameWidth
        let tall = this.img.height/frameHeight
        animations.push(this)
        this.frames = []
        this.frameData = {
            height: frameHeight,
            width: frameWidth,
            displayTime: 1/FPS
        }
        for (let i=0; i<tall; i++){
            for (let e=0; e<long; e++){
                this.frames.push({
                    sx: (e*frameWidth),
                    sy: (i*frameHeight),
                })
            }
        }
        this.animationData = {
            currentFrame: 0,
            timeStamp: 0,
            length: this.frames.length /FPS  *1000,
            playing:false,
            looped:looped,
            FPS: FPS
        }
    }
    get(str){
        return this[str]|| this.animationData[str]|| this.frameData[str]
    }
    play(){
        this.animationData.playing = true
        this.mostRecentStartTime = Date.now()
    }
    setKeyframe(number){
        this.animationData.currentFrame = number
        this.imageShape.sx = this.frames[number].sx
        this.imageShape.sy = this.frames[number].sy
        this.imageShape.sWidth = this.frameData.width
        this.imageShape.sHeight  = this.frameData.height
    }
    updateKeyframe(time){
        if (this.animationData.playing && (this.imageShape.img == this.img)){
            let looped = this.get("looped")
            if (looped ){
                time = time % this.animationData.length
            }
            if (time>(this.animationData.length)){
                this.playing = false
                this.setKeyframe(0)
            }else {
                let closestFrame = Math.floor(time/this.animationData.length * this.frames.length)
                console.log(closestFrame)
                this.setKeyframe(closestFrame)
            }
        }else{
            this.animationData.playing=false
        }
    }
}
let list = ["rotation","ox","oy","arox","aroy"]
class JointBasedAnimation {
    constructor(clump,keyframeArray,length,looped){
        this.clump = clump
        this.keyframes = keyframeArray /*example: [{ts:0, frame:[{id:"arm1", rotation:45,ox:0.2,oy:0.1,children:[...]}}]}, {ts:0.5...},...]  */
        this.joints = []
        this.length = length //in ms//
        this.looped = looped
        this.playing = false
        this.timing = "x"
        animations.push(this)
    }
    get(str){
        return this[str]
    }
    addJoint(joint,parentJoint){ //for now, we wont be using parentJoint feature.
        joint.parent = parentJoint
        if (parentJoint){
            parentJoint.children = parentJoint.children || []
            parentJoint.children.push(joint)
        }else {
            this.joints.push(joint)
        }
    }
    play(){
        this.playing = true
        this.mostRecentStartTime = Date.now()
        this.clump.animation = this
    }
    set(kf1,kf2,perc){
        kf1.forEach(jointData =>{
            let id = jointData.id
            let jointData2 = kf2.find(j=>j.id == id)
            let joint = this.joints.find(j=>j.id = id)
            list.forEach(prop=>{
                if (jointData[prop] && jointData2[prop]){
                    joint.malleable[prop] = (jointData[prop]*(1-perc)) + (jointData2[prop]*perc)               
                                }
            })
            joint.shape.rotate(joint.malleable.rotation,joint.px,joint.py)
        })
    }
    update(time){
        let perc = time/this.length
        if (perc>1){
            if (!this.looped){
                this.playing = false
                this.clump.animation = null
                return false
            }
            perc = perc %1
        }
        let x = perc
        perc = eval(`${this.timing}`)

        let kf2 = this.keyframes.findIndex(kf=> {return kf.ts >=perc})
        let kf1 = this.keyframes[kf2-1] || this.keyframes[0]
        kf2 = this.keyframes[kf2]
        perc = (perc - kf1.ts)/(kf2.ts-kf1.ts)
        this.set(kf1.frame,kf2.frame,perc)
    }
}

class Joint {
    constructor(shape,px, py,uid){
        this.shape = shape
        shape.joint = this
        this.px = px
        this.py = py
        this.malleable={
            rotation: 0,
            ox: 0,      //note, just like px and py, ox and ore % of the shape's width and height
            oy: 0,      //ox and oy are applide BEFORE the rotation.
            arox:0,     //similar to ox and oy, except this is applied AFTER the rotation
            aroy: 0,
        }
        this.id = uid
    }
}
class Transition {
    constructor(shape,start,end,length,timing){
        this.shape = shape
        this.start = start
        this.end = end
        this.length = length
        this.playing = false

        this.timing = timing || "x"
        animations.push(this)
    }
    play(){
        this.playing = true
        this.mostRecentStartTime = Date.now()
        this.shape.transition = this
    }
    update(time){
        let perc = time/this.length
        let x = perc
        perc = eval(`${this.timing}`)
        if (perc <= 1){
        let KEYS = Object.keys(this.start)
        KEYS.forEach(prop=>{
            this.shape[prop] = (this.start[prop]*(1-perc)) + (this.end[prop] * perc)
        })
        }else{
            this.playing = false
            if (this.onFinished){
                this.onFinished()
            }
        }
    }
    get(prop){
        return this[prop]
    }
}
export {Animation,animations,JointBasedAnimation,Joint, Transition}