
const S_SIZE = 'S_SIZE';
const M_SIZE = 'M_SIZE';
const L_SIZE = 'L_SIZE';

export function screenSize(){
    const w = document.documentElement.clientWidth
        || document.body.clientWidth;
    console.log(w > 900);
    switch(true){
        case (w > 0 && w <= 600):
            return S_SIZE;
        case (w > 600 && w <= 900):
            return M_SIZE;
        case (w > 900):
            return L_SIZE;
        default:
            throw 'Cannot get the width of window';
    }
}
