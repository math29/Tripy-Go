import {bind, Component, ElementRef, OnInit, EventEmitter, Output, Inject, ComponentRef} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';

declare var tinymce: any;

@Component({
    selector: 'md-editor',
    template: `
    <div id="tinyFormGroup" class="form-group">
    <div class="hidden">
        <textarea id="baseTextArea">{{htmlContent}}</textarea>
    </div>
    </div>`,
    inputs: ['mceContent'],
})



export class MdEditor {

    private elementRef: ElementRef;
    private elementID: string;
    private htmlContent: string;

    @Output() contentChanged: EventEmitter<any>;

    constructor(@Inject(ElementRef) elementRef: ElementRef)
    {
        this.elementRef = elementRef;

        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter + Date.now();

        this.elementID = 'tinymce' + uniqid;
        this.contentChanged = new EventEmitter();
    }

    ngAfterViewInit()
    {
        //Clone base textarea
        var baseTextArea = this.elementRef.nativeElement.querySelector("#baseTextArea");
        var clonedTextArea = baseTextArea.cloneNode(true);
        clonedTextArea.id = this.elementID;

        var formGroup = this.elementRef.nativeElement.querySelector("#tinyFormGroup");
        formGroup.appendChild(clonedTextArea);

        //Attach tinyMCE to cloned textarea
        tinymce.init(
            {
                mode: 'exact',
                height: 500,
                theme: 'modern',
                language_url: 'js/fr_FR.js',
                plugins: [
                    'textpattern advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code emoticons fontawesome'
                ],
                content_css: '//netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons',
                elements: this.elementID,
                setup: this.tinyMCESetup.bind(this)
            }
        );
    }

    /**
     * Désalocation de la place quand on en a plus besoin
     *
     */
    ngOnDestroy() {
        //destroy cloned elements
        tinymce.get(this.elementID).remove();

        var elem = document.getElementById(this.elementID);
        if(elem){
          elem.parentElement.removeChild(elem);
        }
    }


    tinyMCESetup(ed) {
        ed.on('keyup', this.tinyMCEOnKeyup.bind(this));
    }

    tinyMCEOnKeyup(e) {
        this.contentChanged.emit(tinymce.get(this.elementID).getContent());
    }

    /**
     * Set text content
     *
     * @param content content to show in html
     *
     */
    set mceContent(content) {
        this.htmlContent = content;
    }
}
