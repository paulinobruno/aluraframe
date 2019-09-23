import { currentInstance } from './controllers/NegociacaoController';

const controller = currentInstance();

document.querySelector('.form').onsubmit = controller.adiciona.bind(controller);
document.querySelector('#btnApaga').onclick = controller.apaga.bind(controller);
