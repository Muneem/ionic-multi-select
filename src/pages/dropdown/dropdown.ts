import {Component, HostListener, Input} from '@angular/core';

/**
 * Generated class for the DropdownComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'dropdown',
    templateUrl: 'dropdown.html',

})
export class DropdownComponent {

    @Input() dropDownOptions: any;
    @Input() select: boolean;
    @Input() searchBar: boolean;
    @Input() placeholder: string;

    options: boolean = false;
    checkALL: boolean = false;
    selectedOptions: string = "Select Options";
    items: any [] = [{key: 'Item1'}, {key: 'Item2'}, {key: 'Item3'}, {key: 'Item4'}]; // Default items to be shown
    selectAll: boolean = false;
    thisElementClicked: boolean = false;  // Outside click Event Checking

    constructor() {
        this.selectAll = false;

    }

    @HostListener('click', ['$event'])
    onLocalClick(event: Event) {

        //   this.showOptions();
        this.thisElementClicked = true;
    }

    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (!this.thisElementClicked) {

            this.options = false;
        }
        this.thisElementClicked = false;


    }

    /**
     * This methid is called whenever dropdownoption is received. As parent needs to be rendered in order to call this method
     */
    ngOnChanges() {
        if (!!this.dropDownOptions) {
            this.items = this.dropDownOptions;
        }

        if (!!this.placeholder) {
            this.selectedOptions = this.placeholder;
        }

    }

    initialiseItems() {
        if (this.dropDownOptions.length > 0) {
            this.items = this.dropDownOptions;
        }
        else {
            this.items = [{key: 'Item1'}, {key: 'Item2'}, {key: 'Item3'}, {key: 'Item4'}];
        }
    }


    filterItems(ev: any) {
        this.initialiseItems();

        let val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.key.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    showOptions() {
        this.options = !this.options;

    }

    /**
     * Select All Option. Checks all other checkboxes based on user options
     * @param event
     */
    checkAll() {

        this.checkALL = !this.checkALL;


    }

    itemChanged(item: any, event: any) {

        item.checked = event.checked;
        //   this.items[item] = ;


    }

    itemClicked() {
        this.selectAll = false;
        this.createSelectedString();
    }

    // selectALl Click
    clickCalled() {

        for (let i = 0; i < this.items.length; i++) {
            if (this.checkALL) {

                this.items[i]['checked'] = true;
            }
            else {
                this.items[i]['checked'] = false;
            }
        }
        this.createSelectedString();


    }

    createSelectedString() {
        this.selectedOptions = "";
        let itemLength = 0;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].checked) {
                itemLength++;
                this.selectedOptions += this.items[i].key + ",";
            }

        }
        //removing last , from string
        this.selectedOptions = this.selectedOptions.substring(0, this.selectedOptions.length - 1);
        if (itemLength > 3) {
            this.selectedOptions = itemLength + " Items Selected";
        }

        if (this.selectedOptions == "") {
            this.selectedOptions = "Select options";
        }

    }

}
