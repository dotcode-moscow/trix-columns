import iframeIcon from '../svg/iframe.svg'
import tableIcon from '../svg/table.svg'

export default class CustomTrix {
    constructor(trixInitializeEvent) {
        this.trixEditor = trixInitializeEvent.target;
        this.createButtons();
        this.createDialogs();
        $( document ).ready( () => {
            this.setConfig();
        });
    }

    createButtons() {
        this.getTrixContainer().find('.trix-button-group.trix-button-group--file-tools').append(this.generateDialogButton('custom_trix_video', `<svg width="20" height="20"><use xlink:href="#iframe"></use></svg>`));
        this.getTrixContainer().find('.trix-button-group.trix-button-group--file-tools').append(this.generateTagButton('custom_trix_element', `<svg width="20" height="20"><use xlink:href="#table"></use></svg>`));
    }

    generateDialogButton(name, content){
        return `<button type="button" class="trix-button" data-trix-attribute="${name}" data-trix-action="x-${name}" tabindex="-1">${content}</button>`;
    }

    generateTagButton(name, content){
        return `<button type="button" class="trix-button" data-trix-attribute="${name}" data-trix-key="${name}" tabindex="-1">${content}</button>`;
    }

    createDialogs() {
        this.createVideoDialog();
    }

    createVideoDialog() {
        let videoDialog =
            `<div class="trix-dialog" data-trix-dialog="x-custom_trix_video" data-trix-dialog-attribute="x-custom_trix_video">
                    <div class="trix-dialog__link-fields">
                        <input type="text" name="x-custom_trix_video" class="trix-input trix-input--dialog" placeholder="Enter an iframe code..." data-trix-input>
                        <div class="trix-button-group">
                            <input type="button" class="trix-button trix-button--dialog" value="Add" data-trix-method="setAttribute" id="add-video">
                        </div>
                    </div>
                </div>`
        let dialogs = this.getTrixContainer().find('.trix-dialogs')
        dialogs.append(videoDialog)
        dialogs.find('#add-video').on('click', () => {
            let attachment = new Trix.Attachment({
                content: dialogs.find("[name='x-custom_trix_video']").val(),
            });
            this.getEditor().insertAttachment(attachment);
        })
    }

    getEditor() {
        return this.trixEditor.editor;
    }

    getTrixElement() {
        return $(this.trixEditor);
    }

    getTrixContainer() {
        return this.getTrixElement().parent();
    }

    setConfig() {
        Trix.config.blockAttributes.custom_trix_flex = {
            tagName: 'custom_trix_flex',
            parse: false,
        };

        Trix.config.blockAttributes.custom_trix_element = {
            tagName: 'custom_trix_element',
            listAttribute: 'custom_trix_flex',
            group: false,
            nestable: true,
            test: function (element) {
                return Trix.tagName(element.parentNode) === Trix.config.blockAttributes[this.listAttribute].tagName
            }
        };

        Trix.config.blockAttributes.custom_trix_video = {
            tagName: 'custom_trix_video',
            inheritable: true,
        };
    }
}
