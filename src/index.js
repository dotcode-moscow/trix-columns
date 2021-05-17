import CustomTrix from "./Classes/CustomTrix";
import './scss/main.scss'


addEventListener('trix-initialize', (event) => {
    new CustomTrix(event);
});