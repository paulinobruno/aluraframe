import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

document.querySelector('.form').onsubmit = controller.adiciona.bind(controller);
document.querySelector('#btnApaga').onclick = controller.apaga.bind(controller);
