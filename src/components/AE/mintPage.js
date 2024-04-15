import { useEffect, useRef } from 'react';

const Box = () => {
    const renderRef = useRef();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('p5').then(({ default: p5 }) => {
                // const sketch = (p) => {
                //     let cols, rows;
                //     let scl = 25;
                //     let w = 2000;
                //     let h = 480;
                //     let terrain = [];
                //     let wave = 0;
                //     let clrR = 255;
                //     let clrG = 255;
                //     let clrB = 255;

                //     p.setup = () => {
                //         const canvasWidth = window.innerWidth;
                //         const canvasHeight = window.innerHeight;
                //         p.createCanvas(canvasWidth, canvasHeight, p.WEBGL).parent(renderRef.current);
                //         cols = w / scl;
                //         rows = h / scl;
                //         window.addEventListener('resize', () => {
                //             const canvasWidth = window.innerWidth;
                //             const canvasHeight = window.innerHeight;
                //             p.resizeCanvas(canvasWidth, canvasHeight); // 調整畫布大小
                //         });

                //     };

                //     p.draw = () => {
                //         // 滑鼠距離中心
                //         let msTX = p.abs((p.mouseX - p.width / 2));

                //         // 動態山脈
                //         wave += -0.02;
                //         let yoff = 0;
                //         for (let x = 0; x < cols; x++) {
                //             terrain[x] = [];
                //             let xoff = wave;
                //             for (let y = 0; y < rows; y++) {
                //                 terrain[x][y] = p.map(p.noise(xoff, yoff), 0, 1, -150, 200);
                //                 xoff += 0.1;
                //             }
                //             yoff += 0.2 + p.map(p.noise(0, 0), 0, 1, 0, 5);
                //         }

                //         p.background(0);
                //         p.stroke(clrR, clrG, clrB);
                //         p.strokeWeight(0.5);
                //         p.fill(0);
                //         p.translate(0, 400, 150);
                //         p.rotateX(p.PI / 2.2);
                //         p.translate(-w / 2, -h / 2);
                //         for (let y = 0; y < rows - 1; y++) {
                //             p.beginShape(p.TRIANGLE_STRIP);
                //             for (let x = 0; x < cols; x++) {
                //                 p.vertex(x * scl, y * scl, terrain[x][y]);
                //                 p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
                //             }
                //             p.endShape();
                //         }
                //         // 位移復原
                //         p.translate(w / 2, h / 2);
                //         p.rotateX(-p.PI / 2);
                //         p.translate(0, -400, -150);

                //         // 盒子
                //         let msX = p.map(p.mouseY, p.width, 0, 0, 3);
                //         let msY = p.map(p.mouseX, p.height, 0, 0, 3);
                //         p.push();
                //         p.noFill();
                //         p.stroke(clrR, clrG, clrB);
                //         p.translate(0, -100, 0);
                //         p.rotateX(p.frameCount / 180 + msX);
                //         p.rotateY(-p.frameCount / 120 + msY);
                //         p.ellipsoid(1800, 1800, 1800, 8, 4);
                //         p.ellipsoid(20, 30, 20, 8, 2);
                //         p.box(40 + msTX * 4);
                //         p.box(180);
                //         p.box(175);
                //         p.box(130 + p.sin(-p.frameCount / 60) * 40);
                //         p.fill(clrR, clrG, clrB, 60);
                //         p.box(90);
                //         p.box(280, 3, 3);
                //         p.box(100, 20, 20);
                //         p.box(140, 10, 10);
                //         p.rotateY(p.PI / 2);
                //         p.box(280, 3, 3);
                //         p.box(100, 20, 20);
                //         p.box(140, 10, 10);
                //         p.rotateZ(p.PI / 2);
                //         p.box(280, 3, 3);
                //         p.box(100, 20, 20);
                //         p.box(140, 10, 10);
                //         p.fill(0);
                //         p.translate(0, 0, 180);
                //         p.box(15);
                //         p.translate(0, 0, -360);
                //         p.box(15);
                //         p.translate(0, 180, 180);
                //         p.box(15);
                //         p.translate(0, -360, 0);
                //         p.box(15);
                //         p.translate(180, 180, 0);
                //         p.box(15);
                //         p.translate(-360, 0, 0);
                //         p.box(15);
                //         p.translate(180, 0, 0);
                //         p.pop();

                //         // 點雲
                //         p.fill(clrR, clrG, clrB);
                //         p.stroke(clrR, clrG, clrB);
                //         p.strokeWeight(0.3);
                //         p.rotateY((p.frameCount / 300) * 1 + msY);
                //         p.rotateZ(p.PI / 4);
                //         for (let i = 0; i < 100; i += 3) {
                //             for (let o = 0; o < 100; o += 3) {
                //                 p.rotateX(i + o / 5);
                //                 p.rotateY(i / 6);
                //                 p.translate(i, o, i + o * 2 - 200);
                //                 p.rect((10 - msTX / 100) / 2, (10 - msTX / 100) / 2, (10 - msTX / 100) / 2);
                //             }
                //         }
                //     };
                // };
                const sketch = (p) => {
                    let scle, cols, rows;
                    let incr = 0.02;
                    let zOff = 0;
                    let sldr = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
                    let para = [];
                    let cores = new Array(4);
                    let parts = [];
                    let icles;
                    let ff;
                    class Core {
                        para;
                        sldr;
                        x;
                        y;
                        s;
                        tMax;
                        t;
                        a;
                        rRot;

                        constructor(para, sldr) {
                            this.para = para;
                            this.sldr = sldr;
                            this.x = 0;
                            this.y = 0;
                            this.s = 2;

                            this.tMax = p.random(200, 600);
                            this.t = this.tMax - 180;
                            this.a = 0;

                            this.rRot = 0;
                        }
                        dots(xPos, yPos, rMag) {
                            p.push();
                            p.translate(
                                p.width / 2 - this.para[0] * 1.5,
                                p.height / 2 - this.para[0] * 1.5
                            );

                            p.fill(255);
                            p.noStroke();

                            this.x = xPos;
                            this.y = yPos;

                            if (p.random(1) < p.map(this.sldr[1], 0, 1, 0.2, 1)) {
                                this.x =
                                    xPos +
                                    p.int(p.random(-rMag, rMag)) *
                                    this.para[0] *
                                    p.floor(p.map(this.sldr[0], 0, 1, 4, 2));
                                this.y =
                                    yPos +
                                    p.int(p.random(-rMag, rMag)) *
                                    this.para[0] *
                                    p.floor(p.map(this.sldr[0], 0, 1, 4, 2));
                            }

                            p.rect(this.x, this.y, this.s);

                            p.noFill();
                            p.stroke(255, 0.14);

                            if (p.random(1) < p.map(this.sldr[0], 0, 1, 0.1, 0.2)) {
                                p.ellipse(
                                    this.x,
                                    this.y,
                                    p.map(this.sldr[0], 0, 1, 800, 600) + p.random(-1200, 1200)
                                );
                            }
                            p.pop();
                        }

                        lines() {
                            p.push();
                            p.translate(
                                p.width / 2 - this.para[0] * 1.5,
                                p.height / 2 - this.para[0] * 1.5
                            );
                            p.translate(this.x, this.y);

                            p.noFill();
                            p.stroke(255, this.a);
                            p.strokeWeight(1.4);

                            let rAng;

                            if (p.random(1) < p.map(this.sldr[2], 0, 1, 1, 0)) {
                                let r = p.random(1);
                                if (r < 0.25) {
                                    rAng = p.radians(0);
                                } else if (r < 0.5) {
                                    rAng = p.radians(90);
                                } else if (r < 0.75) {
                                    rAng = p.radians(180);
                                } else {
                                    rAng = p.radians(270);
                                }
                            } else {
                                rAng = p.radians(p.random(360));
                            }

                            p.rotate(rAng);

                            if (this.t > 0) {
                                if (this.a > 0.14) {
                                    this.a -= 0.02;
                                } else {
                                    this.a -= 0.0006;
                                }
                                this.t--;
                            } else {
                                this.a = 0.8;
                                this.t = this.tMax;
                                this.rRotReset(this.sldr);
                            }

                            p.line(0, 0, 2000, 0);

                            if (p.random() < p.map(this.sldr[3], 0, 1, 0.02, 0.8)) {
                                p.rotate(p.radians(this.rRot));
                                p.stroke(255, this.a / 4);
                                p.line(0, 0, 2000, 0);
                            }
                            p.pop();
                        }

                        rRotReset(sldr) {
                            let rRotMax = p.map(sldr[3], 0, 1, 2, 90);
                            this.rRot = p.map(p.noise(p.millis()), 0, 1, -rRotMax, rRotMax);
                        }
                    }
                    class Part {
                        pos;
                        vel;
                        acc;
                        max;
                        cycle;
                        alpha;

                        constructor() {
                            this.pos = p.createVector(p.random(p.width), p.random(p.height));
                            this.vel = p.createVector(0, 0);
                            this.acc = p.createVector(0, 0);
                            this.max = 4;

                            this.cycle = 0;
                            this.alpha = 0;
                        }

                        update() {
                            this.vel.add(this.acc);
                            this.vel.limit(this.max);
                            this.pos.add(this.vel);
                            this.acc.mult(0);
                        }

                        applyForce(force) {
                            this.acc.add(force);
                        }

                        follow(vectors) {
                            let x = p.floor(this.pos.x / scle);
                            let y = p.floor(this.pos.y / scle);
                            let index = x + y * cols;
                            let force = vectors[index];
                            this.applyForce(force);
                        }

                        show(seeder) {
                            let prob = p.noise(p.millis() * seeder);
                            let probMark = p.noise(p.millis() * seeder);

                            let mark = 6;

                            if (this.cycle < 200) {
                                if (prob < 0.28) {
                                    if (prob < p.map(sldr[7], 0, 1, 0.28, 0.22)) {
                                        icles.fill(255, p.map(this.alpha, 0, 1, 0, 0.44));
                                        icles.noStroke();
                                        icles.rect(this.pos.x, this.pos.y, 1.4, 1.4);
                                    }
                                    p.fill(
                                        255,
                                        p.map(this.alpha, 0, 1, 0, p.map(sldr[7], 0, 1, 0, 0.8))
                                    );
                                    p.noStroke();
                                    p.rect(this.pos.x, this.pos.y, 2, 2);
                                }

                                if (this.alpha < 1) {
                                    this.alpha += 0.014;
                                }

                                this.cycle++;
                            } else if (this.cycle < 2200) {
                                if (prob < 0.28) {
                                    if (prob < p.map(sldr[7], 0, 1, 0.28, 0.22)) {
                                        icles.fill(255, p.map(this.alpha, 0, 1, 0, 0.44));
                                        icles.noStroke();
                                        icles.rect(this.pos.x, this.pos.y, 1.4, 1.4);
                                    }
                                    p.fill(
                                        255,
                                        p.map(this.alpha, 0, 1, 0, p.map(sldr[7], 0, 1, 0, 0.8))
                                    );
                                    p.noStroke();
                                    p.rect(this.pos.x, this.pos.y, 2, 2);

                                    if (probMark < 0.08) {
                                        icles.noFill();
                                        icles.stroke(255, p.map(this.alpha, 0, 1, 0, 0.88));
                                        p.noFill();
                                        p.stroke(255, p.map(this.alpha, 0, 1, 0, 1));

                                        if (p.noise(p.millis()) < p.map(sldr[6], 0, 1, 0.2, 0.8)) {
                                            icles.line(
                                                this.pos.x - mark,
                                                this.pos.y,
                                                this.pos.x + mark,
                                                this.pos.y
                                            );
                                            icles.line(
                                                this.pos.x,
                                                this.pos.y - mark,
                                                this.pos.x,
                                                this.pos.y + mark
                                            );
                                            p.line(
                                                this.pos.x - mark,
                                                this.pos.y,
                                                this.pos.x + mark,
                                                this.pos.y
                                            );
                                            p.line(
                                                this.pos.x,
                                                this.pos.y - mark,
                                                this.pos.x,
                                                this.pos.y + mark
                                            );
                                        } else {
                                            icles.line(
                                                this.pos.x - mark,
                                                this.pos.y - mark,
                                                this.pos.x + mark,
                                                this.pos.y + mark
                                            );
                                            icles.line(
                                                this.pos.x - mark,
                                                this.pos.y + mark,
                                                this.pos.x + mark,
                                                this.pos.y - mark
                                            );
                                            p.line(
                                                this.pos.x - mark,
                                                this.pos.y - mark,
                                                this.pos.x + mark,
                                                this.pos.y + mark
                                            );
                                            p.line(
                                                this.pos.x - mark,
                                                this.pos.y + mark,
                                                this.pos.x + mark,
                                                this.pos.y - mark
                                            );
                                        }
                                    }
                                }

                                this.cycle++;
                            } else if (this.cycle < 2400) {
                                if (prob < 0.28) {
                                    if (prob < p.map(sldr[7], 0, 1, 0.28, 0.22)) {
                                        icles.fill(255, p.map(this.alpha, 0, 1, 0, 0.44));
                                        icles.noStroke();
                                        icles.rect(this.pos.x, this.pos.y, 1.4, 1.4);
                                    }
                                    p.fill(
                                        255,
                                        p.map(this.alpha, 0, 1, 0, p.map(sldr[7], 0, 1, 0, 0.8))
                                    );
                                    p.noStroke();
                                    p.rect(this.pos.x, this.pos.y, 2, 2);
                                }

                                if (this.alpha > 0) {
                                    this.alpha -= 0.014;
                                }

                                this.cycle++;
                            }
                        }

                        edges() {
                            let bffr = 0;

                            if (this.pos.x < -bffr) {
                                this.pos.x = p.width + bffr;
                                this.pos.y = p.height - this.pos.y;
                            }
                            if (this.pos.x > p.width + bffr) {
                                this.pos.x = -bffr;
                                this.pos.y = p.height - this.pos.y;
                            }
                            if (this.pos.y < -bffr) {
                                this.pos.y = p.height + bffr;
                                this.pos.x = p.width - this.pos.x;
                            }
                            if (this.pos.y > p.height + bffr) {
                                this.pos.y = -bffr;
                                this.pos.x = p.width - this.pos.x;
                            }
                        }
                    }
                    p.setup = () => {
                        const canvasParent = renderRef.current?.parentElement;
                        const canvasWidth = canvasParent ? canvasParent.offsetWidth : 374;
                        // const canvasWidth = 200;
                        const canvasHeight = canvasParent ? canvasParent.offsetHeight : 374;
                        // const canvasHeight = 200;
                        const canvas = p.createCanvas(canvasWidth - 8, canvasHeight - 8);
                        canvas.parent(renderRef.current);
                        p.pixelDensity(1);
                        p.colorMode(p.RGB, 255, 255, 255, 1);
                        p.blendMode(p.BLEND);
                        p.rectMode(p.CENTER);

                        p.frameRate(60);

                        para[0] = p.map(sldr[0], 0, 1, 6, 60);
                        para[1] = p.map(sldr[1], 0, 1, 2, 8);

                        for (let i = 0; i < 4; i++) {
                            cores[i] = new Array(4);
                            for (let j = 0; j < 4; j++) {
                                cores[i][j] = new Core(para, sldr);
                            }
                        }
                        scle = p.height / 54;
                        cols = p.floor(p.width / scle);
                        rows = p.floor(p.height / scle);

                        incr = p.map(sldr[5], 0, 1, 0.008, 0.04);

                        for (let i = 0; i < 200; i++) {
                            parts[i] = new Part();
                        }

                        icles = p.createGraphics(canvasWidth, canvasHeight);
                        icles.pixelDensity(1);
                        icles.colorMode(p.RGB, 255, 255, 255, 1);
                        icles.blendMode(p.BLEND);
                        icles.rectMode(p.CENTER);
                        ff = new Array(cols * rows);
                    };

                    p.draw = () => {
                        p.background(0);
                        p.randomSeed(1235231);
                        icles.fill(0, 0.016);
                        icles.noStroke();
                        icles.rect(p.width / 2, p.height / 2, p.width, p.height);
                        p.image(icles, 0, 0);

                        for (let i = 0; i < 4; i++) {
                            for (let j = 0; j < 4; j++) {
                                cores[i][j].dots(i * para[0], j * para[0], para[1]);
                                cores[i][j].lines();
                            }
                        }

                        let yOff = 0;
                        for (let y = 0; y < rows; y++) {
                            let xOff = 0;
                            for (let x = 0; x < cols; x++) {
                                let index = x + y * cols;
                                let angle = p.noise(xOff, yOff, zOff) * p.TWO_PI * 4;
                                let vctr = p.createVector(p.sin(angle), p.cos(angle));

                                vctr.setMag(p.map(sldr[4], 0, 1, 0.02, 0.4));
                                xOff += incr;

                                ff[index] = vctr;
                            }
                            yOff += incr;
                            zOff += 0.00004;
                        }

                        for (let i = 0; i < parts.length; i++) {
                            parts[i].follow(ff);
                            parts[i].update();
                            parts[i].show(p.map(i, 0, parts.length, 0.02, 0.98));
                            parts[i].edges();
                        }
                    };
                };
                new p5(sketch);
            })
        }
        return () => {
            window.removeEventListener('resize', () => {
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;
                p.resizeCanvas(canvasWidth, canvasHeight); // 調整畫布大小
            });
        }
    }, []);

    return <div ref={renderRef} className="absolute top-0 -left-2 z-1 " />;
};

export default Box;