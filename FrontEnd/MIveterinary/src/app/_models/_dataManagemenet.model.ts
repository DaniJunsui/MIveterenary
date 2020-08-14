/** Model for internal information such as data status */
export class DataManagementModel {
    _isEditing: boolean = false;     // Set true if this item is being updated
    _isSaving: boolean = false;      // Set true if the item is currently called in API
    _removeChecker: boolean = false; // first click on remove clicked
}