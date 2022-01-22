import React from 'react';
import { Stack, Dropdown, DropdownButton } from 'react-bootstrap';

export class FolderSelectionController {
    constructor(folderOptions, folderUpdateCallback) {
        this.folderOptions = folderOptions;
        this.folderUpdateCallback = folderUpdateCallback;
        this.updateFolderCallback = this.updateFolderCallback.bind(this);
    }

    getFolderOptions() {
        return this.folderOptions;
    }

    updateFolderCallback(folder){
        this.folderUpdateCallback(folder);
    }
}

export class FolderSelection extends React.Component{
    constructor(props) {
        super(props);
        this.state = { displayText:"Unselected" };
        this.controller = props.controller;
        this.updateFolderCallback=this.controller.updateFolderCallback;
        this.setDisplayText = this.setDisplayText.bind(this);
        this.generateDropdownItem = this.generateDropdownItem.bind(this);
        this.dropdownOptions = this.controller.getFolderOptions();
    }

    setDisplayText(newText){
        this.setState({ displayText: newText });
        this.updateFolderCallback(newText);
    }

    generateDropdownItem(dropdownText) {
        return <Dropdown.Item onClick={()=>this.setDisplayText(dropdownText)}>{dropdownText}</Dropdown.Item>;
    }

    render() {
        return (
            <Stack direction="horizontal" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <h3>Folder: </h3>
                <DropdownButton id="dropdown-basic-button" title={this.state.displayText}>
                    {this.dropdownOptions.map(this.generateDropdownItem)}
                </DropdownButton>
            </Stack>
        );
      }  
}