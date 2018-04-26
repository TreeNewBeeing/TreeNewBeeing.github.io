
const S_SIZE = 'S_SIZE';
const M_SIZE = 'M_SIZE';
const L_SIZE = 'L_SIZE';

export default function screenSize(){
    const w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    switch(w){
        case (w > 0 && w <= 600):
            return S_SIZE;
        case (w > 600 && w <= 900):
            return M_SIZE;
        case (w > 900):
            return L_SIZE;
        default:
            break;
    }
}