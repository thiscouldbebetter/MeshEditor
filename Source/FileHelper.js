
class FileHelper
{
	loadFileAsBinaryString(systemFileToLoad, callback, contextForCallback)
	{
		var fileReader = new FileReader();
		fileReader.systemFile = systemFileToLoad;
		fileReader.callback = callback;
		fileReader.contextForCallback = contextForCallback;
		fileReader.onload = this.loadFile_FileLoaded.bind(this);
		fileReader.readAsBinaryString(systemFileToLoad);
	}

	loadFileAsText(systemFileToLoad, callback, contextForCallback)
	{
		var fileReader = new FileReader();
		fileReader.systemFile = systemFileToLoad;
		fileReader.callback = callback;
		fileReader.contextForCallback = contextForCallback;
		fileReader.onload = this.loadFile_FileLoaded.bind(this);
		fileReader.readAsText(systemFileToLoad);
	}

	loadFile_FileLoaded(fileLoadedEvent)
	{
		var fileReader = fileLoadedEvent.target;
		var contentsOfFileLoaded = fileReader.result;
		var fileName = fileReader.systemFile.name;

		var callback = fileReader.callback;
		var contextForCallback = fileReader.contextForCallback;
		callback.call(contextForCallback, contentsOfFileLoaded);
	}

	saveBinaryStringToFileWithName(fileAsBinaryString, fileName)
	{
		var fileAsArrayBuffer = new ArrayBuffer(fileAsBinaryString.length);
		var fileAsArrayUnsigned = new Uint8Array(fileAsArrayBuffer);
		for (var i = 0; i < fileAsBinaryString.length; i++) 
		{
			fileAsArrayUnsigned[i] = fileAsBinaryString.charCodeAt(i);
		}

		var fileAsBlob = new Blob([fileAsArrayBuffer], {type:'unknown/unknown'});

		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(fileAsBlob);
		link.download = fileName;
		link.click();
	}
	 
	saveTextStringToFileWithName(textToSave, fileNameToSaveAs)
	{
		var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});  
		var link = document.createElement("a");
		link.href = window.URL.createObjectURL(textToSaveAsBlob);
		link.download = fileNameToSaveAs;
		link.click();
	}
}
