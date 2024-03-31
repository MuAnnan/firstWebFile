async function getJSON(fileAddress) {
    const response = await fetch(fileAddress)
    const responseJSON = await response.json()
    return responseJSON
}

async function main() {
    const JSONData = await getJSON("/picture.json")
    const elems = document.getElementsByClassName("column")

    var i = 0
    for(classification in JSONData){
        var text = ""
        for(picture in JSONData[classification]){
            text += `
                <img src="${JSONData[classification][picture]}" onclick="chat('${picture}')" />
            `
        }
        elems[i].innerHTML = text
        i += 1
    }
}

window.onload = function() {
    main()
    chatinit()
}