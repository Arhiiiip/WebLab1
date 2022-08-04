function shoot_graph (x,y,r) {
    if (validate(x,y,r)){
        let cr = +r;
        let xc = +x*(150/cr) + 200;
        let yc = -(+y*(150/cr)) + 200;
        let graph = document.getElementById('graph')
        const shoot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        shoot.setAttribute('r','4')
        shoot.setAttribute('cx',String(xc))
        shoot.setAttribute('cy',String(yc))
        shoot.setAttribute('fill', 'black')
        shoot.setAttribute('color', 'black')
        graph.appendChild(shoot)
    }else{
        alert('Data isn\'t valid')
    }
    // let shoot = "<circle r=\"5\" cx=\""+ xc + "\" cy=\""+ yc + "\"" + ">" + "</circle>"
}

function validate(x,y,r){
    if(x>-4 && x<6 && y>-4 && y<4 && r<6 && r>1){
        return true
    } else{
        return false
    }
}