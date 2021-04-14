        /*
            3. use opentype.js for more control
            reference: https://github.com/opentypejs/opentype.js
        */

            let font // opentype.js font object
            let fSize // font size
            let msg // text to write
            let pts = [] // store path data
            let path
    
            function setup() {
                createCanvas(windowWidth, windowHeight)
    
                opentype.load('data/BigBoy.otf', function (err, f) {
                    if (err) {
                        alert('Font could not be loaded: ' + err);
                    } else {
                        font = f
                        console.log('font ready')
    
                        fSize = 200
                        msg = 'James'
    
                        let x = 20
                        let y = 200
                        path = font.getPath(msg, x, y, fSize)
                        console.log(path.commands)
                    }
                })
            }
    
            function draw() {
                if (!font) return
    
                background(0)
                fill(255)
                stroke(255)
                for (let cmd of path.commands) {
                    if (cmd.type === 'M') {
                        beginShape()
                        vertex(cmd.x, cmd.y)
                    } else if (cmd.type === 'L') {
                        vertex(cmd.x, cmd.y)
                    } else if (cmd.type === 'C') {
                        bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y)
                    } else if (cmd.type === 'Q') {
                        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y)
                    } else if (cmd.type === 'Z') {
                        endShape(CLOSE)
                    }
                }
            }
    