
function mapTagsToOptions(tagList) {
    const tagOptions = []; 
    for (let i = 0; i < tagList.length; i++) {
        tagOptions.push({value: tagList[i].Tag, label: tagList[i].Tag});  
    } 
    return tagOptions; 
}

export default mapTagsToOptions; 