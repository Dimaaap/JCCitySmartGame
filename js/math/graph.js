class Graph {
    /*
    Клас, який імплентує функціональність графу
    приймає масив точок і масив сегментів.
    Відмальовує їх на заданому канвасі
    */
    constructor(points = [], segments = []){
        this.points = points;
        this.segments = segments;
    }

    /*
    Метод, який додає нову точку в масив точок
    */
    addPoint(point){
        this.points.push(point);
    }

    /*
        Метод, який перевіряє, чи існує вже точка з 
        такими ж координатами у масиві
    */
    containsPoint(point){
        return this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point) {
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }

    removePoint(point) {
        const segs = this.getSegmentsWithPoint(point);
        for(const seg of segs){
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }

    addSegment(seg){
        this.segments.push(seg)
    }

    containsSegment(seg){
        return this.segments.find((s) => s.equals(seg));
    }

    getSegmentsWithPoint(point){
        const segs = [];
        for(const seg of this.segments){
            if(seg.includes(point)){
                segs.push(seg);
            }
        }
        return segs;
    }

    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    tryAddSegment(seg){
        if(!this.containsSegment(seg) && !seg.p1.equals(seg.p2)){
            this.addSegment(seg);
            return true;
        }
        return false;
    }

    dispose(){
        this.points.length = 0;
        this.segments.length = 0;
    }

    draw(ctx) {
        /*
            Метод, який відповідає за відмалювання графу на канвасі,
            який буде переданий у цей метод - ctx
        */
        for(const seg of this.segments) {
            seg.draw(ctx);
        }

        for(const point of this.points) {
            point.draw(ctx);
        }
    }
}